export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-slate-500">
        <p>
          이메일:{" "}
          <a href="mailto:woongs.official@gmail.com" className="underline underline-offset-2 hover:text-slate-700">
            woongs.official@gmail.com
          </a>
        </p>
        <p>&copy; 2026</p>
      </div>
    </footer>
  );
}
