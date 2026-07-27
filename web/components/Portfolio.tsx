import Image from "next/image";

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            제작 사례
          </h2>
          <p className="mt-4 text-slate-600">
            기획부터 배포까지, 실제로 진행한 프로젝트입니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 w-full">
              <Image
                src="/case/catharsis-hero.jpg"
                alt="카타르시스 연기학원 홈페이지 리뉴얼 후 데스크톱 히어로 화면"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-slate-900">
                카타르시스 연기학원 — 홈페이지 전체 리뉴얼
              </h3>
              <p className="mt-1 text-xs font-medium text-slate-400">
                연기학원 | 웹사이트 전체 리뉴얼
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                기획 · 디자인 · 개발 · 배포 전 과정 단독 수행. 합격자 실기
                영상·역대 합격자 콘텐츠와 실시간 상담 문의 동선을 중심으로
                재설계했습니다.
              </p>
              <a
                href="https://catharsisact.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                실제 사이트 보기 →
              </a>
            </div>
          </div>
          <a
            href="#inquiry"
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-white p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              다음 사례의 주인공이 되어주세요
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              지금 문의하면 두 번째 사례로 함께 만들어갑니다.
            </p>
            <span className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white">
              견적 문의하기
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
