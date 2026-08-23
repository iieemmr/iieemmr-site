import Image from "next/image";

const FACEBOOK_URL = "https://www.facebook.com/IIEEMetroManilaRegion";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="bg-brand-teal px-6 py-14 text-center sm:px-10 sm:py-20">
        <p className="font-heading text-2xl font-extrabold text-navy-950 sm:text-3xl md:text-4xl">
          Stay connected.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-navy-950/80 sm:text-base">
          Follow IIEE Metro Manila Region on Facebook for chapter updates, upcoming events, and
          more from the MMRC community.
        </p>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit IIEE Metro Manila Region on Facebook"
          className="group mx-auto mt-8 block w-full max-w-2xl focus:outline-none sm:mt-10"
        >
          <div className="relative aspect-[1253/674] w-full overflow-hidden rounded-xl shadow-lg transition group-hover:scale-[1.02] group-focus-visible:ring-2 group-focus-visible:ring-navy-950 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-teal">
            <Image
              src="/facebook-page-preview.png"
              alt="IIEE Metro Manila Region Facebook Page — 5K followers"
              fill
              sizes="(min-width: 672px) 672px, 100vw"
              className="object-cover transition group-hover:scale-105"
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-navy-950 underline-offset-4 group-hover:underline">
            View our Facebook Page
          </p>
        </a>
      </div>

      <div className="bg-navy-950 px-6 py-10 text-center sm:px-10">
        <p className="font-heading text-sm font-semibold text-white sm:text-base">
          IIEE Metro Manila Region
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Thank you for being part of the 12th MMRC — Brighter 2026.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          &copy; {year} IIEE Metro Manila Region. All rights reserved.
        </p>
        <a
          href="#"
          className="mt-4 inline-block text-xs font-medium text-brand-teal transition hover:text-brand-gold"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
