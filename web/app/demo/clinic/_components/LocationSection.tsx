export default function LocationSection() {
  return (
    <section id="location" className="bg-teal-50/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            오시는 길
          </h2>
          <dl className="mt-6 space-y-4 text-sm sm:text-base">
            <div>
              <dt className="font-semibold text-slate-500">주소</dt>
              <dd className="mt-1 text-slate-800">
                서울시 성동구 ○○로 00 (데모용 가상 주소)
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">지하철</dt>
              <dd className="mt-1 text-slate-800">
                2호선 성수역 2번 출구 도보 5분 (가상 안내)
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">버스</dt>
              <dd className="mt-1 text-slate-800">
                성수동공영주차장 정류장 하차 (가상 안내)
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">전화</dt>
              <dd className="mt-1 text-slate-800">02-000-0000</dd>
            </div>
          </dl>
        </div>
        <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-teal-200 bg-white text-sm text-slate-400 sm:min-h-[300px]">
          지도 영역 (데모에서는 표시하지 않습니다)
        </div>
      </div>
    </section>
  );
}
