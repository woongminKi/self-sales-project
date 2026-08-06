/**
 * 이메일 확인 작업 목록 생성 — 사람이 열어볼 페이지만 추린다.
 *
 * 이메일 주소를 추출하지 않는다. 정보통신망법 제50조의2 유권해석을 받기 전까지
 * 프로그램으로 주소를 뽑지 않고, 사람이 원본 페이지에서 직접 확인한다.
 * 이 스크립트가 하는 일은 (1) 어느 페이지를 열어야 하는지 정리 (2) 죽은 링크 제거
 * (3) 우선순위 정렬 — 즉 사람의 클릭 수를 줄이는 것뿐이다.
 *
 * 입력: docs/leads/triage-results.jsonl + docs/leads/clinics-triaged.csv
 * 출력: docs/leads/email-worklist.csv
 */
const fs = require('fs');
const path = require('path');
const { resolvePuppeteer, launchOptions } = require('./lib/browser');
const puppeteer = resolvePuppeteer();
const ROOT = path.resolve(__dirname, '..');
const JSONL = path.join(ROOT, 'docs/leads/triage-results.jsonl');
const TRIAGED = path.join(ROOT, 'docs/leads/clinics-triaged.csv');
const OUT = path.join(ROOT, 'docs/leads/email-worklist.csv');
const CONCURRENCY = 4;

// --- clinics-triaged.csv에서 등급·후크·연락처를 도메인 기준으로 읽는다 ---
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

const csv = parseCsv(fs.readFileSync(TRIAGED, 'utf-8'));
const head = csv[0];
const ix = Object.fromEntries(head.map((h, i) => [h, i]));
const byDomain = new Map(); // 홈페이지 URL -> 레코드[]
for (const r of csv.slice(1)) {
  if (r.length < head.length) continue;
  const url = r[ix['홈페이지']];
  if (!byDomain.has(url)) byDomain.set(url, []);
  byDomain.get(url).push({
    grade: r[ix['등급']],
    name: r[ix['요양기관명']],
    sido: r[ix['시도']],
    sggu: r[ix['시군구']],
    tel: r[ix['전화']],
    hook: r[ix['후크']],
    form: r[ix['문의폼']],
  });
}

// --- 1패스 결과에서 방침 페이지 링크가 있는 2군만 추린다 ---
const targets = [];
for (const line of fs.readFileSync(JSONL, 'utf-8').split('\n')) {
  if (!line.trim()) continue;
  const d = JSON.parse(line);
  if (!d.privacyHref) continue;
  const recs = (byDomain.get(d.url) || []).filter(r => r.grade === '2');
  if (!recs.length) continue;
  targets.push({ url: d.url, privacy: d.privacyHref, recs });
}
console.log(`방침 페이지 있는 2군 도메인 ${targets.length}개 (의원 ${targets.reduce((a, t) => a + t.recs.length, 0)}곳)`);

// --- 죽은 방침 링크 제거 (사람이 헛클릭하지 않게) ---
(async () => {
  const browser = await puppeteer.launch(launchOptions());

  const queue = [...targets];
  const alive = [];
  let done = 0;

  async function worker() {
    while (queue.length) {
      const t = queue.shift();
      const page = await browser.newPage();
      try {
        const res = await page.goto(t.privacy, {
          waitUntil: 'domcontentloaded',
          timeout: 20000,
        });
        const status = res ? res.status() : 0;
        // 본문이 너무 짧으면 방침 페이지가 아니라 리다이렉트·에러일 가능성이 크다
        const len = await page.evaluate(
          () => (document.body ? document.body.innerText : '').replace(/\s+/g, '').length
        );
        if (status < 400 && len > 300) alive.push({ ...t, status, len });
      } catch {
        /* 접속 실패 → 목록에서 제외 */
      }
      await page.close().catch(() => {});
      done++;
      if (done % 50 === 0) console.log(`  ${done}/${targets.length} 확인 (유효 ${alive.length})`);
      await new Promise(r => setTimeout(r, 400));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();

  // --- 우선순위: 결함 많은 곳 먼저. 중간에 멈춰도 좋은 리드가 먼저 끝난다 ---
  const rows = [];
  for (const t of alive) {
    for (const r of t.recs) {
      const defects = r.hook.split(' / ').length;
      rows.push({
        우선순위: 6 - Math.min(defects, 5),
        결함수: defects,
        요양기관명: r.name,
        시도: r.sido,
        시군구: r.sggu,
        전화: r.tel,
        홈페이지: t.url,
        '방침페이지(여기서 확인)': t.privacy,
        문의폼: r.form,
        후크: r.hook,
        이메일: '',
        확인일: '',
        비고: '',
      });
    }
  }
  rows.sort((a, b) =>
    a.우선순위 - b.우선순위 ||
    a.시도.localeCompare(b.시도) ||
    a.시군구.localeCompare(b.시군구) ||
    a.요양기관명.localeCompare(b.요양기관명)
  );

  const cols = Object.keys(rows[0]);
  const esc = v => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  fs.writeFileSync(
    OUT,
    [cols.join(','), ...rows.map(r => cols.map(c => esc(r[c])).join(','))].join('\n') + '\n',
    'utf-8'
  );

  console.log(`\n작업 목록 ${rows.length}곳 → ${path.basename(OUT)}`);
  const cnt = rows.reduce((m, r) => ((m[r.결함수] = (m[r.결함수] || 0) + 1), m), {});
  console.log('결함수별:', cnt);
  console.log(`1순위(결함 4개 이상): ${rows.filter(r => r.결함수 >= 4).length}곳`);
  console.log(`죽은 방침 링크 제외: ${targets.length - alive.length}개 도메인`);
})().catch(e => {
  console.error('오류:', e.message);
  process.exit(1);
});
