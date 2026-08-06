export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]"
      />
      {/*
        자백 → 전환이 모바일 첫 화면(약 690px) 안에서 끝나야 한다.
        스크롤이 필요해지면 자백만 읽히고 해결이 안 읽힌다.
      */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center py-20 text-center sm:py-28">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
          병원 · 의원 홈페이지
        </span>

        <h1 className="mt-5 text-[28px] font-bold leading-[1.3] tracking-tight text-white sm:text-5xl sm:leading-[1.2]">
          홈페이지를 새로 만들면
          <br />
          환자가 늘어날까요?
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          이 질문에 답할 수 있게 만드는 것이 제 일입니다.
        </p>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          제가 처음 만든 홈페이지에는 성과를 세는 장치를 넣지 않았습니다. 사이트는
          새로 됐지만 <span className="text-slate-400">원장님도, 저도 효과를 몰랐습니다.</span>
          <br className="hidden sm:block" /> 지금은 그렇게 하지 않습니다.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#inquiry"
            className="rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b1220] transition hover:bg-slate-200"
          >
            무료 점검 받기
          </a>
          <a
            href="/demo/clinic"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[15px] font-medium text-white transition hover:border-white/30 hover:bg-white/10"
          >
            제작 예시 보기
          </a>
        </div>

        <p className="mt-5 text-xs text-slate-600">
          점검만 받고 진행하지 않으셔도 됩니다
        </p>
      </div>
    </section>
  );
}
