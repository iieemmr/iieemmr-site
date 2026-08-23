"use client";

import Link from "next/link";
import LogoGrid, { type LogoGridSize } from "@/components/shared/LogoGrid";
import ScrollSpyNav from "@/components/shared/ScrollSpyNav";
import { useReplayOnView } from "@/components/shared/useReplayOnView";
import { TIER_ORDER, sponsors, acknowledgments, type Tier } from "@/data/sponsors";

const TIER_SIZE: Record<Tier, LogoGridSize> = {
  Jade: "large",
  Ruby: "large",
  Diamond: "large-3col",
  Gold: "medium",
  Fellowship: "medium",
  Lunch: "medium",
  Others: "medium",
};

function tierAnchor(tier: Tier) {
  return `sponsors-${tier.toLowerCase()}`;
}

type TierGroup = { tier: Tier; sponsors: (typeof sponsors)[number][] };

function TierSection({ tier, sponsors: tierSponsors }: TierGroup) {
  return (
    <section id={tierAnchor(tier)} className="scroll-mt-24">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-xl font-bold text-navy-950 sm:text-2xl">
          {tier} Sponsors
        </h2>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {tierSponsors.length} Total
        </span>
      </div>
      <LogoGrid sponsors={tierSponsors} size={TIER_SIZE[tier]} />
    </section>
  );
}

export default function SponsorThankYou() {
  const tiersWithSponsors = TIER_ORDER.map((tier) => ({
    tier,
    sponsors: sponsors.filter((sponsor) => sponsor.tier === tier),
  })).filter((group) => group.sponsors.length > 0);

  // Fellowship and Lunch are both single-digit-sponsor tiers — stacking them
  // as two separate full-width sections leaves each looking sparse, so they
  // share one row side by side on desktop instead.
  const fellowshipLunch = tiersWithSponsors.filter(
    (group) => group.tier === "Fellowship" || group.tier === "Lunch",
  );
  const otherGroups = tiersWithSponsors.filter(
    (group) => group.tier !== "Fellowship" && group.tier !== "Lunch",
  );
  const goldAndAbove = otherGroups.filter((group) => group.tier !== "Others");
  const others = otherGroups.find((group) => group.tier === "Others");

  const { ref: heroRef, isAnimating: heroIsAnimating } =
    useReplayOnView<HTMLDivElement>();

  return (
    <div className="bg-slate-50">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_110%_160%_at_0%_35%,var(--color-navy-800)_15%,var(--color-navy-950)_65%,#03060f_100%)] px-6 pb-28 pt-6 sm:px-10 sm:pb-32 sm:pt-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-brand-gold"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>

          <div
            ref={heroRef}
            className="mt-[100px] flex flex-col items-center gap-4 text-center"
          >
            <div
              className={`opacity-0 flex items-center gap-2 text-brand-gold ${heroIsAnimating ? "animate-fade-in-up" : ""}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 1.5l2.9 6.26 6.85.72-5.16 4.68 1.47 6.79L12 16.6l-6.06 3.35 1.47-6.79-5.16-4.68 6.85-.72L12 1.5z" />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-[1.5px]">
                With Gratitude
              </p>
            </div>

            <h1
              className={`opacity-0 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl ${heroIsAnimating ? "animate-fade-in-up" : ""}`}
              style={{ animationDelay: "100ms" }}
            >
              Thank You,{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-gold bg-clip-text text-transparent">
                Sponsors &amp; Partners
              </span>
            </h1>

            <p
              className={`opacity-0 max-w-2xl text-sm text-slate-300 sm:text-base ${heroIsAnimating ? "animate-fade-in-up" : ""}`}
              style={{ animationDelay: "200ms" }}
            >
              The 12th MMRC would not have been possible without the generous
              support of the following organizations.
            </p>
          </div>
        </div>
      </div>

      {/*
        Deliberately NOT nested inside a padded/max-w container: a sticky
        full-bleed bar needs its own box to span the true viewport edge to
        edge. Doing that from inside a padded ancestor requires a negative
        margin to cancel that padding exactly, which is fragile (subpixel
        rounding, scrollbar width) and left a hairline gap where content
        scrolling underneath the bar could show through. Sitting outside any
        padding avoids the cancellation trick entirely.
      */}
      <ScrollSpyNav
        items={tiersWithSponsors.map(({ tier }) => ({
          id: tierAnchor(tier),
          label: tier,
        }))}
        ariaLabel="Sponsor tiers"
        navClassName="sticky top-16 z-10 flex gap-2 overflow-x-auto border-y border-transparent bg-slate-50 px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [border-image:linear-gradient(to_right,transparent,var(--color-slate-300),transparent)_1] [&::-webkit-scrollbar]:hidden sm:px-10 sm:flex-wrap sm:justify-center sm:overflow-visible"
        activeClassName="bg-brand-gold text-navy-950"
      />

      <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <div className="flex flex-col gap-16 pt-16">
          {goldAndAbove.map((group) => (
            <TierSection key={group.tier} {...group} />
          ))}

          {fellowshipLunch.length > 0 && (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
              {fellowshipLunch.map((group) => (
                <TierSection key={group.tier} {...group} />
              ))}
            </div>
          )}

          {others && <TierSection {...others} />}
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden bg-[radial-gradient(ellipse_110%_160%_at_0%_35%,var(--color-navy-800)_15%,var(--color-navy-950)_65%,#03060f_100%)] px-6 py-[60px] sm:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-brand-gold">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 1.5l2.9 6.26 6.85.72-5.16 4.68 1.47 6.79L12 16.6l-6.06 3.35 1.47-6.79-5.16-4.68 6.85-.72L12 1.5z" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-[1.5px]">
              Special Acknowledgment
            </p>
          </div>
          {acknowledgments.map((ack) => {
            const [firstWord, ...restWords] = ack.note.split(" ");
            const restNote = restWords.join(" ");
            return (
              <div key={ack.name} className="flex flex-col gap-1">
                <p className="font-heading text-[22px] font-medium text-white">
                  {ack.name}
                  <span className="text-[#8FA3C7]"> — {firstWord}</span>
                </p>
                <p className="text-base text-[#8FA3C7]">{restNote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
