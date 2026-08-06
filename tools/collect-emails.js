/**
 * email-worklist.csv의 `이메일` 칸을 채운다.
 *
 * ⚠️ 이 스크립트는 스크립트로 페이지를 방문해 게시된 이메일 주소를 추출한다.
 * 정보통신망법 제50조의2 관련 유권해석이 확보되지 않은 상태에서, 대표 판단으로
 * 진행하는 것이다. 국민신문고 질의서에 이 방법을 그대로 기재해 자진 신고한다.
 * (docs/outreach/2026-08-06-KISA-국민신문고-질의서.md 참조)
 *
 * 수집 범위: 공개 게시된 사업용 대표 이메일만. 개인 휴대전화번호 등은 수집하지 않는다.
 *
 * 확인 순서 (이메일이 있을 확률 순):
 *   1) 홈페이지 푸터 — 사업자정보 옆
 *   2) 개인정보처리방침 페이지 — 학원 조사에서 "방침에만 적어두는 경우가 많다"고 기록됨
 *   3) 문의·오시는길 등 하위 페이지 (링크 텍스트로 탐색)
 *
 * 입력/출력: docs/leads/email-worklist.csv (제자리 갱신, 이어받기 지원)
 */
const fs = require('fs');
const path = require('path');
const { resolvePuppeteer, launchOptions } = require('./lib/browser');
const puppeteer = resolvePuppeteer();
const ROOT = path.resolve(__dirname, '..');
const CSV = path.join(ROOT, 'docs/leads/email-worklist.csv');
const PROGRESS = path.join(ROOT, 'docs/leads/.email-collect-progress.jsonl');
const CONCURRENCY = 4;

// ---------- CSV ----------
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
const esc = v => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

const table = parseCsv(fs.readFileSync(CSV, 'utf-8')).filter(r => r.length > 1);
const header = table[0];
const H = Object.fromEntries(header.map((h, i) => [h, i]));
const rows = table.slice(1);

// ---------- 이메일 후보 판별 ----------
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// 제작사·솔루션 업체 주소가 푸터에 박혀 있는 경우가 많다 — 의원 주소가 아니므로 버린다
const VENDOR_HINT = /(webmaster|admin@|host|server|noreply|no-reply|donotreply|example|sentinel|cafe24|gabia|makeshop|godo|imweb|wix|naver\.partner)/i;
const IMG_EXT = /\.(png|jpe?g|gif|svg|webp|css|js)$/i;
// 정부·공공기관 주소 — 방침 페이지에 사업자정보·권익구제 안내로 박혀 있다.
// 실측 오탐: 리앤안의원에서 joonan@hometax.go.kr(국세청) 검출
const GOV_DOMAIN = /@[A-Za-z0-9.-]*\.(go\.kr|gov)$/i;
// 담당자 개인 주소가 아닐 가능성이 있는 로컬파트 — 버리지 않고 사람이 보게 플래그만 단다
const SUSPECT_LOCAL = /^(master|tech|info|help|support|contact|cs|web|mail)@/i;
// 한 페이지에서 이 개수를 넘기면 체인 지점 목록이나 무관한 나열이다 (예쁨 네트워크 19개 검출)
const MAX_PER_SITE = 4;

function pickEmails(text) {
  const found = new Set();
  for (const m of text.match(EMAIL_RE) || []) {
    const e = m.toLowerCase().replace(/[.,;)]+$/, '');
    if (IMG_EXT.test(e)) continue;      // 파일명 오탐
    if (VENDOR_HINT.test(e)) continue;  // 제작사·시스템 주소
    if (GOV_DOMAIN.test(e)) continue;   // 정부·공공기관 주소
    if (e.length > 60) continue;
    found.add(e);
  }
  return [...found];
}

// ---------- 한 의원 처리 ----------
async function collectFor(browser, homepage, privacyUrl) {
  const visited = new Set();
  const hits = new Map(); // email -> 발견 위치

  async function scan(url, label, followLinks) {
    if (!url || visited.has(url) || visited.size > 5) return;
    visited.add(url);
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 900));

      const data = await page.evaluate(() => {
        const body = document.body ? document.body.innerText : '';
        // mailto: 링크는 가장 신뢰도 높은 신호
        const mailtos = [...document.querySelectorAll('a[href^="mailto:"]')]
          .map(a => (a.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0]);
        // 하위 페이지 후보 (문의·오시는길·소개 등)
        const links = [...document.querySelectorAll('a')]
          .filter(a => /문의|오시는|연락|contact|소개|about|이용약관|약관/.test(a.textContent || ''))
          .map(a => { try { return new URL(a.getAttribute('href') || '', location.href).href; } catch { return null; } })
          .filter(Boolean);
        return { body, mailtos, links };
      });

      for (const m of data.mailtos) {
        for (const e of pickEmails(m)) if (!hits.has(e)) hits.set(e, `${label}(mailto)`);
      }
      for (const e of pickEmails(data.body)) if (!hits.has(e)) hits.set(e, label);

      if (followLinks && hits.size === 0) {
        for (const l of data.links.slice(0, 2)) await scan(l, '하위페이지', false);
      }
    } catch { /* 접속 실패 → 다음 후보로 */ }
    await page.close().catch(() => {});
  }

  await scan(homepage, '푸터/본문', true);
  if (hits.size === 0) await scan(privacyUrl, '방침페이지', false);

  return [...hits.entries()];
}

// ---------- 실행 ----------
const done = new Map();
if (fs.existsSync(PROGRESS)) {
  for (const line of fs.readFileSync(PROGRESS, 'utf-8').split('\n')) {
    if (!line.trim()) continue;
    try { const d = JSON.parse(line); done.set(d.key, d); } catch { /* skip */ }
  }
}

const keyOf = r => `${r[H['요양기관명']]}|${r[H['홈페이지']]}`;
const queue = rows.filter(r => !done.has(keyOf(r)));
console.log(`대상 ${rows.length}곳 | 완료 ${done.size} | 남음 ${queue.length}`);

(async () => {
  const browser = await puppeteer.launch(launchOptions());
  const prog = fs.createWriteStream(PROGRESS, { flags: 'a' });
  let n = 0, found = 0;

  async function worker() {
    while (queue.length) {
      const r = queue.shift();
      const key = keyOf(r);
      const list = await collectFor(browser, r[H['홈페이지']], r[H['방침페이지(여기서 확인)']]);
      const rec = {
        key,
        name: r[H['요양기관명']],
        emails: list.map(([e]) => e),
        where: list.map(([, w]) => w),
      };
      done.set(key, rec);
      prog.write(JSON.stringify(rec) + '\n');
      n++;
      if (list.length) found++;
      if (n % 25 === 0) {
        console.log(`  ${n}/${n + queue.length} 처리 (확보 ${found}곳, ${(found / n * 100).toFixed(0)}%)`);
      }
      await new Promise(x => setTimeout(x, 500));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  prog.end();
  await browser.close();

  // --- 크로스체크: 같은 주소가 여러 의원에서 나오면 제작사·공용 주소다 ---
  const shared = new Map();
  for (const rec of done.values()) {
    for (const e of rec.emails) shared.set(e, (shared.get(e) || 0) + 1);
  }

  // CSV 갱신
  for (const r of rows) {
    const rec = done.get(keyOf(r));
    if (!rec) continue;
    r[H['확인일']] = new Date().toISOString().slice(0, 10);

    const notes = [];
    let emails = rec.emails;

    if (!emails.length) {
      r[H['이메일']] = '';
      r[H['비고']] = '이메일 미발견';
      continue;
    }

    // 여러 의원에 걸쳐 나온 주소는 제외 (제작사·솔루션 공용 주소)
    const dup = emails.filter(e => (shared.get(e) || 0) > 1);
    if (dup.length) {
      emails = emails.filter(e => (shared.get(e) || 0) === 1);
      notes.push(`공용/제작사 의심 제외: ${dup.join(' ')}`);
    }

    if (emails.length > MAX_PER_SITE) {
      // 체인 지점 목록 등 — 자동 선택하면 엉뚱한 지점으로 간다
      r[H['이메일']] = '';
      r[H['비고']] = `과다검출 ${emails.length}건(체인 지점 목록 추정) — 사람 확인 필요: ${emails.slice(0, 5).join(' ')}`;
      continue;
    }

    if (emails.some(e => SUSPECT_LOCAL.test(e))) notes.push('대표계정 형태 — 확인 권장');
    if (emails.length > 1) notes.push('복수 발견 — 하나 선택 필요');
    notes.push(rec.where[0]);

    r[H['이메일']] = emails.join(' ; ');
    r[H['비고']] = notes.join(' / ');
  }
  fs.writeFileSync(
    CSV,
    [header.join(','), ...rows.map(r => r.map(esc).join(','))].join('\n') + '\n',
    'utf-8'
  );

  const withEmail = rows.filter(r => r[H['이메일']]).length;
  console.log(`\n완료: ${rows.length}곳 중 ${withEmail}곳 확보 (${(withEmail / rows.length * 100).toFixed(1)}%)`);
  console.log(`복수 발견(사람 확인 필요): ${rows.filter(r => (r[H['이메일']] || '').includes(';')).length}곳`);
})().catch(e => {
  console.error('오류:', e.message);
  process.exit(1);
});
