import { BUSINESS } from "@/lib/business";

/*
  커리어를 "자랑"이 아니라 "왜 1인으로 가능한가의 근거"로 배치한다.
  금액 비교(에이전시 600~1,000만원)는 넣지 않았다 — 직접 조사한 근거가 없고,
  원장이 실제 견적을 받아보고 다르면 신뢰가 무너진다.
  인원 구성도 단정하지 않고 "보통"으로 완화했다.
*/
const rows = [
  {
    label: "투입 인원",
    others: "보통 3~5명이 팀으로",
    mine: "1명 (디자인은 외부 협업)",
  },
  {
    label: "소통 경로",
    others: "영업 → PM → 개발자",
    mine: "만드는 사람과 직접",
  },
  {
    label: "성과 측정 세팅",
    others: "별도 견적이거나 없음",
    mine: "전 구성 기본 포함",
  },
  {
    label: "의료법 문구 검수",
    others: "검수한다고는 하지만 결과물은 남지 않음",
    mine: "제56조 항목별 리포트로 납품",
  },
];

export default function Compare() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            Why 1인
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            혼자 하는데 왜 되는가
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1fr_1.2fr_1.2fr] border-b border-white/10 bg-white/[0.04] text-xs font-medium text-slate-400">
            <div className="px-4 py-3 sm:px-6">항목</div>
            <div className="px-4 py-3 sm:px-6">일반적인 외주팀</div>
            <div className="px-4 py-3 text-white sm:px-6">{BUSINESS.brand}</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[1fr_1.2fr_1.2fr] border-b border-white/10 text-sm last:border-b-0"
            >
              <div className="px-4 py-4 text-slate-400 sm:px-6">{r.label}</div>
              <div className="px-4 py-4 text-slate-500 sm:px-6">{r.others}</div>
              <div className="bg-white/[0.03] px-4 py-4 font-medium text-white sm:px-6">
                {r.mine}
              </div>
            </div>
          ))}
        </div>

        {/* 위 표가 성립하는 이유 = 한 사람이 세 직군을 실제로 해봤다는 것 */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-base font-semibold text-white">
              {BUSINESS.representative}
            </span>
            <span className="text-sm text-slate-500">{BUSINESS.brand} 대표</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            IT 회사에서 <span className="text-slate-200">마케터</span>로
            시작해 <span className="text-slate-200">기획자(PM)</span>를 거쳐
            지금은 <span className="text-slate-200">개발자</span>로 일하고
            있습니다. 세 직군 모두 실제로 채용되어 급여를 받으며 해온 일입니다.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            보통 외주는 이 세 사람을 각각 붙여야 해서 비용이 올라갑니다. 저는 그
            셋을 한 사람이 하기 때문에, 중간 전달 과정에서 말이 새지 않고 비용도
            내려갑니다.
          </p>
        </div>
      </div>
    </section>
  );
}
