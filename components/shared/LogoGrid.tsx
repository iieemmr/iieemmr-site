import Image from "next/image";
import type { Sponsor } from "@/data/sponsors";

export type LogoGridSize = "xlarge" | "large" | "large-3col" | "medium" | "small";

const SIZE_STYLES: Record<
  LogoGridSize,
  { grid: string; card: string; logo: string; name: string; solo: string; sizes: string }
> = {
  // One size up from "large" — for a single top-billed sponsor (e.g. a venue
  // sponsor) that should visually outrank the tier grids below it.
  xlarge: {
    grid: "grid-cols-1 gap-8",
    card: "gap-5 rounded-2xl border border-slate-200 bg-white p-10 shadow-md",
    logo: "h-40 sm:h-52",
    name: "text-xl font-semibold sm:text-2xl",
    solo: "w-full max-w-md sm:max-w-lg",
    sizes: "(min-width: 640px) 400px, 90vw",
  },
  large: {
    grid: "grid-cols-1 gap-8 sm:grid-cols-2",
    card: "gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-md",
    logo: "h-32 sm:h-40",
    name: "text-lg font-semibold sm:text-xl",
    solo: "w-full max-w-sm sm:max-w-md",
    sizes: "(min-width: 640px) 300px, 80vw",
  },
  // Same card treatment as "large", just allowed a third column on wide
  // screens for tiers with enough sponsors to fill it.
  "large-3col": {
    grid: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
    card: "gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-md",
    logo: "h-32 sm:h-40",
    name: "text-lg font-semibold sm:text-xl",
    solo: "w-full max-w-sm sm:max-w-md",
    sizes: "(min-width: 640px) 300px, 80vw",
  },
  medium: {
    grid: "grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]",
    card: "gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
    logo: "h-20 sm:h-24",
    name: "text-sm font-medium",
    solo: "w-full max-w-[270px]",
    sizes: "(min-width: 640px) 220px, 45vw",
  },
  small: {
    grid: "grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
    card: "gap-2 rounded-lg border border-slate-200 bg-white p-2",
    logo: "h-12 sm:h-14",
    name: "text-xs font-medium",
    solo: "w-full max-w-[150px]",
    sizes: "(min-width: 1024px) 150px, (min-width: 640px) 20vw, 33vw",
  },
};

// Below their `sm` breakpoint, "large"/"large-3col"/"xlarge" grids collapse
// to a single column with no width cap, so cards stretch edge-to-edge —
// unlike the width-capped `solo` treatment single-sponsor tiers get. Cap
// them to the same mobile width so both look consistent, then release the
// cap once the grid actually has multiple columns to fill.
const GRID_ITEM_WIDTH: Partial<Record<LogoGridSize, string>> = {
  xlarge: "mx-auto w-full max-w-md sm:max-w-none",
  large: "mx-auto w-full max-w-sm sm:max-w-none",
  "large-3col": "mx-auto w-full max-w-sm sm:max-w-none",
};

type LogoGridProps = {
  sponsors: Sponsor[];
  size?: LogoGridSize;
};

type CardStyles = (typeof SIZE_STYLES)[LogoGridSize];

function SponsorCard({
  sponsor,
  styles,
  className = "",
}: {
  sponsor: Sponsor;
  styles: CardStyles;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${styles.card} ${className}`}
    >
      <div className={`relative w-full ${styles.logo}`}>
        <Image
          src={sponsor.logoSrc}
          alt={sponsor.alt}
          fill
          sizes={styles.sizes}
          className="object-contain"
        />
      </div>
      <p className={`text-slate-700 ${styles.name}`}>
        {sponsor.name}
        {sponsor.subCategory ? (
          <span className="block text-xs font-normal text-slate-400">
            {sponsor.subCategory}
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default function LogoGrid({ sponsors, size = "medium" }: LogoGridProps) {
  const styles = SIZE_STYLES[size];

  // A lone sponsor in a grid leaves the rest of the row empty and reads as a
  // layout bug — center it in a width-constrained wrapper instead of letting
  // it sit alone in a grid track.
  if (sponsors.length === 1) {
    return (
      <div className="flex justify-center">
        <SponsorCard sponsor={sponsors[0]} styles={styles} className={styles.solo} />
      </div>
    );
  }

  return (
    <div className={`grid ${styles.grid}`}>
      {sponsors.map((sponsor) => (
        <SponsorCard
          key={sponsor.name}
          sponsor={sponsor}
          styles={styles}
          className={GRID_ITEM_WIDTH[size] ?? ""}
        />
      ))}
    </div>
  );
}
