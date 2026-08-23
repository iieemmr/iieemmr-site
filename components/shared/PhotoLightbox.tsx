"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlaceholderBox from "@/components/shared/PlaceholderBox";
import type { GalleryPhoto } from "@/data/gallery";

type PhotoLightboxProps = {
  photos: GalleryPhoto[];
};

const MOBILE_INITIAL_COUNT = 6;
const DESKTOP_INITIAL_COUNT = 8;
const DESKTOP_BREAKPOINT_QUERY = "(min-width: 768px)";

export default function PhotoLightbox({ photos }: PhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const photoRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingFocusIndex = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (expanded && pendingFocusIndex.current !== null) {
      photoRefs.current[pendingFocusIndex.current]?.focus();
      pendingFocusIndex.current = null;
    }
  }, [expanded]);

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
  const visiblePhotos = expanded
    ? photos
    : photos.slice(0, Math.min(DESKTOP_INITIAL_COUNT, photos.length));
  const canToggle = photos.length > MOBILE_INITIAL_COUNT;

  function handleLoadMore() {
    const isDesktop = window.matchMedia(DESKTOP_BREAKPOINT_QUERY).matches;
    pendingFocusIndex.current = isDesktop
      ? DESKTOP_INITIAL_COUNT
      : MOBILE_INITIAL_COUNT;
    setExpanded(true);
  }

  function handleShowLess() {
    setExpanded(false);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    toggleButtonRef.current?.focus();
  }

  return (
    <>
      <div>
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.alt}
              type="button"
              ref={(el) => {
                photoRefs.current[index] = el;
              }}
              onClick={() => setActiveIndex(index)}
              style={
                expanded && index >= MOBILE_INITIAL_COUNT
                  ? { animationDelay: `${(index - MOBILE_INITIAL_COUNT) * 40}ms` }
                  : undefined
              }
              className={`group aspect-square overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                !expanded && index >= MOBILE_INITIAL_COUNT
                  ? "hidden md:block"
                  : expanded && index >= MOBILE_INITIAL_COUNT
                    ? "animate-fade-in-up"
                    : ""
              }`}
            >
              {photo.src ? (
                <div className="relative h-full w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
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

        {canToggle ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              ref={toggleButtonRef}
              onClick={expanded ? handleShowLess : handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full border border-navy-950/20 px-5 py-2 text-sm font-medium text-navy-950 transition hover:border-navy-950 hover:bg-navy-950 hover:text-white"
            >
              {expanded ? "Show less" : "Load more photos"}
            </button>
          </div>
        ) : null}

        <p className="sr-only" aria-live="polite">
          {expanded ? `Showing all ${photos.length} photos` : ""}
        </p>
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
                  sizes="(min-width: 672px) 672px, 100vw"
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
