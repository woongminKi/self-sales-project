export default function ClinicHero() {
  return (
    <section
      id="top"
      className="bg-gradient-to-b from-teal-50 to-white px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            서울 성동구 성수동 내과
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl lg:text-5xl">
            정확한 진단,
            <br />
            충분한 설명.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            증상을 끝까지 듣고, 검사 결과를 이해하실 때까지 설명해 드립니다.
            소화기·호흡기·순환기 진료와 건강검진을 함께 받으실 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#departments"
              className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 sm:text-base"
            >
              진료과목 보기
            </a>
            <a
              href="#location"
              className="rounded-full border border-teal-200 px-6 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 sm:text-base"
            >
              오시는 길
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-bold text-slate-900">
            진료 시간 안내
          </h2>
          <dl className="mt-4 space-y-3 text-sm sm:text-base">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <dt className="text-slate-500">평일</dt>
              <dd className="font-semibold text-slate-800">
                09:00 - 18:30
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <dt className="text-slate-500">토요일</dt>
              <dd className="font-semibold text-slate-800">
                09:00 - 13:00
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <dt className="text-slate-500">점심시간</dt>
              <dd className="font-semibold text-slate-800">
                13:00 - 14:00
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">일요일·공휴일</dt>
              <dd className="font-semibold text-slate-800">휴진</dd>
            </div>
          </dl>
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            매주 목요일 오후는 정기 휴진입니다. (오전 09:00 - 13:00 진료)
          </p>
        </div>
      </div>
    </section>
  );
}
