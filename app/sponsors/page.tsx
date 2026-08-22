import type { Metadata } from "next";
import SponsorThankYou from "@/components/SponsorThankYou";

export const metadata: Metadata = {
  title: "Sponsors & Partners | 12th MMRC Recap",
  description:
    "Thank you to the sponsors and partners of the 12th IIEE Metro Manila Regional Conference (Brighter 2026), from Jade tier down to our Others-tier supporters.",
};

export default function SponsorsPage() {
  return (
    <main id="main-content">
      <SponsorThankYou />
    </main>
  );
}
