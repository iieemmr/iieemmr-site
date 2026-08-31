"use client";

import { useInView } from "@/components/shared/useInView";

type VideoMediaProps = {
  videoUrl: string | null;
  title: string;
  isActive?: boolean;
  // When provided, overrides this component's own in-view detection — lets a
  // parent (e.g. a carousel) gate all its slides on one shared visibility check.
  shouldLoad?: boolean;
};

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoMedia({ videoUrl, title, isActive = false, shouldLoad }: VideoMediaProps) {
  const { ref, isInView: ownIsInView } = useInView<HTMLDivElement>();
  const isInView = shouldLoad ?? ownIsInView;
  const youTubeVideoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  if (youTubeVideoId) {
    const src = `https://www.youtube.com/embed/${youTubeVideoId}?mute=1&playsinline=1${isActive ? "&autoplay=1" : ""}`;
    return (
      <div ref={ref} className="absolute inset-0 h-full w-full">
        {isInView ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not an optimizable local/remote asset
          <img
            src={`https://img.youtube.com/vi/${youTubeVideoId}/hqdefault.jpg`}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div ref={ref} className="absolute inset-0 h-full w-full">
        {isInView && (
          <video
            controls
            muted
            loop
            playsInline
            preload={isActive ? "auto" : "metadata"}
            className="h-full w-full object-cover"
            src={videoUrl}
          >
            <track kind="captions" />
          </video>
        )}
      </div>
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
      <p className="text-sm text-slate-300 sm:text-base">Video coming soon</p>
    </div>
  );
}
