/*
  기존 "저희는 이렇게 제작합니다"(A to Z·빠른 제작·빠른 피드백)를 대체한다.
  그 3개는 전부 "나의 역량"이었다. 아래 3개는 전부 "원장님이 받는 것"이다.
  마지막 항목("효과가 없으면 없다고 보고")이 이 섹션의 핵심 — 아무도 하지 않는 약속이다.
*/
const stages = [
  {
    label: "만들기 전",
    title: "지금 홈페이지가 어디서 새는지 점검",
    desc: "휴대폰에서 전화가 걸리는지, 보안 경고가 뜨지는 않는지, 검색에 나오는지. 확인 방법까지 적어 문서로 드립니다.",
    meta: "무료 · 진행하지 않으셔도 됩니다",
  },
  {
    label: "만들 때",
    title: "문의까지 도달하는 동선 + 성과 측정 장치",
    desc: "환자분이 몇 번 눌러야 전화가 걸리는지부터 설계합니다. 방문·전화·예약을 세는 장치를 기본으로 넣습니다.",
    meta: "전 구성 공통 포함",
  },
  {
    label: "만든 뒤",
    title: "매달 숫자를 정리해서 보내드립니다",
    desc: "방문 몇 명, 문의 몇 건, 어디서 왔는지. 효과가 없으면 없다고 보고드립니다. 숫자를 심는 이유가 그것입니다.",
    meta: "첫 달 리포트 포함",
  },
];

export default function ThreeStages() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            그래서 저는 이렇게 합니다
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stages.map((s) => (
            <div
              key={s.label}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <span className="inline-flex w-fit rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                {s.label}
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {s.desc}
              </p>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-500">
                {s.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
