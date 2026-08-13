type VideoControlsProps = {
  title: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToggleFullscreen: () => void;
};

const buttonClass =
  "flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/70 text-white backdrop-blur transition hover:bg-navy-950/90 hover:text-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";

export default function VideoControls({
  title,
  isPlaying,
  onTogglePlay,
  onToggleFullscreen,
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
      <button
        type="button"
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        onClick={onTogglePlay}
        className={buttonClass}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button
        type="button"
        aria-label={`Fullscreen ${title}`}
        onClick={onToggleFullscreen}
        className={buttonClass}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 8V4h4" />
          <path d="M16 4h4v4" />
          <path d="M20 16v4h-4" />
          <path d="M8 20H4v-4" />
        </svg>
      </button>
    </div>
  );
}
