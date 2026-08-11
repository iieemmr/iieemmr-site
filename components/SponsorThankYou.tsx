import LogoGrid from "@/components/shared/LogoGrid";
import { sponsors, acknowledgments } from "@/data/sponsors";

export default function SponsorThankYou() {
  return (
    <section id="sponsors" className="bg-slate-50 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
          Thank You, Sponsors &amp; Partners
        </h2>

        <LogoGrid sponsors={sponsors} />

        <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-brand-gold/30 bg-gradient-to-b from-brand-gold/10 via-brand-gold/5 to-transparent px-6 py-8 sm:px-10">
          <div className="flex items-center gap-2 text-brand-gold">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 1.5l2.9 6.26 6.85.72-5.16 4.68 1.47 6.79L12 16.6l-6.06 3.35 1.47-6.79-5.16-4.68 6.85-.72L12 1.5z" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              Special Acknowledgment
            </p>
          </div>
          {acknowledgments.map((ack) => (
            <p key={ack.name} className="text-center text-sm text-slate-600 sm:text-base">
              <span className="font-heading text-lg font-semibold text-navy-950 sm:text-xl">
                {ack.name}
              </span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline">{" — "}</span>
              {ack.note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
