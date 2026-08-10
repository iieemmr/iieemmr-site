export type OpeningSpeaker = {
  name: string;
  role: string;
};

export const openingSpeakers: OpeningSpeaker[] = [
  { name: "Engr. Danica D. Mendoza", role: "IIEE Mission/Vision" },
  { name: "Engr. Botany KC S. Briones", role: "Delegates acknowledgment" },
  {
    name: "Engr. Juan Paolo M. Tolentino",
    role: "Official Opening Declaration",
  },
  { name: "Hon. Mario C. Marasagan", role: "Guest of Honor message" },
  { name: "Hon. Adelino V. Garcia Jr.", role: "PRBEE Roadmap" },
  { name: "Engr. Froilan J. Savet", role: "Keynote message" },
];

export type ChapterRep = {
  chapter: string;
  rep: string;
};

export const closingChapters: ChapterRep[] = [
  { chapter: "MMR Central", rep: "Engr. Bottany KC Briones" },
  { chapter: "MMR North", rep: "Engr. Maine Macalipay" },
  { chapter: "MMR South", rep: "Engr. Jeffrey Santos" },
  { chapter: "MMR East", rep: "Engr. Jimmuel Villaoz" },
  { chapter: "MMR West", rep: "Engr. Julie Yu" },
  { chapter: "MMR Singapore", rep: "Engr. Jenalyn Dizon" },
];

export type Host = {
  name: string;
  role: string;
};

export const hosts: Host[] = [
  { name: "Mr. Arkel Mendoza", role: "GMA Host" },
  { name: "Engr. Paula Badong-Florendo", role: "MSC" },
  { name: "Engr. Emman Allada", role: "MCC" },
];

export const exhibitorStat = {
  value: "40+",
  label: "exhibitors at the Exhibition Hall — exceeding target",
};
