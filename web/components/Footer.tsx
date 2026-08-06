import Image from "next/image";
import { BUSINESS } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white px-1">
                <Image
                  src="/brand/logo-mark.png"
                  alt=""
                  width={256}
                  height={194}
                  className="h-auto w-full"
                />
              </span>
              <span className="text-base font-semibold text-white">
                {BUSINESS.brand}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">{BUSINESS.tagline}</p>
            <p className="mt-1 text-sm text-slate-500">
              대표 {BUSINESS.representative}
              {BUSINESS.registrationNo && (
                <> · 사업자등록번호 {BUSINESS.registrationNo}</>
              )}
            </p>
          </div>

          <div className="text-sm sm:text-right">
            <p className="text-slate-500">문의</p>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="mt-1 block text-white transition hover:text-sky-300"
            >
              {BUSINESS.email}
            </a>
            <a
              href="/privacy"
              className="mt-3 inline-block text-slate-400 underline underline-offset-2 transition hover:text-white"
            >
              개인정보처리방침
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
          © 2026 {BUSINESS.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
