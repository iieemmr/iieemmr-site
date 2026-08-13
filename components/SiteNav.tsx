"use client";

import { useState } from "react";

const navLinks = [
  { href: "#event-details", label: "Event" },
  { href: "#video-highlights", label: "Highlights" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#mmr-history", label: "History" },
  { href: "#gallery", label: "Gallery" },
];

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:px-10">
        <a
          href="#"
          className="shrink-0 font-heading text-sm font-semibold text-white sm:text-base"
        >
          12th MMRC
        </a>

        <nav
          aria-label="Section navigation"
          className="hidden gap-x-5 text-sm font-medium text-slate-300 sm:flex"
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

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition hover:text-brand-gold sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-nav-menu"
          aria-label="Section navigation"
          className="flex flex-col gap-1 border-t border-white/10 px-6 py-3 text-sm font-medium text-slate-300 sm:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-2 transition hover:bg-white/5 hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
