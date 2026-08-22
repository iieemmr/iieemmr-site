"use client";

type VideoMediaProps = {
  videoUrl: string | null;
  title: string;
  isActive?: boolean;
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

export default function VideoMedia({ videoUrl, title, isActive = false }: VideoMediaProps) {
  const youTubeEmbedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  if (youTubeEmbedUrl) {
    const src = `${youTubeEmbedUrl}?mute=1&playsinline=1${isActive ? "&autoplay=1" : ""}`;
    return (
      <iframe
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
        controls
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
}
