const problems = [
  {
    title: "문의·매출이 늘지 않아요",
    desc: "방문자가 문의까지 도달하는 동선을 다시 설계하고, 검색 노출(SEO)을 잡아 상담·예약 문의를 늘립니다.",
  },
  {
    title: "신규 회원·고객이 안 모여요",
    desc: "예약, 회원가입, 이벤트 페이지 같은 전환 장치를 만들어 방문자를 고객으로 바꿉니다.",
  },
  {
    title: "검색해도 우리 브랜드가 안 나와요",
    desc: "네이버·구글에서 찾아지는 사이트 구조와 콘텐츠로 브랜드 인지도를 끌어올립니다.",
  },
  {
    title: "사이트가 오래됐고 자꾸 문제가 생겨요",
    desc: "깨진 화면, 느린 속도, 버그를 수정하고 지속적으로 안정적이게 유지보수합니다.",
  },
];

export default function Problems() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            이런 고민으로 오셨나요?
          </h2>
          <p className="mt-4 text-slate-600">
            홈페이지가 아니라, 이 문제들을 해결해 드립니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-slate-200 bg-white p-8"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                &ldquo;{problem.title}&rdquo;
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {problem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
