"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PlaceholderBox from "@/components/shared/PlaceholderBox";
import type { GalleryPhoto } from "@/data/gallery";

type PhotoLightboxProps = {
  photos: GalleryPhoto[];
};

export default function PhotoLightbox({ photos }: PhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.alt}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group aspect-square overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {photo.src ? (
              <div className="relative h-full w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
            ) : (
              <PlaceholderBox
                label={photo.alt}
                className="h-full w-full transition group-hover:border-brand-blue group-hover:text-brand-blue"
              />
            )}
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActiveIndex(null)}
          >
            ✕
          </button>

          <div
            className="flex max-h-full w-full max-w-2xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            {activePhoto.src ? (
              <div className="relative aspect-square w-full">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <PlaceholderBox label={activePhoto.alt} className="aspect-square w-full" />
            )}
            <p className="text-center text-sm font-medium text-white sm:text-base">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
