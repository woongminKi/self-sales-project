import Image from "next/image";
import { BUSINESS } from "@/lib/business";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          {/* 로고 원본이 흰 종이 목업이라 배경을 지울 수 없다. 흰 칩 위에 얹어 의도된 배지로 보이게 한다. */}
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white px-1.5">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={256}
              height={194}
              priority
              className="h-auto w-full"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            {BUSINESS.brand}
          </span>
        </a>
        <a
          href="#inquiry"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
        >
          무료 점검 신청
        </a>
      </div>
    </header>
  );
}
