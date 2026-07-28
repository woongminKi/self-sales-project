const faqs = [
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "통상 2~4주 소요됩니다. 프로젝트 범위에 따라 상담 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "수정은 몇 번까지 가능한가요?",
    a: "시안 단계에서 2회 수정이 포함되어 있습니다. 이후 수정은 건별로 협의해 진행합니다.",
  },
  {
    q: "유지보수도 해주시나요?",
    a: "네, 선택 애드온으로 월 단위 유지보수를 제공합니다. 필요하실 때 추가하실 수 있습니다.",
  },
  {
    q: "어떤 업종도 가능한가요?",
    a: "학원, 병원, 매장 등 로컬 비즈니스부터 스타트업 MVP까지 가능합니다. 병원의 경우 의료광고법 관련 자료 준비까지 함께 검토합니다.",
  },
  {
    q: "새로 만드는 것 말고, 기존 사이트 수정이나 버그 해결도 가능한가요?",
    a: "네. 운영 중인 사이트의 버그 수정, 속도 개선, 부분 리뉴얼도 진행합니다. 견적 문의에 현재 상황을 남겨주시면 진단 후 안내드립니다.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            자주 묻는 질문
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-6 open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                {faq.q}
                <span className="shrink-0 text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
