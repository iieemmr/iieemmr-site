"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#before-after", label: "Presenting" },
  { href: "/#event-details", label: "Event" },
  { href: "/#video-highlights", label: "Highlights" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/#mmr-history", label: "History" },
  { href: "/#gallery", label: "Gallery" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [mobileIndicator, setMobileIndicator] = useState({ top: 0, height: 0, ready: false });
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const mobileLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    // Full-page routes (e.g. "/sponsors") aren't in-page anchors — scroll-spy
    // only applies on the homepage; other pages are highlighted by pathname
    // directly during render instead.
    if (pathname !== "/") return;

    const anchorLinks = navLinks.filter((link) => link.href.startsWith("/#"));
    const sections = anchorLinks
      .map((link) => document.querySelector(link.href.slice(1)))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(`/#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  // "/sponsors" is the only subpage this nav links to (via the homepage
  // teaser's CTA), so it still counts as the "Sponsors" section being active.
  const activeNavId =
    pathname === "/" ? activeId : pathname.startsWith("/sponsors") ? "/#sponsors" : pathname;

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = activeNavId ? linkRefs.current[activeNavId] : null;
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
  }, [activeNavId]);

  useEffect(() => {
    const activeLink = activeNavId ? mobileLinkRefs.current[activeNavId] : null;
    if (!activeLink) {
      setMobileIndicator((prev) => ({ ...prev, ready: false }));
      return;
    }
    setMobileIndicator({
      top: activeLink.offsetTop,
      height: activeLink.offsetHeight,
      ready: true,
    });
  }, [activeNavId, isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:px-10">
        <Link
          href="/"
          onClick={(event) => {
            // Next's router treats "/" -> "/" (even with a different hash)
            // as a same-route no-op and won't scroll, so the logo silently
            // does nothing if you're already on the homepage. Force it.
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }
          }}
          className="flex shrink-0 items-center gap-2 font-heading text-sm font-semibold text-white sm:text-base"
        >
          <Image
            src="/brand/iiee-logo.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          12th MMRC
        </Link>

        <nav
          ref={navRef}
          aria-label="Section navigation"
          className="relative hidden gap-x-5 text-sm font-medium text-slate-300 sm:flex"
        >
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                ref={(el: HTMLAnchorElement | null) => {
                  linkRefs.current[link.href] = el;
                }}
                href={link.href}
                aria-current={activeNavId === link.href ? "true" : undefined}
                className={`whitespace-nowrap py-1 transition-colors duration-300 ease-out hover:text-brand-gold ${
                  activeNavId === link.href ? "text-brand-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-nav-menu"
          aria-label="Section navigation"
          className="relative flex flex-col gap-1 border-t border-white/10 px-6 py-3 text-sm font-medium text-slate-300 sm:hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 w-0.5 rounded-full bg-brand-gold transition-all duration-300 ease-out"
            style={{
              top: mobileIndicator.top,
              height: mobileIndicator.height,
              opacity: mobileIndicator.ready ? 1 : 0,
            }}
          />
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                ref={(el: HTMLAnchorElement | null) => {
                  mobileLinkRefs.current[link.href] = el;
                }}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={activeNavId === link.href ? "true" : undefined}
                className={`rounded-md px-2 py-2 transition-colors duration-300 ease-out hover:bg-white/5 hover:text-brand-gold ${
                  activeNavId === link.href ? "text-brand-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
