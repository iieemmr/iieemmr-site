import VideoCarousel from "@/components/shared/VideoCarousel";
import { highlightReels } from "@/data/videos";

export default function VideoHighlight() {
  return (
    <section
      id="video-highlights"
      className="bg-[radial-gradient(ellipse_80%_100%_at_100%_0%,var(--color-navy-800)_0%,var(--color-navy-950)_100%)] px-6 py-20 sm:px-10"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Video Highlights
        </h2>
        <div className="text-left">
          <VideoCarousel videos={highlightReels} />
        </div>
      </div>
    </section>
  );
}
