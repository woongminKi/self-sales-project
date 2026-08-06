/*
  가격 섹션 뒤에 둔다 — 금액을 본 사람이 "그래서 어떻게 진행되나"를 묻는 지점이 거기다.
  "진행 상황을 매일 공유"는 1인이라 가능한 실제 강점이므로 살린다.
*/
const steps = [
  {
    title: "무료 점검",
    desc: "지금 홈페이지의 문제를 문서로 정리해 드립니다. 여기서 끝내셔도 됩니다.",
  },
  {
    title: "기획 · 견적 확정",
    desc: "필요한 것을 구체화하고 범위와 비용을 확정합니다. 수정 횟수와 납기를 계약서에 명시합니다.",
  },
  {
    title: "제작",
    desc: "진행 상황을 매일 공유합니다. 만드는 사람과 직접 이야기하므로 피드백이 바로 반영됩니다.",
  },
  {
    title: "오픈 · 첫 달 리포트",
    desc: "검수 후 오픈하고, 한 달 뒤 방문·문의 숫자를 정리해 보내드립니다.",
  },
];

export default function Process() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            Process
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            진행 순서
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="font-mono text-sm text-sky-300/70">0{i + 1}</span>
              <h3 className="mt-4 text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          계약 범위에 따라 기간은 달라질 수 있습니다
        </p>
      </div>
    </section>
  );
}
