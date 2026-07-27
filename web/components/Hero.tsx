export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
          기획 · 마케팅 · 개발을 한 사람이
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          기획부터 함께하는
          <br className="hidden sm:block" /> 웹·앱 제작
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          기획 → 마케팅 → 개발까지 직접 해온 1인 파트너가 상담부터 오픈까지
          책임집니다. AI 제작 워크플로우로 에이전시 절반의 기간에.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#inquiry"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          >
            견적 문의하기
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            제작 사례 보기
          </a>
        </div>
      </div>
    </section>
  );
}
