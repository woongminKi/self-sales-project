export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          웅쓰컴퍼니
        </span>
        <a
          href="#inquiry"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          견적 문의
        </a>
      </div>
    </header>
  );
}
