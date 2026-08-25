"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { GalleryAlbum } from "@/data/gallery";

type AlbumCardProps = {
  album: GalleryAlbum;
  onOpen: () => void;
  cardRef: (el: HTMLButtonElement | null) => void;
  style?: CSSProperties;
  className: string;
};

const MAX_CYCLE_PHOTOS = 6;
const HOVER_START_DELAY_MS = 300;
const CYCLE_INTERVAL_MS = 1400;
const FADE_DURATION_MS = 700;

export default function AlbumCard({ album, onOpen, cardRef, style, className }: AlbumCardProps) {
  const cyclePhotos = album.photos.slice(0, MAX_CYCLE_PHOTOS);

  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // The previous photo, kept mounted underneath (fully opaque) until the
  // current one finishes fading in on top — guarantees there's never a
  // blank frame while the next photo loads.
  const [backdropSrc, setBackdropSrc] = useState<string | null>(null);
  const [currentLoaded, setCurrentLoaded] = useState(true);

  const startTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropBackdropTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSrc = cyclePhotos[activeIndex].src;

  function clearTimers() {
    if (startTimeout.current) clearTimeout(startTimeout.current);
    if (intervalId.current) clearInterval(intervalId.current);
    if (dropBackdropTimeout.current) clearTimeout(dropBackdropTimeout.current);
    startTimeout.current = null;
    intervalId.current = null;
    dropBackdropTimeout.current = null;
  }

  function advance() {
    setActiveIndex((current) => {
      setBackdropSrc(cyclePhotos[current].src);
      setCurrentLoaded(false);
      return (current + 1) % cyclePhotos.length;
    });
  }

  function handleMouseEnter() {
    setIsHovering(true);
    if (cyclePhotos.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    startTimeout.current = setTimeout(() => {
      intervalId.current = setInterval(advance, CYCLE_INTERVAL_MS);
    }, HOVER_START_DELAY_MS);
  }

  function handleMouseLeave() {
    clearTimers();
    setIsHovering(false);
    setActiveIndex(0);
    setBackdropSrc(null);
    setCurrentLoaded(true);
  }

  useEffect(() => clearTimers, []);

  // Once the current photo has actually decoded, hold the crossfade for
  // FADE_DURATION_MS (matching the CSS transition below), then drop the
  // backdrop — it's no longer needed once the new photo is fully opaque.
  useEffect(() => {
    if (!currentLoaded || !backdropSrc) return;
    dropBackdropTimeout.current = setTimeout(() => setBackdropSrc(null), FADE_DURATION_MS);
    return () => {
      if (dropBackdropTimeout.current) clearTimeout(dropBackdropTimeout.current);
    };
  }, [currentLoaded, backdropSrc]);

  const zoomClass = isHovering ? "animate-card-zoom" : "";

  return (
    <button
      type="button"
      ref={cardRef}
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {backdropSrc ? (
        <Image
          key={backdropSrc}
          src={backdropSrc}
          alt=""
          fill
          sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={`object-cover ${zoomClass}`}
        />
      ) : null}
      <Image
        key={currentSrc}
        src={currentSrc}
        alt={album.title}
        fill
        sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        onLoad={() => {
          // Cached/instant loads can resolve before the browser paints the
          // opacity-0 starting frame, which skips the CSS transition
          // entirely and makes the photo pop in instead of fading. The
          // double rAF guarantees a frame is painted first.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setCurrentLoaded(true));
          });
        }}
        className={`object-cover ${zoomClass} ${
          backdropSrc ? `transition-opacity duration-700 ease-out ${currentLoaded ? "opacity-100" : "opacity-0"}` : ""
        }`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/95 via-navy-950/40 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <p className="text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          {album.title}
        </p>
        <p className="text-xs text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          {album.photos.length} photos
        </p>
      </div>
    </button>
  );
}
