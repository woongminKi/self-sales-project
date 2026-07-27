const tiers = [
  {
    name: "라이트",
    price: "150만원~",
    desc: "템플릿 기반 홈페이지 + 기본 SEO",
    features: ["템플릿 기반 홈페이지 제작", "기본 SEO 설정"],
    highlight: false,
  },
  {
    name: "스탠다드",
    price: "280만원~",
    desc: "기획 동반 맞춤 제작 + 콘텐츠 구성 + SEO",
    features: ["기획 동반 맞춤 제작", "콘텐츠 구성", "SEO 최적화"],
    highlight: true,
  },
  {
    name: "프리미엄",
    price: "450만원~",
    desc: "스탠다드 + 예약·문의 기능 + 오픈 후 1개월 개선",
    features: ["스탠다드 구성 전체 포함", "예약·문의 기능", "오픈 후 1개월 개선"],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            가격 안내
          </h2>
          <p className="mt-4 text-slate-600">
            프로젝트 범위에 맞는 3단계 구성입니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? "border-blue-600 bg-white shadow-lg shadow-blue-100 ring-1 ring-blue-600"
                  : "border-slate-200 bg-slate-50/60"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                  가장 많이 선택
                </span>
              )}
              <h3 className="text-lg font-semibold text-slate-900">
                {tier.name}
              </h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-slate-600">{tier.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-8 py-5 sm:flex-row">
          <span className="text-sm font-semibold text-slate-900">
            애드온 · 유지보수
          </span>
          <span className="text-sm text-slate-600">
            월 15만원 (전 티어 공통, 선택 사항)
          </span>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          정확한 금액은 요구사항 상담 후 견적으로 안내드립니다. 앱·MVP 개발은
          별도 상담.
        </p>
      </div>
    </section>
  );
}
