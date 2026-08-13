export type EventPerson = {
  name: string;
  role: string;
  photoSrc: string | null;
};

export const keynoteSpeakers: EventPerson[] = [
  {
    name: "Engr. Ferdinand O. Geluz",
    role: "SVP and Head, Meralco",
    photoSrc: null,
  },
  { name: "Speaker 2", role: "Keynote Speaker", photoSrc: null },
  { name: "Speaker 3", role: "Keynote Speaker", photoSrc: null },
  { name: "Speaker 4", role: "Keynote Speaker", photoSrc: null },
];

export const day1Speakers: EventPerson[] = [
  { name: "Speaker 1", role: "TBA", photoSrc: null },
  { name: "Speaker 2", role: "TBA", photoSrc: null },
  { name: "Speaker 3", role: "TBA", photoSrc: null },
  { name: "Speaker 4", role: "TBA", photoSrc: null },
  { name: "Speaker 5", role: "TBA", photoSrc: null },
  { name: "Speaker 6", role: "TBA", photoSrc: null },
];

export const day2Speakers: EventPerson[] = [
  { name: "Speaker 1", role: "TBA", photoSrc: null },
  { name: "Speaker 2", role: "TBA", photoSrc: null },
  { name: "Speaker 3", role: "TBA", photoSrc: null },
  { name: "Speaker 4", role: "TBA", photoSrc: null },
  { name: "Speaker 5", role: "TBA", photoSrc: null },
  { name: "Speaker 6", role: "TBA", photoSrc: null },
];

export const day3Speakers: EventPerson[] = [
  { name: "Speaker 1", role: "TBA", photoSrc: null },
  { name: "Speaker 2", role: "TBA", photoSrc: null },
  { name: "Speaker 3", role: "TBA", photoSrc: null },
  { name: "Speaker 4", role: "TBA", photoSrc: null },
  { name: "Speaker 5", role: "TBA", photoSrc: null },
  { name: "Speaker 6", role: "TBA", photoSrc: null },
];

export const day4Speakers: EventPerson[] = [
  { name: "Speaker 1", role: "TBA", photoSrc: null },
  { name: "Speaker 2", role: "TBA", photoSrc: null },
  { name: "Speaker 3", role: "TBA", photoSrc: null },
  { name: "Speaker 4", role: "TBA", photoSrc: null },
  { name: "Speaker 5", role: "TBA", photoSrc: null },
  { name: "Speaker 6", role: "TBA", photoSrc: null },
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
