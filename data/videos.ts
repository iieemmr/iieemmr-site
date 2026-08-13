export type VideoEntry = {
  id: string;
  title: string;
  caption: string;
  videoUrl: string | null;
};

export const highlightReels: VideoEntry[] = [
  {
    id: "highlight-opening",
    title: "Opening Ceremony Highlights",
    caption:
      "To put the cherry on top. The 12th MMRC shares you the video highlights of the conference.",
    // Local sample placeholder — swap for the real opening ceremony video.
    videoUrl: "/videos/highlight-opening.mp4",
  },
  {
    id: "highlight-sessions",
    title: "Keynote & Technical Sessions",
    caption:
      "Relive the talks and technical sessions that made this year's conference one to remember.",
    // Local sample placeholder — swap for the real sessions video.
    videoUrl: "/videos/highlight-sessions.mp4",
  },
  {
    id: "highlight-awards",
    title: "Awards Night & Closing",
    caption:
      "A look back at the awards night and closing program of the 12th MMRC.",
    // Local sample placeholder — swap for the real awards night video.
    videoUrl: "/videos/highlight-awards.mp4",
  },
];

export const historyVideo: VideoEntry = {
  id: "mmr-history",
  title: "IIEE MMR Through The Lens of Time",
  caption:
    "Take a 5-minute break and learn about the history of the IIEE Metro Manila Region.",
  // YouTube sample placeholder — swap for the real history video.
  videoUrl: "https://www.youtube.com/watch?v=Y-rmzh0PI3c",
};
