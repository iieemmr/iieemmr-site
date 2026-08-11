const navLinks = [
  { href: "#event-details", label: "Event" },
  { href: "#video-highlights", label: "Highlights" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#mmr-history", label: "History" },
  { href: "#gallery", label: "Gallery" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:px-10">
        <a
          href="#"
          className="shrink-0 font-heading text-sm font-semibold text-white sm:text-base"
        >
          12th MMRC
        </a>
        <nav
          aria-label="Section navigation"
          className="nav-fade-x flex min-w-0 gap-x-5 overflow-x-auto text-sm font-medium text-slate-300 [&::-webkit-scrollbar]:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap py-1 transition hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
