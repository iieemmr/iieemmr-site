"use client";

import { useEffect, useRef, useState } from "react";
import AlbumCard from "@/components/shared/AlbumCard";
import PhotoLightbox from "@/components/shared/PhotoLightbox";
import type { GalleryAlbum } from "@/data/gallery";

type AlbumGridProps = {
  albums: GalleryAlbum[];
};

const MOBILE_INITIAL_COUNT = 6;
const DESKTOP_INITIAL_COUNT = 8;
const DESKTOP_BREAKPOINT_QUERY = "(min-width: 768px)";
const COLLAPSE_DURATION_MS = 300;

export default function AlbumGrid({ albums }: AlbumGridProps) {
  const [openAlbumIndex, setOpenAlbumIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const albumRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingFocusIndex = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const collapseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (expanded && pendingFocusIndex.current !== null) {
      albumRefs.current[pendingFocusIndex.current]?.focus();
      pendingFocusIndex.current = null;
    }
  }, [expanded]);

  useEffect(() => {
    return () => {
      if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    };
  }, []);

  const visibleAlbums =
    expanded || isCollapsing
      ? albums
      : albums.slice(0, Math.min(DESKTOP_INITIAL_COUNT, albums.length));
  const canToggle = albums.length > MOBILE_INITIAL_COUNT;
  const openAlbum = openAlbumIndex !== null ? albums[openAlbumIndex] : null;

  function handleLoadMore() {
    const isDesktop = window.matchMedia(DESKTOP_BREAKPOINT_QUERY).matches;
    pendingFocusIndex.current = isDesktop ? DESKTOP_INITIAL_COUNT : MOBILE_INITIAL_COUNT;
    setExpanded(true);
  }

  function handleShowLess() {
    setIsCollapsing(true);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    toggleButtonRef.current?.focus();
    collapseTimeout.current = setTimeout(() => {
      setExpanded(false);
      setIsCollapsing(false);
    }, COLLAPSE_DURATION_MS);
  }

  return (
    <>
      <div>
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {visibleAlbums.map((album, index) => (
            <AlbumCard
              key={album.slug}
              album={album}
              onOpen={() => setOpenAlbumIndex(index)}
              cardRef={(el) => {
                albumRefs.current[index] = el;
              }}
              style={
                isCollapsing && index >= DESKTOP_INITIAL_COUNT
                  ? undefined
                  : expanded && index >= MOBILE_INITIAL_COUNT
                    ? { animationDelay: `${(index - MOBILE_INITIAL_COUNT) * 40}ms` }
                    : undefined
              }
              className={`group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                isCollapsing && index >= DESKTOP_INITIAL_COUNT
                  ? "animate-fade-out-down pointer-events-none"
                  : !expanded && !isCollapsing && index >= MOBILE_INITIAL_COUNT
                    ? "hidden md:block"
                    : expanded && index >= MOBILE_INITIAL_COUNT
                      ? "animate-fade-in-up"
                      : ""
              }`}
            />
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
          {expanded ? `Showing all ${albums.length} albums` : ""}
        </p>
      </div>

      {openAlbum ? (
        <PhotoLightbox
          album={openAlbum}
          onClose={() => {
            const closedIndex = openAlbumIndex;
            setOpenAlbumIndex(null);
            albumRefs.current[closedIndex ?? -1]?.focus();
          }}
        />
      ) : null}
    </>
  );
}
