import Image from "next/image";

/*
  사례 섹션의 역할을 재정의했다: "성과 증거"가 아니라 "제작 역량 증거".
  성과 숫자는 2026-07-29에 심은 측정 장치의 데이터가 쌓인 뒤 삽입한다.
  기존 "다음 사례의 주인공이 되어주세요"는 삭제 — 사례가 없다는 약점을 스스로 드러내는 문장이었다.
*/
export default function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            Work
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            제작 사례
          </h2>
          <p className="mt-4 text-slate-400">
            기획 · 디자인 · 개발 · 배포를 혼자 진행했습니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* 실제 유료 제작 건 */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative h-52 w-full border-b border-white/10">
              <Image
                src="/case/catharsis-hero.jpg"
                alt="카타르시스 연기학원 홈페이지 리뉴얼 후 메인 화면"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-7">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                운영 중
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                카타르시스 연기학원
              </h3>
              <p className="mt-1 font-mono text-sm text-sky-300/80">
                catharsisact.com
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                홈페이지 전체 리뉴얼. 합격자 실기 영상·역대 합격 실적과 실시간
                상담 문의 동선을 중심으로 재설계했습니다.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                기획 · 디자인 · 개발 · 배포 단독 수행 · 성과 측정 장치 적용
              </p>
              <a
                href="https://catharsisact.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-white transition hover:text-sky-300"
              >
                사이트 방문하기
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {/* 의원 데모 — 병원 대상 방문자에게는 학원 사례보다 이쪽이 직접적이다 */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <span className="inline-flex items-center gap-1.5 text-xs text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              제작 예시
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">
              의원 홈페이지 데모
            </h3>
            <p className="mt-1 font-mono text-sm text-sky-300/80">
              /demo/clinic
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
              가상 의원으로 만든 제작 예시입니다. 의료법 제56조 금지광고 기준을
              적용해 문구를 검수했고, 진료안내·의료진·비급여 안내·예약 동선까지
              실제 구성 그대로 담았습니다.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              반응형 · 전화 연결 · 비급여 고지 · 개인정보 동의 절차 포함
            </p>
            <a
              href="/demo/clinic"
              className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-white transition hover:text-sky-300"
            >
              데모 열어보기
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
