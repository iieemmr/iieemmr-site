"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { sponsors, type Tier } from "@/data/sponsors";
import { sponsorGalleryPhotos } from "@/data/sponsorGallery";

const TOP_TIERS: Tier[] = ["Jade", "Ruby", "Diamond"];
const topSponsors = sponsors.filter((sponsor) => TOP_TIERS.includes(sponsor.tier));

export default function SponsorHighlight() {
  // useEmblaCarousel only reads `plugins` on its initial mount, so it's safe
  // to construct the plugin instance inline here rather than in a ref.
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [photoEmblaRef, photoEmblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  useEffect(() => {
    // Ambient auto-scroll is decorative motion, not content — honor
    // reduced-motion by leaving the strips static instead of autoplaying.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    emblaApi?.plugins().autoplay?.stop();
    photoEmblaApi?.plugins().autoplay?.stop();
  }, [emblaApi, photoEmblaApi]);

  if (topSponsors.length === 0) return null;

  return (
    <section id="sponsors" className="bg-navy-950 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {sponsorGalleryPhotos.length > 0 && (
          <div
            className="-mr-6 w-[calc(100%+1.5rem)] overflow-hidden sm:-mr-10 sm:w-[calc(100%+2.5rem)] lg:mr-0 lg:w-full"
            ref={photoEmblaRef}
          >
            <div className="-ml-4 flex">
              {sponsorGalleryPhotos.map((photo) => (
                <div
                  key={photo.src ?? photo.caption}
                  className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_70%] lg:flex-[0_0_45%]"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 85vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-navy-900 text-sm text-slate-400">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Our Top Sponsors
        </h2>

        <div
          className="-mr-6 w-[calc(100%+1.5rem)] overflow-hidden sm:-mr-10 sm:w-[calc(100%+2.5rem)] lg:mr-0 lg:w-full"
          ref={emblaRef}
        >
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
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 45vw"
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
