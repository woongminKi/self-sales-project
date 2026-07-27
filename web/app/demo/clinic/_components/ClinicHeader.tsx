"use client";

import { useState } from "react";
import DemoAlertButton from "./DemoAlertButton";

const NAV_ITEMS = [
  { href: "#departments", label: "진료안내" },
  { href: "#doctors", label: "의료진" },
  { href: "#fees", label: "비급여 안내" },
  { href: "#location", label: "오시는 길" },
];

export default function ClinicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-teal-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
            성수
          </span>
          <span className="text-lg font-bold tracking-tight text-teal-900 sm:text-xl">
            성수바른내과의원
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <DemoAlertButton
            label="네이버 예약"
            className="rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          />
          <DemoAlertButton
            label="카카오톡 채널"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          />
        </div>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-slate-700 stroke-2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-teal-100 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <DemoAlertButton
              label="네이버 예약"
              className="flex-1 rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700"
            />
            <DemoAlertButton
              label="카카오톡 채널"
              className="flex-1 rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
            />
          </div>
        </div>
      )}
    </header>
  );
}
