"use client";

import { useEffect, useRef, useState } from "react";

// Fires (and re-fires) `isAnimating` every time the observed element enters
// the viewport — not just once on mount — so entrance animations replay
// when a section scrolls back into view, and so they wait for the section
// to actually be visible instead of firing during a still-settling
// client-side route transition.
export function useReplayOnView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimating(false);
          requestAnimationFrame(() => setIsAnimating(true));
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isAnimating };
}
