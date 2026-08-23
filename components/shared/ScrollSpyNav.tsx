"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollSpyNavItem = { id: string; label: string };

type ScrollSpyNavProps = {
  items: ScrollSpyNavItem[];
  ariaLabel: string;
  navClassName: string;
  rootMargin?: string;
  activeClassName?: string;
};

export default function ScrollSpyNav({
  items,
  ariaLabel,
  navClassName,
  rootMargin = "-120px 0px -55% 0px",
  activeClassName = "bg-navy-950 text-white",
}: ScrollSpyNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const itemIds = items.map((item) => item.id).join(",");
  const intersectingIds = useRef<Set<string>>(new Set());
  // While set, a just-clicked tab wins ties over tab-order — otherwise
  // clicking "Lunch" (which shares a row, and therefore a scroll position,
  // with Fellowship) would immediately get overridden back to Fellowship.
  const pinnedId = useRef<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    intersectingIds.current = new Set();

    // Sections that sit side-by-side (e.g. Fellowship/Lunch sharing one row)
    // cross the trigger line at the same time, so more than one can be
    // intersecting at once. Track the full intersecting set and prefer the
    // pinned (just-clicked) tab if it's still in view, otherwise whichever
    // comes first in tab order — instead of just reacting to whichever
    // entry this callback happens to process last.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingIds.current.add(entry.target.id);
          } else {
            intersectingIds.current.delete(entry.target.id);
          }
        }
        if (pinnedId.current && !intersectingIds.current.has(pinnedId.current)) {
          pinnedId.current = null;
        }
        const resolved =
          (pinnedId.current && intersectingIds.current.has(pinnedId.current)
            ? pinnedId.current
            : null) ??
          items.find((item) => intersectingIds.current.has(item.id))?.id ??
          null;
        if (resolved) setActiveId(resolved);
      },
      { rootMargin, threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIds, rootMargin]);

  return (
    <nav aria-label={ariaLabel} className={navClassName}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => {
            pinnedId.current = item.id;
            setActiveId(item.id);
          }}
          aria-current={activeId === item.id ? "true" : undefined}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide outline-none transition-colors hover:text-navy-950 focus-visible:ring-2 focus-visible:ring-navy-950 sm:text-sm ${
            activeId === item.id ? activeClassName : "text-slate-500"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
