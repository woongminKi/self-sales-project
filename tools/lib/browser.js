/**
 * puppeteer와 Chrome 실행 파일을 환경에 맞게 찾는다.
 *
 * 이 프로젝트는 puppeteer를 자체 의존성으로 갖고 있지 않다(의존성 추가 승인 전).
 * 대신 같은 워크스페이스의 catharsis-frontend에 설치된 것을 빌려 쓴다.
 * 다른 컴퓨터에서는 그 경로가 없을 수 있으므로 후보를 순서대로 탐색하고,
 * 실패하면 무엇을 해야 하는지 알려준다.
 *
 * 환경변수로 직접 지정할 수도 있다.
 *   PUPPETEER_PATH=/path/to/node_modules/puppeteer
 *   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..'); // si-self-sales-project

function resolvePuppeteer() {
  const candidates = [
    process.env.PUPPETEER_PATH,
    // 워크스페이스 형제 프로젝트 (기본 경로)
    path.join(ROOT, '../catharsis/catharsis-frontend/node_modules/puppeteer'),
    // 이 프로젝트 web/ 에 설치했다면
    path.join(ROOT, 'web/node_modules/puppeteer'),
    path.join(ROOT, 'node_modules/puppeteer'),
  ].filter(Boolean);

  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return require(p);
    } catch { /* 다음 후보 */ }
  }
  // 전역·NODE_PATH 설치분
  try {
    return require('puppeteer');
  } catch { /* 없음 */ }

  throw new Error(
    'puppeteer를 찾지 못했습니다. 아래 중 하나로 해결하세요.\n' +
      '  1) 같은 워크스페이스에 catharsis-frontend를 클론하고 의존성 설치\n' +
      '     (기본 탐색 경로: ../catharsis/catharsis-frontend/node_modules/puppeteer)\n' +
      '  2) PUPPETEER_PATH 환경변수로 경로 지정\n' +
      '  3) 이 프로젝트에 puppeteer 설치 — 의존성 추가는 사용자 승인 필요'
  );
}

/**
 * 최신 Chrome 경로를 찾는다.
 * puppeteer 번들 Chromium(78)은 Tailwind v4 CSS를 파싱하지 못해
 * 스타일이 통째로 빠진 화면을 찍는다(2026-08-06 실측). 그래서 시스템 Chrome을 쓴다.
 * 렌더링 정확도가 필요 없는 작업(HTTP 상태·DOM 조회)은 null이어도 무방하다.
 */
function findChrome({ required = false } = {}) {
  const candidates = [
    process.env.CHROME_PATH,
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    // Windows (WSL·Git Bash 등)
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);

  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch { /* 다음 후보 */ }
  }
  if (required) {
    throw new Error(
      '최신 Chrome을 찾지 못했습니다. CHROME_PATH 환경변수로 지정하세요.\n' +
        '  (puppeteer 번들 Chromium은 버전이 낮아 최신 CSS를 렌더링하지 못합니다)'
    );
  }
  return null;
}

/** 표준 launch 옵션 — 시스템 Chrome이 있으면 쓰고, 없으면 번들을 쓴다 */
function launchOptions({ requireChrome = false } = {}) {
  const exe = findChrome({ required: requireChrome });
  return {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ...(exe ? { executablePath: exe } : {}),
  };
}

module.exports = { resolvePuppeteer, findChrome, launchOptions, ROOT };
