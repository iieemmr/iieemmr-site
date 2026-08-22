"use client";

import VideoMedia from "@/components/shared/VideoMedia";

type VideoEmbedProps = {
  videoUrl: string | null;
  title: string;
  caption: string;
};

export default function VideoEmbed({ videoUrl, title, caption }: VideoEmbedProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy-900">
        <VideoMedia videoUrl={videoUrl} title={title} isActive />
      </div>
      <p className="text-sm text-slate-300 sm:text-base">{caption}</p>
    </div>
  );
}
