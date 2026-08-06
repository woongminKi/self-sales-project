/*
  병원 문구 교체: 기존 "의료광고법 관련 자료 준비까지 검토"는 심의 서류 준비처럼 읽혀
  제도를 오해시킨다. 조사 결론(H1)에 따라 "제56조 금지표현 검수 리포트"로 정확히 표기한다.
  추가 2개: 성과 측정이 무엇인지 / 점검만 받아도 되는지 (문턱 낮추기).
*/
const faqs = [
  {
    q: "성과 측정 세팅이 뭔가요?",
    a: "홈페이지에 방문자와 문의를 세는 장치를 넣는 것입니다. 몇 분이 오셨는지, 그중 몇 분이 전화나 예약으로 이어졌는지, 어느 경로로 들어오셨는지를 볼 수 있게 됩니다. 매달 정리해서 보내드리고, 전 구성에 기본 포함입니다.",
  },
  {
    q: "점검만 받고 진행하지 않아도 되나요?",
    a: "네. 점검 리포트는 그냥 가지고 계셔도 되고, 지금 관리하시는 업체에 그대로 전달하셔도 됩니다. 다른 업체 견적과 비교하셔도 괜찮습니다. 비용은 없습니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "구성에 따라 2주(Lite) · 4주(Standard) · 6~8주(Pro)입니다. 상담 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "수정은 몇 번까지 가능한가요?",
    a: "시안 단계에서 2회 수정이 포함되어 있습니다. 이후 수정은 건별로 협의해 진행하며, 기준을 계약서에 명시합니다.",
  },
  {
    q: "의료광고 심의도 대신 해주시나요?",
    a: "아닙니다. 의원 자체 홈페이지는 사전심의 대상이 아니고, 심의는 의료기관이 직접 신청하는 절차입니다. 대신 의료법 제56조 금지광고 기준에 따라 홈페이지 문구를 항목별로 검수해 리포트로 드립니다. 블로그·SNS 등 심의 대상 매체 콘텐츠가 필요하시면 심의 수수료가 의료기관 명의로 별도 발생합니다.",
  },
  {
    q: "유지보수도 해주시나요?",
    a: "월 8만원(Basic) · 15만원(Care) 두 가지입니다. 의원은 비급여 항목·의료진·휴진 일정이 자주 바뀌어서 실사용 빈도가 높은 편입니다. 필요하실 때 추가하시면 됩니다.",
  },
  {
    q: "학원이나 매장도 가능한가요?",
    a: "네. 학원 홈페이지 리뉴얼은 실제로 진행해 오픈까지 마친 사례가 있습니다(카타르시스 연기학원). 학원·매장은 150 / 280 / 450만원 구성으로 안내드리며, 가격표에서 업종을 바꿔 보실 수 있습니다. 성과 측정과 첫 달 리포트는 업종과 무관하게 동일하게 포함됩니다.",
  },
  {
    q: "새로 만들지 않고 지금 사이트만 고칠 수도 있나요?",
    a: "네. 오류 수정, 속도 개선, 휴대폰 대응, 보안 인증서 설치 같은 부분 작업도 진행합니다. 무료 점검을 받아보시면 무엇을 고쳐야 하는지부터 확인하실 수 있습니다.",
  },
];

export default function FAQ() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            자주 묻는 질문
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-white">
                {faq.q}
                <span className="shrink-0 text-sky-300 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
