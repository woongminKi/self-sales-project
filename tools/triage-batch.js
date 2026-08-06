/**
 * 서울·경기 피부과 의원 홈페이지 배치 트리아지.
 *
 * 입력:  docs/leads/clinics-derma-with-homepage.csv (심평원 2026.6, 공공누리 출처표시)
 * 출력:  docs/leads/triage-results.jsonl (1줄 = 1도메인, 이어받기 지원)
 *
 * 수집 항목: SSL 오류 분류, HTTP 상태, viewport, 가로스크롤(375px), tel: 링크,
 *           문의폼 개수, 개인정보처리방침 링크 href, 카카오채널, 푸터 카피라이트 연도.
 *
 * 의도적으로 수집하지 않는 것: 이메일 주소 — 정보통신망법 제50조의2(자동 수집 금지)
 * 쟁점이므로 KISA 유권해석 전까지 넣지 않는다. 이메일은 좁혀진 후보만 사람이 확인한다.
 *
 * 접속 예의: 동시 3개, 도메인당 1회 방문, UA 명시, 페이지당 타임아웃 25초.
 */
const fs = require('fs');
const path = require('path');
const { resolvePuppeteer, launchOptions } = require('./lib/browser');
const puppeteer = resolvePuppeteer();

const ROOT = path.resolve(__dirname, '..');
const IN_CSV = path.join(ROOT, 'docs/leads/clinics-derma-with-homepage.csv');
const OUT = path.join(ROOT, 'docs/leads/triage-results.jsonl');
const CONCURRENCY = 3;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 woongs-clinic-survey (woongs.official@gmail.com)';

// ---------- CSV 읽기 (따옴표 필드 지원) ----------
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  return rows;
}

// ---------- URL 정규화 ----------
function normalizeUrl(raw) {
  let u = (raw || '').trim();
  if (!u) return null;
  // 값이 스킴뿐인 행(60곳) 제외
  if (/^https?:\/{0,2}$/i.test(u)) return null;
  if (!/^https?:\/\//i.test(u)) u = 'http://' + u; // 스킴 없음(138곳) 보정
  try {
    const p = new URL(u);
    if (!p.hostname.includes('.')) return null;
    return p.href;
  } catch {
    return null;
  }
}

// ---------- 입력 적재 + 도메인 단위 dedupe (체인은 같은 사이트 공유) ----------
const csv = parseCsv(fs.readFileSync(IN_CSV, 'utf-8'));
const header = csv[0];
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
const byUrl = new Map(); // 정규화 URL -> [의원 레코드...]
let skippedBadUrl = 0;
for (const r of csv.slice(1)) {
  if (r.length < header.length) continue;
  const url = normalizeUrl(r[idx['홈페이지']]);
  if (!url) { skippedBadUrl++; continue; }
  if (!byUrl.has(url)) byUrl.set(url, []);
  byUrl.get(url).push({
    name: r[idx['요양기관명']],
    sido: r[idx['시도']],
    sggu: r[idx['시군구']],
    tel: r[idx['전화번호']],
    key: r[idx['요양기호']],
  });
}

// ---------- 이어받기: 이미 처리한 URL 스킵 ----------
const done = new Set();
if (fs.existsSync(OUT)) {
  for (const line of fs.readFileSync(OUT, 'utf-8').split('\n')) {
    if (!line.trim()) continue;
    try { done.add(JSON.parse(line).url); } catch { /* 손상 줄 무시 */ }
  }
}
let queue = [...byUrl.keys()].filter(u => !done.has(u));
// 스모크 테스트용: LIMIT=10 node triage-batch.js
if (process.env.LIMIT) queue = queue.slice(0, Number(process.env.LIMIT));
console.log(
  `대상 ${byUrl.size}개 도메인 (의원 ${[...byUrl.values()].reduce((a, b) => a + b.length, 0)}곳, ` +
  `URL불량 제외 ${skippedBadUrl}) | 완료 ${done.size} | 남음 ${queue.length}`
);

// ---------- 페이지 1개 점검 ----------
async function inspect(browser, url) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 375, height: 812 });
  const rec = { url, ts: new Date().toISOString() };
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    rec.http = res ? res.status() : null;
    rec.finalUrl = page.url();
    // 렌더링 안정화 대기 (networkidle까지는 안 기다림 — 광고·채팅위젯으로 안 끝나는 사이트 많음)
    await new Promise(r => setTimeout(r, 1500));
    Object.assign(rec, await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const body = document.body ? document.body.innerText : '';
      // 카피라이트 연도: copyright/©에 인접한 연도만, 범위표기(2001~2022)면 끝 연도
      let year = null;
      const m = body.match(/(?:copyright|©|ⓒ)[^0-9]{0,60}(20\d{2})(?:\s*[~-]\s*(20\d{2}))?/i);
      if (m) year = Number(m[2] || m[1]);
      const privacy = links.find(a =>
        /개인정보|privacy/i.test((a.textContent || '') + (a.getAttribute('href') || ''))
      );
      return {
        title: (document.title || '').slice(0, 60),
        viewport: !!document.querySelector('meta[name="viewport"]'),
        hScroll: document.documentElement.scrollWidth > window.innerWidth + 2,
        telLinks: document.querySelectorAll('a[href^="tel:"]').length,
        forms: document.querySelectorAll('form').length,
        privacyHref: privacy ? new URL(privacy.getAttribute('href') || '', location.href).href : null,
        kakao: links.some(a => /pf\.kakao\.com/.test(a.getAttribute('href') || '')),
        dbError: /mysqli_|SQLSTATE|Fatal error|Warning: mysql/i.test(body),
        copyrightYear: year,
        bodyLen: body.length,
      };
    }));
  } catch (e) {
    const msg = (e.message || '').split('\n')[0];
    const cert = msg.match(/ERR_CERT_[A-Z_]+|ERR_SSL_[A-Z_]+/);
    rec.error = cert ? cert[0] : msg.slice(0, 120);
  }
  await page.close().catch(() => {});
  return rec;
}

// ---------- 실행 루프 ----------
(async () => {
  const browser = await puppeteer.launch(launchOptions());
  const out = fs.createWriteStream(OUT, { flags: 'a' });
  let processed = 0;
  const started = Date.now();

  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      let rec = await inspect(browser, url);
      // 일시 오류(타임아웃·연결거부)는 1회 재시도. 인증서 오류는 재시도 무의미.
      if (rec.error && !/ERR_CERT|ERR_SSL/.test(rec.error)) {
        await new Promise(r => setTimeout(r, 2000));
        const retry = await inspect(browser, url);
        if (!retry.error) rec = retry; else rec.retried = true;
      }
      rec.clinics = byUrl.get(url);
      out.write(JSON.stringify(rec) + '\n');
      processed++;
      if (processed % 25 === 0) {
        const rate = processed / ((Date.now() - started) / 60000);
        console.log(
          `${processed}/${processed + queue.length} 처리 (${rate.toFixed(1)}/분, ` +
          `잔여 약 ${Math.round(queue.length / rate)}분)`
        );
      }
      await new Promise(r => setTimeout(r, 700)); // 워커당 간격 — 전체 초당 ~1.5회 이하
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  out.end();
  console.log(`완료: ${processed}개 처리, 결과 ${OUT}`);
  await browser.close();
})().catch(e => {
  console.error('배치 오류:', e.message);
  process.exit(1);
});
