export type OpeningSpeaker = {
  name: string;
  role: string;
  photoSrc: string | null;
};

export const openingSpeakers: OpeningSpeaker[] = [
  {
    name: "Engr. Danica D. Mendoza",
    role: "IIEE Mission/Vision",
    photoSrc: null,
  },
  {
    name: "Engr. Botany KC S. Briones",
    role: "Delegates acknowledgment",
    photoSrc: null,
  },
  {
    name: "Engr. Juan Paolo M. Tolentino",
    role: "Official Opening Declaration",
    photoSrc: null,
  },
  {
    name: "Hon. Mario C. Marasagan",
    role: "Guest of Honor message",
    photoSrc: null,
  },
  {
    name: "Hon. Adelino V. Garcia Jr.",
    role: "PRBEE Roadmap",
    photoSrc: null,
  },
  {
    name: "Engr. Froilan J. Savet",
    role: "Keynote message",
    photoSrc: null,
  },
];

export type ChapterRep = {
  chapter: string;
  rep: string;
  photoSrc: string | null;
};

export const closingChapters: ChapterRep[] = [
  { chapter: "MMR Central", rep: "Engr. Bottany KC Briones", photoSrc: null },
  { chapter: "MMR North", rep: "Engr. Maine Macalipay", photoSrc: null },
  { chapter: "MMR South", rep: "Engr. Jeffrey Santos", photoSrc: null },
  { chapter: "MMR East", rep: "Engr. Jimmuel Villaoz", photoSrc: null },
  { chapter: "MMR West", rep: "Engr. Julie Yu", photoSrc: null },
  { chapter: "MMR Singapore", rep: "Engr. Jenalyn Dizon", photoSrc: null },
];

export type Host = {
  name: string;
  role: string;
  photoSrc: string | null;
};

export const hosts: Host[] = [
  { name: "Mr. Arkel Mendoza", role: "GMA Host", photoSrc: null },
  { name: "Engr. Paula Badong-Florendo", role: "MSC", photoSrc: null },
  { name: "Engr. Emman Allada", role: "MCC", photoSrc: null },
];

export const exhibitorStat = {
  value: "40+",
  label: "exhibitors at the Exhibition Hall — exceeding target",
};
