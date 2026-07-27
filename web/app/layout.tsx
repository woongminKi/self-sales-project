import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "기획부터 함께하는 웹·앱 제작 | 1인 파트너",
  description:
    "기획 → 마케팅 → 개발까지 직접 해온 1인 파트너가 상담부터 오픈까지 책임집니다. AI 제작 워크플로우로 에이전시 절반의 기간에.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
