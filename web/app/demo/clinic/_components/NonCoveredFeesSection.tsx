const FEES = [
  { name: "독감 예방접종", unit: "1회", price: "35,000원" },
  { name: "대상포진 예방접종", unit: "1회", price: "150,000원" },
  { name: "영양수액 (종합비타민)", unit: "1회", price: "50,000원" },
  { name: "진단서 발급", unit: "1부", price: "20,000원" },
  { name: "소견서 발급", unit: "1부", price: "10,000원" },
  { name: "건강검진 결과 상담", unit: "1회", price: "10,000원" },
];

export default function NonCoveredFeesSection() {
  return (
    <section id="fees" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          비급여 진료비용 고지
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          비급여 항목은 의료법에 따라 고지됩니다. 아래 금액은 데모용 예시이며
          실제 비용과 무관합니다.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full min-w-[420px] text-left text-sm sm:text-base">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold sm:px-6">항목</th>
                <th className="px-4 py-3 font-semibold sm:px-6">단위</th>
                <th className="px-4 py-3 font-semibold sm:px-6">비용</th>
              </tr>
            </thead>
            <tbody>
              {FEES.map((fee, i) => (
                <tr
                  key={fee.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                >
                  <td className="px-4 py-3 font-medium text-slate-800 sm:px-6">
                    {fee.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500 sm:px-6">
                    {fee.unit}
                  </td>
                  <td className="px-4 py-3 text-slate-800 sm:px-6">
                    {fee.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
