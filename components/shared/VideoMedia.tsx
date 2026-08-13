"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type VideoMediaHandle = {
  togglePlay: () => void;
  toggleFullscreen: () => void;
};

type VideoMediaProps = {
  videoUrl: string | null;
  title: string;
  isActive?: boolean;
  /** Native browser controls. Turn off when the media renders inside a
   *  panning/oversized layer (e.g. the parallax carousel), since native
   *  controls live inside the element and would get clipped by the pan. */
  controls?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
};

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

const VideoMedia = forwardRef<VideoMediaHandle, VideoMediaProps>(function VideoMedia(
  { videoUrl, title, isActive = false, controls = true, onPlayingChange },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframePlayingRef = useRef(false);
  const youTubeEmbedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      if (isActive) videoEl.play().catch(() => {});
      else videoEl.pause();
    }
    iframePlayingRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !onPlayingChange) return;
    const handlePlay = () => onPlayingChange(true);
    const handlePause = () => onPlayingChange(false);
    videoEl.addEventListener("play", handlePlay);
    videoEl.addEventListener("pause", handlePause);
    return () => {
      videoEl.removeEventListener("play", handlePlay);
      videoEl.removeEventListener("pause", handlePause);
    };
  }, [onPlayingChange]);

  useImperativeHandle(ref, () => ({
    togglePlay: () => {
      const videoEl = videoRef.current;
      if (videoEl) {
        if (videoEl.paused) videoEl.play().catch(() => {});
        else videoEl.pause();
        return;
      }
      const iframeEl = iframeRef.current;
      if (iframeEl?.contentWindow) {
        const nextPlaying = !iframePlayingRef.current;
        iframeEl.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: nextPlaying ? "playVideo" : "pauseVideo",
            args: [],
          }),
          "*",
        );
        iframePlayingRef.current = nextPlaying;
        onPlayingChange?.(nextPlaying);
      }
    },
    toggleFullscreen: () => {
      const el = videoRef.current ?? iframeRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        el.requestFullscreen().catch(() => {});
      }
    },
  }));

  if (youTubeEmbedUrl) {
    const src = `${youTubeEmbedUrl}?enablejsapi=1&mute=1&playsinline=1${
      controls ? "" : "&controls=0"
    }${isActive ? "&autoplay=1" : ""}`;
    return (
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  if (videoUrl) {
    return (
      <video
        ref={videoRef}
        controls={controls}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "metadata"}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoUrl}
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-800 px-6 text-center">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/90"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-navy-950">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <p className="font-heading text-sm font-semibold text-white sm:text-base">{title}</p>
      <p className="text-xs text-slate-300 sm:text-sm">Video coming soon</p>
    </div>
  );
});

export default VideoMedia;
