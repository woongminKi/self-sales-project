const DEPARTMENTS = [
  {
    name: "소화기내과",
    when: "소화불량, 속쓰림, 복통, 역류성 식도염 증상이 있을 때",
  },
  {
    name: "호흡기내과",
    when: "기침·가래가 오래가거나, 인후통, 감기가 잘 낫지 않을 때",
  },
  {
    name: "순환기내과",
    when: "고혈압·고지혈증 관리, 두근거림·흉통 증상이 있을 때",
  },
  {
    name: "건강검진",
    when: "국가건강검진, 종합검진, 채용·입학용 건강진단서가 필요할 때",
  },
];

export default function DepartmentsSection() {
  return (
    <section id="departments" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          진료안내
        </h2>
        <p className="mt-2 text-slate-500">
          허가받은 내과 진료 범위 안에서, 필요한 진료를 받으실 수 있습니다.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((d) => (
            <div
              key={d.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-teal-700">{d.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {d.when}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
