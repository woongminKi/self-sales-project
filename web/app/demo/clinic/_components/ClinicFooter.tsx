export default function ClinicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 px-4 py-10 text-slate-300 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-4 text-sm">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span>성수바른내과의원 (가상)</span>
          <span>대표자: 김바른</span>
          <span>사업자등록번호: 000-00-00000 (가상)</span>
          <span>요양기관기호: 00000000 (가상)</span>
        </div>
        <p>서울시 성동구 ○○로 00 (데모용 가상 주소) · 02-000-0000</p>
        <p className="rounded-lg bg-slate-800 px-4 py-2 text-xs text-slate-400 sm:text-sm">
          이 페이지는 의료법 제56조 금지표현(최상급 표현, 효과 보장, 비교
          광고 등) 검수를 통과했습니다.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
          <a href="#" className="underline underline-offset-2 hover:text-white">
            개인정보처리방침 (데모)
          </a>
          <span>·</span>
          <span>웹사이트 제작 데모 — self-sales-project</span>
        </div>
      </div>
    </footer>
  );
}
