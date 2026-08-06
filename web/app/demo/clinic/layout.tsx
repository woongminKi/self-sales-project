import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "성수바른내과의원 (제작 데모)",
  description:
    "웹사이트 제작 데모 페이지입니다. 성수바른내과의원은 실존하지 않는 가상 의료기관이며 어떠한 의료 서비스도 제공하지 않습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClinicDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // id는 globals.css의 body:has(#clinic-demo) 셀렉터가 참조한다.
  // 본 사이트는 다크, 이 데모는 실제 의원 사이트를 흉내내는 라이트 테마로 분리한다.
  return (
    <div id="clinic-demo" className="min-h-screen bg-white text-slate-900">
      {children}
    </div>
  );
}
