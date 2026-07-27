const steps = [
  { title: "무료 상담", desc: "15분" },
  { title: "기획·견적 확정", desc: "요구사항 정리" },
  { title: "제작", desc: "주간 진행 공유" },
  { title: "오픈·검수", desc: "7일 검수 후 인수인계" },
];

export default function Process() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            진행 프로세스
          </h2>
          <p className="mt-4 text-slate-600">
            상담부터 인수인계까지, 4단계로 진행합니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-7"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-lg text-slate-300 lg:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
