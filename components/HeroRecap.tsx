"use client";

import Image from "next/image";
import { useReplayOnView } from "@/components/shared/useReplayOnView";

export default function HeroRecap() {
  const { ref, isAnimating } = useReplayOnView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden bg-navy-950 px-6 py-24 text-center sm:px-10"
    >
      <Image
        src="/photos/hero.jpg"
        alt="Delegates and officers of the 12th Metro Manila Regional Conference celebrating together"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[62%_center] sm:object-[58%_center] lg:object-center ${isAnimating ? "animate-hero-zoom" : ""}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-gold opacity-20 blur-3xl"
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <h1
          className={`opacity-0 font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl ${isAnimating ? "animate-fade-in-up" : ""}`}
        >
          <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-gold bg-clip-text text-transparent">
            12th
          </span>{" "}
          Metro Manila Regional Conference
        </h1>

        <p
          className={`opacity-0 font-heading text-xl font-semibold text-brand-gold sm:text-2xl ${isAnimating ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "100ms" }}
        >
          Thank you, IIEE Brighter 2026.
        </p>

        <p
          className={`opacity-0 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg ${isAnimating ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "200ms" }}
        >
          Four unforgettable days of learning, innovation, fellowship, and
          service — Metro Manila Region says thank you to every delegate,
          chapter, and partner who made the 12th MMRC one for the books.
        </p>

        <p
          className={`opacity-0 text-sm font-medium uppercase tracking-widest text-brand-teal sm:text-base ${isAnimating ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "300ms" }}
        >
          01–04 July 2026 · MERALCO, Ortigas, Metro Manila
        </p>

        <a
          href="#video-highlights"
          className={`opacity-0 mt-4 inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-base font-semibold text-navy-950 transition hover:bg-white ${isAnimating ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "400ms" }}
        >
          Watch Highlights
        </a>
      </div>

      <a
        href="#before-after"
        aria-label="Scroll to then and now section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-300 transition hover:text-brand-gold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-chevron-bounce h-6 w-6"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
