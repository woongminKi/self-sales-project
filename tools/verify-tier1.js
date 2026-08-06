/**
 * 1군 후크 2차 검증 — 배치 1패스의 오탐을 걸러낸다.
 *
 * 오탐 가능성:
 *   HTTP 403/503 → WAF 봇 차단 (실제 방문자는 정상 접속)
 *   HTTP 404      → 루트만 죽고 /main, /index.html 등이 살아있을 수 있음
 *   ERR_CERT_*    → 대체로 실제 결함이지만 SNI/리다이렉트로 www↔apex가 갈릴 수 있음
 *
 * 검증 방법 (1패스와 다르게):
 *   1) 사람과 같은 조건 — 일반 UA, Accept-Language ko-KR, referer 없이 직접 진입
 *   2) www ↔ apex 교차, http ↔ https 교차로 살아있는 변형(variant) 탐색
 *   3) 살아있는 변형이 있으면 "루트만 깨짐"으로 후크를 수정, 전부 죽으면 확정
 *
 * 출력: docs/leads/tier1-verified.jsonl
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require(
  '/Users/kiwoongmin/Desktop/documents/test-repo/image2/piLab/project/catharsis/catharsis-frontend/node_modules/puppeteer'
);

const ROOT = path.resolve(__dirname, '..');
const IN = path.join(ROOT, 'docs/leads/triage-results.jsonl');
const OUT = path.join(ROOT, 'docs/leads/tier1-verified.jsonl');
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

// 1패스 결과에서 1군만 추린다 (triage-score.py의 분류와 동일 조건)
function isTier1(d) {
  const err = d.error || '';
  if (/ERR_CERT|ERR_SSL/.test(err)) return true;
  if (!err && d.http && d.http >= 400) return true;
  if (d.dbError) return true;
  return false;
}

const targets = [];
for (const line of fs.readFileSync(IN, 'utf-8').split('\n')) {
  if (!line.trim()) continue;
  const d = JSON.parse(line);
  if (isTier1(d)) targets.push(d);
}

// 이어받기
const done = new Set();
if (fs.existsSync(OUT)) {
  for (const line of fs.readFileSync(OUT, 'utf-8').split('\n')) {
    if (!line.trim()) continue;
    try { done.add(JSON.parse(line).url); } catch { /* skip */ }
  }
}
let queue = targets.filter(t => !done.has(t.url));
if (process.env.LIMIT) queue = queue.slice(0, Number(process.env.LIMIT));
console.log(`1군 후보 ${targets.length}곳 | 완료 ${done.size} | 남음 ${queue.length}`);

/** 검증할 URL 변형 목록 — 원본 먼저, 그다음 www/스킴 교차 */
function variants(rawUrl) {
  const u = new URL(rawUrl);
  const host = u.hostname;
  const alt = host.startsWith('www.') ? host.slice(4) : 'www.' + host;
  const out = new Set();
  for (const h of [host, alt]) {
    for (const s of [u.protocol, u.protocol === 'https:' ? 'http:' : 'https:']) {
      out.add(`${s}//${h}${u.pathname === '/' ? '/' : u.pathname}`);
    }
  }
  return [...out];
}

async function tryOne(browser, url) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'ko-KR,ko;q=0.9' });
  await page.setViewport({ width: 1280, height: 900 });
  const r = { url };
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    r.http = res ? res.status() : null;
    r.finalUrl = page.url();
    await new Promise(x => setTimeout(x, 1200));
    const info = await page.evaluate(() => ({
      title: (document.title || '').slice(0, 70),
      textLen: (document.body ? document.body.innerText : '').replace(/\s+/g, '').length,
      // 의료기관 사이트로 보이는 신호 (에러 페이지·주차 페이지 구분용)
      medical: /진료|병원|의원|예약|시술|원장|클리닉/.test(document.body ? document.body.innerText : ''),
    }));
    Object.assign(r, info);
    // 살아있음 판정: 2xx/3xx + 본문이 충분 + 의료 콘텐츠
    r.alive = !!(r.http && r.http < 400 && info.textLen > 200 && info.medical);
  } catch (e) {
    const m = (e.message || '').split('\n')[0];
    const cert = m.match(/ERR_CERT_[A-Z_]+|ERR_SSL_[A-Z_]+/);
    r.error = cert ? cert[0] : m.slice(0, 100);
    r.alive = false;
  }
  await page.close().catch(() => {});
  return r;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const out = fs.createWriteStream(OUT, { flags: 'a' });
  let n = 0;

  for (const t of queue) {
    const attempts = [];
    let aliveVariant = null;
    for (const v of variants(t.url)) {
      const r = await tryOne(browser, v);
      attempts.push(r);
      if (r.alive) { aliveVariant = r; break; }  // 살아있는 변형 찾으면 중단
      await new Promise(x => setTimeout(x, 600));
    }

    const rec = {
      url: t.url,
      pass1: { http: t.http ?? null, error: t.error ?? null },
      attempts,
      clinics: t.clinics,
      ts: new Date().toISOString(),
    };

    if (aliveVariant) {
      // 원본 URL은 죽었지만 다른 변형이 살아있음 → 후크는 여전히 유효(검색에 죽은 URL 노출)
      // 단, 강도는 "사이트 전체 차단"이 아니라 "등록/검색된 주소가 오류"로 조정
      rec.verdict = aliveVariant.url === t.url ? 'FALSE_POSITIVE' : 'PARTIAL';
      rec.aliveUrl = aliveVariant.url;
    } else {
      rec.verdict = 'CONFIRMED';
    }

    out.write(JSON.stringify(rec) + '\n');
    n++;
    if (n % 10 === 0) console.log(`${n}/${queue.length} 검증`);
  }

  out.end();
  console.log(`완료: ${n}곳 검증 → ${OUT}`);
  await browser.close();
})().catch(e => {
  console.error('검증 오류:', e.message);
  process.exit(1);
});
