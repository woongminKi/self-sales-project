import type { Metadata } from "next";
import "./globals.css";

const TITLE = "병원·의원 홈페이지 제작 | 웅쓰컴퍼니";
const DESCRIPTION =
  "홈페이지를 만들고, 효과가 있었는지까지 숫자로 알려드립니다. 기획·마케팅·개발을 직접 해온 1인이 진단부터 오픈, 첫 달 리포트까지 책임집니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // 1군 접촉은 통화 후 문자로 링크를 보낸다 — 카톡·문자 미리보기에 브랜드가 보이게 한다
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "ko_KR",
    siteName: "웅쓰컴퍼니",
    images: [{ url: "/brand/logo-square.png", width: 256, height: 256 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#0b1220] font-sans text-slate-300">
        {children}
      </body>
    </html>
  );
}
