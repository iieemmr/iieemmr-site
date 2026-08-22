import LogoGrid, { type LogoGridSize } from "@/components/shared/LogoGrid";
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
          {tierSponsors.length}{" "}
          {tierSponsors.length === 1 ? "sponsor" : "sponsors"}
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

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
            Thank You, Sponsors &amp; Partners
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            The 12th MMRC would not have been possible without the generous
            support of the following organizations.
          </p>
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
      <nav
        aria-label="Sponsor tiers"
        className="sticky top-16 z-10 mt-16 flex gap-2 overflow-x-auto border-y border-transparent bg-slate-50 px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [border-image:linear-gradient(to_right,transparent,var(--color-slate-300),transparent)_1] [&::-webkit-scrollbar]:hidden sm:px-10 sm:flex-wrap sm:justify-center sm:overflow-visible"
      >
        {tiersWithSponsors.map(({ tier }) => (
          <a
            key={tier}
            href={`#${tierAnchor(tier)}`}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:bg-navy-950 hover:text-white sm:text-sm"
          >
            {tier}
          </a>
        ))}
      </nav>

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

          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl border border-brand-gold/30 bg-gradient-to-b from-brand-gold/10 via-brand-gold/5 to-transparent px-6 py-8 sm:px-10">
            <div className="flex items-center gap-2 text-brand-gold">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 1.5l2.9 6.26 6.85.72-5.16 4.68 1.47 6.79L12 16.6l-6.06 3.35 1.47-6.79-5.16-4.68 6.85-.72L12 1.5z" />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                Special Acknowledgment
              </p>
            </div>
            {acknowledgments.map((ack) => (
              <p
                key={ack.name}
                className="text-center text-sm text-slate-600 sm:text-base"
              >
                <span className="font-heading text-lg font-semibold text-navy-950 sm:text-xl">
                  {ack.name}
                </span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline">{" — "}</span>
                {ack.note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
