"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TIER_SELECT_EVENT } from "./Pricing";

type Status = "idle" | "submitting" | "success" | "error";

const TIER_OPTIONS = ["라이트", "스탠다드", "프리미엄"];

const NEED_OPTIONS = [
  "홈페이지 신규",
  "홈페이지 리뉴얼",
  "웹 서비스·앱",
  "아직 모르겠어요",
];

const BUDGET_OPTIONS = [
  "150만원 내외",
  "300만원 내외",
  "500만원 이상",
  "상담 후 결정",
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

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
    setFieldError(null);
    setStatus("submitting");

    const payload = {
      name,
      org: String(data.get("org") ?? "").trim(),
      phone,
      email: String(data.get("email") ?? "").trim(),
      tier: String(data.get("tier") ?? "").trim(),
      need: String(data.get("need") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
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
      <section id="inquiry" className="bg-slate-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            문의가 접수되었습니다
          </h2>
          <p className="mt-3 text-slate-600">
            빠른 시일 내에 남겨주신 연락처로 회신드리겠습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            견적 문의하기
          </h2>
          <p className="mt-4 text-slate-600">
            간단한 정보만 남겨주시면 빠르게 연락드립니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          {/* Honeypot field — hidden from real users, left empty by them; bots that fill it get silently ignored server-side. */}
          <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden="true">
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
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                성함 <span className="text-blue-600">*</span>
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
              <label htmlFor="org" className="text-sm font-medium text-slate-700">
                상호/기관명
              </label>
              <input
                type="text"
                id="org"
                name="org"
                className={inputClass}
                placeholder="OO학원"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                연락처 <span className="text-blue-600">*</span>
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
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
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

          <div>
            <label htmlFor="tier" className="text-sm font-medium text-slate-700">
              관심 상품
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
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="need" className="text-sm font-medium text-slate-700">
                필요한 것
              </label>
              <select id="need" name="need" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  선택해주세요
                </option>
                {NEED_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="text-sm font-medium text-slate-700">
                예산대
              </label>
              <select id="budget" name="budget" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  선택해주세요
                </option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              내용
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={inputClass}
              placeholder="필요하신 내용을 자유롭게 남겨주세요."
            />
          </div>

          {fieldError && (
            <p className="text-sm font-medium text-red-600">{fieldError}</p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">
              일시적으로 접수가 어렵습니다. 이메일로 문의해주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "전송 중..." : "문의 보내기"}
          </button>
        </form>
      </div>
    </section>
  );
}
