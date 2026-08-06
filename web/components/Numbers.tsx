/*
  기존 "이런 고민으로 오셨나요?"(문제 4카드)를 대체한다.
  일반적인 고민 나열은 어느 업체나 쓰는 문장이라 차별화가 되지 않는다.
  질문형으로 바꿔 원장이 자기 데이터를 떠올리게 하고, "넷 다 모른다"는 자각을 만든다.
  그 자각이 구매 동기다.
*/
const questions = [
  "지난달 홈페이지에 몇 분이 오셨습니까?",
  "그중 몇 분이 전화나 예약으로 이어졌습니까?",
  "그분들은 검색에서 오셨습니까, 인스타에서 오셨습니까?",
  "문의하려다 실패한 분은 몇 분입니까?",
];

export default function Numbers() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            The Numbers
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            이 숫자를 알고 계십니까?
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {questions.map((q, i) => (
            <div
              key={q}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="mt-0.5 shrink-0 font-mono text-sm text-sky-300/70">
                0{i + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-slate-200">{q}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-white">
            넷 중 하나라도 모르신다면, 그게 정상입니다.
          </p>
          <p className="mt-2 text-slate-400">
            아무도 셀 수 있게 만들어드리지 않았으니까요.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            홈페이지가 아직 없으시면, 환자분이 검색할 때 무엇을 보고 계신지부터
            점검해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
