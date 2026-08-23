"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import VideoEmbed from "@/components/shared/VideoEmbed";
import VideoMedia from "@/components/shared/VideoMedia";
import type { VideoEntry } from "@/data/videos";

type VideoCarouselProps = {
  videos: VideoEntry[];
};

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();

    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  if (videos.length === 0) return null;

  if (videos.length === 1) {
    const [video] = videos;
    return <VideoEmbed videoUrl={video.videoUrl} title={video.title} caption={video.caption} />;
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
  }

  const arrowButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand-gold hover:text-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Video highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
    >
      <div className="relative -mr-6 sm:-mr-10 lg:mr-0">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex [touch-action:pan-y_pinch-zoom]">
            {videos.map((video, index) => (
              <div className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_75%]" key={video.id}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy-900">
                  <VideoMedia
                    videoUrl={video.videoUrl}
                    title={video.title}
                    isActive={index === selectedIndex}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-950 to-transparent sm:w-24"
        />
      </div>

      <p className="text-sm text-slate-300 sm:text-base">{videos[selectedIndex].caption}</p>

      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous video"
            onClick={() => emblaApi?.scrollPrev()}
            className={arrowButtonClass}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next video"
            onClick={() => emblaApi?.scrollNext()}
            className={arrowButtonClass}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {videos.map((video, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={video.id}
                type="button"
                aria-label={`Go to video ${index + 1}: ${video.title}`}
                aria-current={isSelected}
                onClick={() => emblaApi?.scrollTo(index)}
                className="relative flex h-8 w-8 items-center justify-center focus:outline-none"
              >
                <span className="absolute h-3.5 w-3.5 rounded-full border border-white/30" />
                <span
                  className={`absolute h-3.5 w-3.5 rounded-full border-2 border-brand-gold transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing video {selectedIndex + 1} of {videos.length}: {videos[selectedIndex].title}
      </p>
    </div>
  );
}
