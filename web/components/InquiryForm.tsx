"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TIER_SELECT_EVENT } from "./Pricing";
import { BUSINESS } from "@/lib/business";

type Status = "idle" | "submitting" | "success" | "error";

// 가격 섹션의 업종 탭에서 선택하면 "병원 · 의원 Standard" 형태로 자동 채워진다.
const TIER_OPTIONS = [
  "병원 · 의원 Lite",
  "병원 · 의원 Standard",
  "병원 · 의원 Pro",
  "학원 · 매장 라이트",
  "학원 · 매장 스탠다드",
  "학원 · 매장 프리미엄",
  "아직 모르겠습니다",
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/50 focus:bg-white/[0.06]";

const labelClass = "text-sm font-medium text-slate-300";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [tier, setTier] = useState("");

  useEffect(() => {
    function handleTierSelect(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setTier(detail ?? "");
    }
    window.addEventListener(TIER_SELECT_EVENT, handleTierSelect);
    return () => window.removeEventListener(TIER_SELECT_EVENT, handleTierSelect);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!name || !phone) {
      setFieldError("성함과 연락처는 필수 입력 항목입니다.");
      return;
    }
    if (!data.get("consent")) {
      setFieldError("개인정보 수집·이용에 동의해주셔야 접수가 가능합니다.");
      return;
    }
    setFieldError(null);
    setStatus("submitting");

    const payload = {
      name,
      org: String(data.get("org") ?? "").trim(),
      phone,
      email: String(data.get("email") ?? "").trim(),
      homepage: String(data.get("homepage") ?? "").trim(),
      tier: String(data.get("tier") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({ ok: false }));

      if (res.ok && result.ok) {
        setStatus("success");
        setTier("");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="inquiry" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-sky-400/30 bg-sky-400/[0.06] p-10 text-center">
          <h2 className="text-2xl font-bold text-white">접수되었습니다</h2>
          <p className="mt-3 text-slate-400">
            남겨주신 연락처로 회신드리겠습니다. 점검 리포트는 보통 1~2일 내에
            보내드립니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/80">
            Free Check
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            무료 점검 신청
          </h2>
          <p className="mt-4 text-slate-400">
            지금 홈페이지의 문제를 문서로 정리해 보내드립니다.
            <br className="hidden sm:block" />{" "}
            <span className="text-slate-300">
              점검만 받고 진행하지 않으셔도 됩니다.
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
        >
          {/* Honeypot — 실제 사용자에게는 보이지 않는다. 봇이 채우면 서버에서 조용히 무시된다. */}
          <div
            className="absolute -left-[9999px] top-0 opacity-0"
            aria-hidden="true"
          >
            <label htmlFor="company">회사명</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                성함 <span className="text-sky-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={inputClass}
                placeholder="홍길동"
              />
            </div>
            <div>
              <label htmlFor="org" className={labelClass}>
                의원 · 기관명
              </label>
              <input
                type="text"
                id="org"
                name="org"
                className={inputClass}
                placeholder="OO의원"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelClass}>
                연락처 <span className="text-sky-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className={inputClass}
                placeholder="010-0000-0000"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClass}
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* 점검 대상 주소 — 이게 있어야 리포트를 쓸 수 있다 */}
          <div>
            <label htmlFor="homepage" className={labelClass}>
              홈페이지 주소{" "}
              <span className="text-slate-500">(있으시면)</span>
            </label>
            <input
              type="text"
              id="homepage"
              name="homepage"
              className={inputClass}
              placeholder="example.co.kr"
            />
            <p className="mt-1.5 text-xs text-slate-600">
              없으시면 비워두세요. 검색에서 무엇이 보이는지부터 점검해 드립니다.
            </p>
          </div>

          <div>
            <label htmlFor="tier" className={labelClass}>
              관심 구성
            </label>
            <select
              id="tier"
              name="tier"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className={inputClass}
            >
              <option value="">선택 안 함</option>
              {TIER_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111a2b]">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              남기실 말씀
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={inputClass}
              placeholder="지금 불편하신 점이나 궁금하신 것을 자유롭게 남겨주세요."
            />
          </div>

          {/* 개인정보 수집 동의 — 이 폼이 개인정보를 받으므로 필수 절차다 */}
          <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-4 w-4 shrink-0 accent-sky-500"
            />
            <span className="text-xs leading-relaxed text-slate-400">
              <span className="text-slate-300">[필수]</span> 문의 응대와 견적
              안내를 위해 성함·연락처·이메일·의원명·홈페이지 주소·문의 내용을
              수집하며, 목적 달성 후 또는 {BUSINESS.retentionPeriod} 내 파기합니다.
              동의를 거부하실 수 있으나 이 경우 문의 접수가 제한됩니다.{" "}
              <a
                href="/privacy"
                className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
              >
                개인정보처리방침
              </a>
            </span>
          </label>

          {fieldError && (
            <p className="text-sm font-medium text-rose-400">{fieldError}</p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-rose-400">
              일시적으로 접수가 어렵습니다. {BUSINESS.email} 으로 문의해주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0b1220] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "전송 중..." : "무료 점검 신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
