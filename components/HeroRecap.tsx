export default function HeroRecap() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-navy-950 px-6 py-24 text-center sm:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-gold opacity-20 blur-3xl"
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-gold bg-clip-text text-transparent">
            12th
          </span>{" "}
          Metro Manila Regional Conference
        </h1>

        <p className="font-heading text-xl font-semibold text-brand-gold sm:text-2xl">
          Thank you, IIEE Brighter 2026.
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          Four unforgettable days of learning, innovation, fellowship, and
          service — Metro Manila Region says thank you to every delegate,
          chapter, and partner who made the 12th MMRC one for the books.
        </p>

        <p className="text-sm font-medium uppercase tracking-widest text-brand-teal sm:text-base">
          01–04 July 2026 · MERALCO, Ortigas, Metro Manila
        </p>

        <a
          href="#video-highlights"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-base font-semibold text-navy-950 transition hover:bg-white sm:w-auto"
        >
          Watch Highlights
        </a>
      </div>
    </section>
  );
}
