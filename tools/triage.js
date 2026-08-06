/**
 * 의원 홈페이지 기계적 점검 — 사람이 판단할 필요 없는 항목만 자동화한다.
 *
 * 의도적으로 넣지 않은 것: 이메일 주소 추출.
 * 정보통신망법 제50조의2가 문제 삼는 것이 "프로그램·기술적 장치로 이메일 수집"이므로,
 * KISA 유권해석을 받기 전까지 자동 추출을 늘리지 않는다. 이메일은 사람이 페이지를 열어 확인한다.
 */
const puppeteer = require(
  '/Users/kiwoongmin/Desktop/documents/test-repo/image2/piLab/project/catharsis/catharsis-frontend/node_modules/puppeteer'
);

const SITES = process.argv.slice(2);
if (!SITES.length) {
  console.error('사용법: node triage.js <url> [url...]');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const url of SITES) {
    const row = { url, ssl: '?', http: '?', viewport: '?', tel: '?', privacy: '?', year: '?' };
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });

    try {
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      row.http = res.status();
      row.ssl = 'OK';

      const info = await page.evaluate(() => {
        const text = document.body ? document.body.innerText : '';
        // 카피라이트 연도: 4자리 연도 중 가장 큰 값
        const years = (text.match(/20\d{2}/g) || []).map(Number);
        const links = Array.from(document.querySelectorAll('a'));
        return {
          viewport: !!document.querySelector('meta[name="viewport"]'),
          tel: document.querySelectorAll('a[href^="tel:"]').length,
          privacy: links.some(a => /개인정보|privacy/i.test(a.textContent + (a.getAttribute('href') || ''))),
          maxYear: years.length ? Math.max(...years) : null,
          // 가로 스크롤 = 모바일 레이아웃 깨짐
          hScroll: document.documentElement.scrollWidth > window.innerWidth + 2,
        };
      });

      row.viewport = info.viewport ? 'O' : '✗ 없음';
      row.tel = info.tel > 0 ? `O (${info.tel})` : '✗ 없음';
      row.privacy = info.privacy ? 'O' : '✗ 없음';
      row.year = info.maxYear ?? '-';
      row.hScroll = info.hScroll ? '✗ 가로스크롤' : 'O';
    } catch (e) {
      const msg = e.message.split('\n')[0];
      if (/ERR_CERT/.test(msg)) row.ssl = `✗ ${msg.match(/ERR_CERT\w*/)[0]}`;
      else row.http = `실패: ${msg.slice(0, 50)}`;
    }

    console.log(JSON.stringify(row));
    await page.close();
  }

  await browser.close();
})().catch(e => {
  console.error('오류:', e.message);
  process.exit(1);
});
