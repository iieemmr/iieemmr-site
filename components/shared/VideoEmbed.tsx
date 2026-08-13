"use client";

import { useRef, useState } from "react";
import VideoMedia, { type VideoMediaHandle } from "@/components/shared/VideoMedia";
import VideoControls from "@/components/shared/VideoControls";

type VideoEmbedProps = {
  videoUrl: string | null;
  title: string;
  caption: string;
};

export default function VideoEmbed({ videoUrl, title, caption }: VideoEmbedProps) {
  const mediaRef = useRef<VideoMediaHandle>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy-900">
        <VideoMedia
          ref={mediaRef}
          videoUrl={videoUrl}
          title={title}
          isActive
          controls={false}
          onPlayingChange={setIsPlaying}
        />
        {videoUrl ? (
          <VideoControls
            title={title}
            isPlaying={isPlaying}
            onTogglePlay={() => mediaRef.current?.togglePlay()}
            onToggleFullscreen={() => mediaRef.current?.toggleFullscreen()}
          />
        ) : null}
      </div>
      <p className="text-sm text-slate-300 sm:text-base">{caption}</p>
    </div>
  );
}
