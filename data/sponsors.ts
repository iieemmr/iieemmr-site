export type Sponsor = {
  name: string;
  logoSrc: string | null;
  alt: string;
  note?: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "MERALCO",
    logoSrc: null,
    alt: "MERALCO logo",
    note: "Venue host & CSR donation recipient via One Meralco Foundation",
  },
  {
    name: "SPECS",
    logoSrc: null,
    alt: "SPECS — Society of Philippine Electrotechnical Constructors and Suppliers, Inc. logo",
    note: "Signed MOA with IIEE",
  },
  {
    name: "PHILFLEX",
    logoSrc: null,
    alt: "PHILFLEX logo",
    note: "Golf tournament sponsor",
  },
  {
    name: "HYPEL",
    logoSrc: null,
    alt: "HYPEL logo",
    note: "Golf tournament sponsor",
  },
  {
    name: "Phelps Dodge",
    logoSrc: null,
    alt: "Phelps Dodge logo",
    note: "Golf tournament sponsor",
  },
];

export type Acknowledgment = {
  name: string;
  alt: string;
  note: string;
};

export const acknowledgments: Acknowledgment[] = [
  {
    name: "Cavite State University – Bacoor Campus",
    alt: "Cavite State University – Bacoor Campus logo",
    note: "Makatikas Exhibition Drill Team — performed the opening ceremony",
  },
];
