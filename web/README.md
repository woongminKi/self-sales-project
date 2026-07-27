# si-self-sales-project / web

1인 웹·앱 제작 파트너 포트폴리오 + 견적 문의 랜딩 페이지. Next.js (App Router) + TypeScript + Tailwind CSS.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## 환경 변수

`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.example .env.local
```

- `RESEND_API_KEY` — [resend.com](https://resend.com) 가입 후 발급받은 API 키
- `INQUIRY_TO_EMAIL` — 견적 문의 메일을 받을 수신 이메일 주소

두 값이 없으면 `/api/inquiry`는 메일을 보내지 않고 콘솔에 문의 내용만 로그로 남깁니다(폼은 정상 동작하되 안내 메시지를 표시).

## Vercel 배포

1. Vercel에 이 저장소(`web/` 를 루트 디렉터리로 지정)를 연결합니다.
2. 프로젝트 설정 > Environment Variables에 `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`을 등록합니다.
3. Deploy를 실행하면 끝입니다.
