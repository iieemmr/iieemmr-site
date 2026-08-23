export type BeforeAfterPair = {
  beforeSrc: string | null;
  beforeAlt: string;
  beforeCaption: string;
  afterSrc: string | null;
  afterAlt: string;
  afterCaption: string;
};

export const beforeAfterPair: BeforeAfterPair = {
  beforeSrc: "/photos/slide-picture/after.jpg",
  beforeAlt: "IIEE Metro Manila event, now",
  beforeCaption: "What you see",
  afterSrc: "/photos/slide-picture/before.jpg",
  afterAlt: "IIEE Metro Manila event, then",
  afterCaption: "What we see",
};
