const points = [
  {
    title: "기획부터 개발까지 A to Z 제작",
    desc: "요구사항 정리부터 화면설계까지 함께 만듭니다. '무엇을 만들지'가 아니라 '무엇을 해결할지'에서 시작합니다.",
  },
  {
    title: "빠른 제작",
    desc: "AI를 활용한 제작 워크플로우로 통상 4주 내 오픈까지 마칩니다.",
  },
  {
    title: "빠른 피드백 반영",
    desc: "영업사원, PM을 거치지 않고 만드는 사람과 바로 대화합니다. 피드백이 전달 과정 없이 즉시 반영됩니다.",
  },
];

export default function WhyMe() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            저희는 이렇게 제작합니다
          </h2>
          <p className="mt-4 text-slate-600">
            에이전시도, 지인 소개도 아닌 세 번째 선택지입니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {points.map((point, i) => (
            <div
              key={point.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
