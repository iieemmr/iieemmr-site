export type VideoEntry = {
  id: string;
  title: string;
  caption: string;
  videoUrl: string | null;
};

export const highlightReels: VideoEntry[] = [
  {
    id: "highlight-recap",
    title: "12th MMRC Highlights",
    caption:
      "To put the cherry on top. The 12th MMRC shares you the video highlights of the conference.",
    videoUrl: "https://www.youtube.com/watch?v=fvRf54-CG-M",
  },
  {
    id: "highlight-performance",
    title: "IIEE Performance",
    caption:
      "A performance segment from the 12th Metro Manila Regional Conference.",
    videoUrl: "https://www.youtube.com/watch?v=IyVuQSpK-QQ",
  },
  {
    id: "highlight-golf",
    title: "Golf Tournament",
    caption:
      "A look back at the 12th MMRC's golf tournament.",
    videoUrl: "https://www.youtube.com/watch?v=ahZkV_MZ5cs",
  },
  {
    id: "highlight-invitation",
    title: "You're Invited",
    caption: "The official invitation to the 12th Metro Manila Regional Conference.",
    videoUrl: "https://www.youtube.com/watch?v=oKTvSWw1fSw",
  },
];

export const historyVideo: VideoEntry = {
  id: "mmr-history",
  title: "IIEE MMR Through The Lens of Time",
  caption:
    "Take a 5-minute break and learn about the history of the IIEE Metro Manila Region.",
  videoUrl: "https://www.youtube.com/watch?v=_X0Pk4zDlAo",
};
