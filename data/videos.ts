export type VideoEntry = {
  id: string;
  title: string;
  caption: string;
  videoUrl: string | null;
};

export const highlightReel: VideoEntry = {
  id: "video-highlights",
  title: "Video Highlights of the Conference",
  caption:
    "To put the cherry on top. The 12th MMRC shares you the video highlights of the conference.",
  videoUrl: null,
};

export const historyVideo: VideoEntry = {
  id: "mmr-history",
  title: "IIEE MMR Through The Lens of Time",
  caption:
    "Take a 5-minute break and learn about the history of the IIEE Metro Manila Region.",
  videoUrl: null,
};
