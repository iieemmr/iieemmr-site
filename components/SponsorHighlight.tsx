"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { sponsors, type Tier } from "@/data/sponsors";

const TOP_TIERS: Tier[] = ["Jade", "Ruby", "Diamond"];
const topSponsors = sponsors.filter((sponsor) => TOP_TIERS.includes(sponsor.tier));

export default function SponsorHighlight() {
  // useEmblaCarousel only reads `plugins` on its initial mount, so it's safe
  // to construct the plugin instance inline here rather than in a ref.
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  useEffect(() => {
    if (!emblaApi) return;
    // Ambient auto-scroll is decorative motion, not content — honor
    // reduced-motion by leaving the strip static instead of autoplaying.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      emblaApi.plugins().autoplay?.stop();
    }
  }, [emblaApi]);

  if (topSponsors.length === 0) return null;

  return (
    <section id="sponsors" className="bg-navy-950 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Our Top Sponsors
        </h2>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {topSponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="min-w-0 flex-[0_0_45%] pl-4 sm:flex-[0_0_28%] lg:flex-[0_0_18%]"
              >
                <div className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-md sm:h-28">
                  <div className="relative h-full w-full">
                    <Image
                      src={sponsor.logoSrc}
                      alt={sponsor.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/sponsors"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 text-base font-semibold text-navy-950 transition hover:bg-white"
        >
          View All Sponsors &amp; Partners
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
