"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

type PhotoThumbnailStripProps = {
  photos: GalleryPhoto[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function PhotoThumbnailStrip({
  photos,
  activeIndex,
  onSelect,
}: PhotoThumbnailStripProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });

  useEffect(() => {
    emblaApi?.scrollTo(activeIndex);
  }, [emblaApi, activeIndex]);

  if (photos.length <= 1) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2 [touch-action:pan-y_pinch-zoom]">
          {photos.map((photo, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={`Go to photo ${index + 1}`}
                aria-current={isSelected}
                onClick={() => onSelect(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md transition focus:outline-none ${
                  isSelected ? "ring-2 ring-brand-gold" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={photo.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            );
          })}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-navy-950 to-transparent"
      />
    </div>
  );
}
