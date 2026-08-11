export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 px-6 py-10 text-center sm:px-10">
      <p className="font-heading text-sm font-semibold text-white sm:text-base">
        IIEE Metro Manila Region
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Thank you for being part of the 12th MMRC — Brighter 2026.
      </p>
      <p className="mt-6 text-xs text-slate-500">
        &copy; {year} IIEE Metro Manila Region. All rights reserved.
      </p>
      <a
        href="#"
        className="mt-4 inline-block text-xs font-medium text-brand-teal transition hover:text-brand-gold"
      >
        Back to top ↑
      </a>
    </footer>
  );
}
