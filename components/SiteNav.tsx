"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#before-after", label: "Then & Now" },
  { href: "#event-details", label: "Event" },
  { href: "#video-highlights", label: "Highlights" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#mmr-history", label: "History" },
  { href: "#gallery", label: "Gallery" },
];

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = activeId ? linkRefs.current[activeId] : null;
      if (!activeLink) {
        setIndicator((prev) => ({ ...prev, ready: false }));
        return;
      }
      setIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        ready: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeId]);

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
          ref={navRef}
          aria-label="Section navigation"
          className="relative hidden gap-x-5 text-sm font-medium text-slate-300 sm:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              ref={(el) => {
                linkRefs.current[link.href] = el;
              }}
              href={link.href}
              aria-current={activeId === link.href ? "true" : undefined}
              className={`whitespace-nowrap py-1 transition-colors duration-300 ease-out hover:text-brand-gold ${
                activeId === link.href ? "text-brand-gold" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-brand-gold transition-all duration-300 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
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
              aria-current={activeId === link.href ? "true" : undefined}
              className={`rounded-md px-2 py-2 transition-colors duration-300 ease-out hover:bg-white/5 hover:text-brand-gold ${
                activeId === link.href ? "text-brand-gold" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
