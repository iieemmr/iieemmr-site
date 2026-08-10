import VideoEmbed from "@/components/shared/VideoEmbed";
import { historyVideo } from "@/data/videos";

export default function MMRHistoryVideo() {
  return (
    <section id={historyVideo.id} className="bg-navy-950 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          IIEE MMR Through The Lens of Time
        </h2>
        <div className="text-left">
          <VideoEmbed
            videoUrl={historyVideo.videoUrl}
            title={historyVideo.title}
            caption={historyVideo.caption}
          />
        </div>
      </div>
    </section>
  );
}
