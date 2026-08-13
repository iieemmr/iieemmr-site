"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import VideoEmbed from "@/components/shared/VideoEmbed";
import VideoMedia, { type VideoMediaHandle } from "@/components/shared/VideoMedia";
import VideoControls from "@/components/shared/VideoControls";
import type { VideoEntry } from "@/data/videos";

type VideoCarouselProps = {
  videos: VideoEntry[];
};

// Adapted from Embla Carousel's official "Parallax" example:
// https://www.embla-carousel.com/examples/predefined/#parallax
const TWEEN_FACTOR_BASE = 0.2;

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState<boolean[]>(() =>
    videos.map((_, i) => i === 0),
  );
  const mediaRefs = useRef<(VideoMediaHandle | null)[]>([]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const handlePlayingChange = useCallback((index: number, isPlaying: boolean) => {
    setPlayingStates((prev) => {
      if (prev[index] === isPlaying) return prev;
      const next = [...prev];
      next[index] = isPlaying;
      return next;
    });
  }, []);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map(
      (slideNode) => slideNode.querySelector(".embla__parallax__layer") as HTMLElement,
    );
  }, []);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === "scroll";

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) tweenNode.style.transform = `translateX(${translate}%)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);
    onSelect();

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("reInit", onSelect)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax)
      .on("select", onSelect);

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenParallax)
        .off("reInit", onSelect)
        .off("scroll", tweenParallax)
        .off("slideFocus", tweenParallax)
        .off("select", onSelect);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

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
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex [touch-action:pan-y_pinch-zoom]">
          {videos.map((video, index) => (
            <div className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_75%]" key={video.id}>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy-900">
                <div className="embla__parallax__layer relative flex h-full w-full items-center justify-center">
                  <div className="relative h-full flex-[0_0_115%]">
                    <VideoMedia
                      ref={(handle) => {
                        mediaRefs.current[index] = handle;
                      }}
                      videoUrl={video.videoUrl}
                      title={video.title}
                      isActive={index === selectedIndex}
                      controls={false}
                      onPlayingChange={(isPlaying) => handlePlayingChange(index, isPlaying)}
                    />
                  </div>
                </div>
                {video.videoUrl ? (
                  // Rendered outside .embla__parallax__layer so the buttons stay fixed
                  // in place instead of panning/clipping with the parallax transform.
                  <VideoControls
                    title={video.title}
                    isPlaying={playingStates[index]}
                    onTogglePlay={() => mediaRefs.current[index]?.togglePlay()}
                    onToggleFullscreen={() => mediaRefs.current[index]?.toggleFullscreen()}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
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
