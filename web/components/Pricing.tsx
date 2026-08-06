"use client";

import { useEffect, useState } from "react";

/*
  업종 탭으로 두 견적 프레임을 함께 노출한다.
  - 의원: 경쟁사 실측 조사 기반(docs/research/2026-07-27-hospital-vendor-research.md). 콜드 주력 대상이라 기본값.
  - 학원·매장: PLAN.md의 기존 3단 프레임.
  탭 선택은 문의 폼의 "관심 구성"에 업종까지 함께 전달된다.
*/
type Industry = "clinic" | "general";

const PLANS: Record<
  Industry,
  {
    label: string;
    note: string;
    tiers: {
      name: string;
      price: string;
      lead: string;
      desc: string;
      features: string[];
      highlight: boolean;
    }[];
    maintenance: { name: string; price: string; detail: string }[];
  }
> = {
  clinic: {
    label: "병원 · 의원",
    note: "의료광고 사전심의 대행은 범위 밖입니다 — 자체 홈페이지는 심의 대상이 아니며, 심의는 의료기관이 직접 신청하는 절차입니다.",
    tiers: [
      {
        name: "Lite",
        price: "180만원",
        lead: "2주",
        desc: "반응형 5~7페이지로 기본을 갖춥니다",
        features: [
          "반응형 5~7페이지 (메인·진료안내·의료진·오시는길·예약)",
          "네이버 예약 · 카카오채널 연동",
          "도메인 · 보안 인증서(SSL) 세팅",
          "의료법 제56조 문구 검수 리포트",
        ],
        highlight: false,
      },
      {
        name: "Standard",
        price: "380만원",
        lead: "4주",
        desc: "비급여 항목을 직접 수정할 수 있게 만듭니다",
        features: [
          "맞춤 디자인 10~15페이지",
          "진료과목별 상세 페이지",
          "비급여 항목 관리 화면 (직접 수정 가능)",
          "예약 폼 + 알림톡 연동",
          "검수 리포트 + 1회 재검수",
        ],
        highlight: true,
      },
      {
        name: "Pro",
        price: "680만원",
        lead: "6~8주",
        desc: "브랜딩과 검색 노출까지 함께 잡습니다",
        features: [
          "20페이지 이상 · 브랜딩 톤앤매너",
          "실시간 예약 시스템",
          "검색 최적화(SEO) 초기 세팅",
          "콘텐츠 촬영 디렉션",
          "검수 리포트 + 3개월 무제한 재검수",
        ],
        highlight: false,
      },
    ],
    maintenance: [
      { name: "Basic", price: "월 8만원", detail: "월 4건 수정 · 영업일 2일 내 응답" },
      {
        name: "Care",
        price: "월 15만원",
        detail:
          "월 10건 수정 · 비급여·의료진·휴진 갱신 · 월간 리포트 · 영업일 1일 내 응답",
      },
    ],
  },
  general: {
    label: "학원 · 매장",
    note: "앱·웹 서비스(MVP) 개발은 범위가 달라 상담 후 별도로 산정해 드립니다.",
    tiers: [
      {
        name: "라이트",
        price: "150만원",
        lead: "2주",
        desc: "템플릿 기반으로 빠르게 시작합니다",
        features: [
          "템플릿 기반 홈페이지 제작",
          "기본 검색 노출 설정",
          "도메인 · 보안 인증서(SSL) 세팅",
        ],
        highlight: false,
      },
      {
        name: "스탠다드",
        price: "280만원",
        lead: "4주",
        desc: "기획부터 함께 맞춤으로 만듭니다",
        features: [
          "기획 동반 맞춤 제작",
          "콘텐츠 구성 (강사·수업·후기 등)",
          "검색 최적화(SEO)",
          "오픈 후 3개월 유지보수",
        ],
        highlight: true,
      },
      {
        name: "프리미엄",
        price: "450만원",
        lead: "6주",
        desc: "예약·문의 기능까지 붙입니다",
        features: [
          "스탠다드 구성 전체 포함",
          "예약 · 문의 기능",
          "오픈 후 1개월 개선",
          "오픈 후 6개월 유지보수",
        ],
        highlight: false,
      },
    ],
    maintenance: [
      {
        name: "유지보수",
        price: "월 15만원",
        detail: "전 구성 공통 · 선택 사항 · 콘텐츠 갱신과 오류 대응",
      },
    ],
  },
};

export const TIER_SELECT_EVENT = "tier-select";

export default function Pricing() {
  const [industry, setIndustry] = useState<Industry>("clinic");
  const [selected, setSelected] = useState<string | null>(null);

  const plan = PLANS[industry];

  useEffect(() => {
    // 업종이 바뀌면 이전 티어 선택은 무효 — 폼에도 빈 값을 보낸다
    setSelected(null);
  }, [industry]);

  useEffect(() => {
    const detail = selected ? `${plan.label} ${selected}` : "";
    window.dispatchEvent(new CustomEvent(TIER_SELECT_EVENT, { detail }));
  }, [selected, plan.label]);

  function selectAndScroll(name: string) {
    setSelected(name);
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="pricing" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            가격을 먼저 공개합니다
          </h2>
          <p className="mt-4 text-slate-400">
            성과 측정 세팅과 첫 달 리포트는 전 구성 공통 포함입니다. (VAT 별도)
          </p>
        </div>

        {/* 업종 탭 */}
        <div className="mt-9 flex justify-center">
          <div
            role="tablist"
            aria-label="업종 선택"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {(Object.keys(PLANS) as Industry[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={industry === key}
                onClick={() => setIndustry(key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  industry === key
                    ? "bg-white text-[#0b1220]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {PLANS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plan.tiers.map((tier) => {
            const isSelected = selected === tier.name;
            return (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-7 transition ${
                  isSelected || tier.highlight
                    ? "border-sky-400/40 bg-sky-400/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="rounded-full bg-sky-400/15 px-2.5 py-0.5 text-[11px] font-medium text-sky-300">
                      주력
                    </span>
                  )}
                </div>
                <p className="mt-4 text-2xl font-bold text-white">{tier.price}</p>
                <p className="mt-1 text-xs text-slate-500">납기 {tier.lead}</p>
                <p className="mt-3 text-sm text-slate-400">{tier.desc}</p>

                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-400">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400/70" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => selectAndScroll(tier.name)}
                  className={`mt-7 w-full rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-white text-[#0b1220] hover:bg-slate-200"
                      : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  이 구성으로 문의
                </button>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-6 grid gap-4 ${
            plan.maintenance.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {plan.maintenance.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-white">
                  {m.name === "유지보수" ? m.name : `유지보수 ${m.name}`}
                </span>
                <span className="text-sm font-medium text-sky-300">{m.price}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">{plan.note}</p>
      </div>
    </section>
  );
}
