"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PhotoThumbnailStrip from "@/components/shared/PhotoThumbnailStrip";
import type { GalleryAlbum } from "@/data/gallery";

type PhotoLightboxProps = {
  album: GalleryAlbum;
  onClose: () => void;
};

export default function PhotoLightbox({ album, onClose }: PhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % album.photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + album.photos.length) % album.photos.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [album.photos.length, onClose]);

  const activePhoto = album.photos[activeIndex];
  const label = `${album.title} — photo ${activeIndex + 1} of ${album.photos.length}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close photo"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        onClick={onClose}
      >
        ✕
      </button>

      <div
        className="flex max-h-full w-full max-w-2xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={activePhoto.src}
            alt={label}
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-contain"
          />
        </div>
        <p className="text-center text-sm font-medium text-white sm:text-base">{label}</p>
        <PhotoThumbnailStrip
          photos={album.photos}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}
