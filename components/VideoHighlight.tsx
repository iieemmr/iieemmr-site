import VideoEmbed from "@/components/shared/VideoEmbed";
import { highlightReel } from "@/data/videos";

export default function VideoHighlight() {
  return (
    <section
      id={highlightReel.id}
      className="bg-navy-950 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Video Highlights
        </h2>
        <div className="text-left">
          <VideoEmbed
            videoUrl={highlightReel.videoUrl}
            title={highlightReel.title}
            caption={highlightReel.caption}
          />
        </div>
      </div>
    </section>
  );
}
