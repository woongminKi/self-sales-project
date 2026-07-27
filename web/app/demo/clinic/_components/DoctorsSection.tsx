const DOCTORS = [
  {
    name: "김바른",
    role: "대표원장",
    gender: "여",
    license: "의사면허 · 내과 전문의",
    lines: [
      "○○대학교 의과대학 졸업",
      "○○대학교병원 내과 전공의 수료",
      "○○병원 내과 과장 역임",
      "대한내과학회 정회원",
    ],
  },
  {
    name: "이정직",
    role: "진료의",
    gender: "남",
    license: "의사면허",
    lines: ["○○대학교 의과대학 졸업", "○○병원 인턴 수료"],
  },
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="bg-teal-50/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          의료진
        </h2>
        <p className="mt-2 text-slate-500">
          아래 프로필은 데모용 가상 정보입니다.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {DOCTORS.map((doc) => (
            <div
              key={doc.name}
              className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white">
                {doc.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  {doc.role}
                </p>
                <h3 className="text-lg font-bold text-slate-900">
                  {doc.name}{" "}
                  <span className="text-sm font-medium text-slate-400">
                    ({doc.gender})
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {doc.license}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-500">
                  {doc.lines.map((line) => (
                    <li key={line}>· {line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
