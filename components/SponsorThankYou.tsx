import LogoGrid from "@/components/shared/LogoGrid";
import { sponsors, acknowledgments } from "@/data/sponsors";

export default function SponsorThankYou() {
  return (
    <section className="bg-slate-50 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
          Thank You, Sponsors &amp; Partners
        </h2>

        <LogoGrid sponsors={sponsors} />

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-8">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
            Special Acknowledgment
          </p>
          {acknowledgments.map((ack) => (
            <p key={ack.name} className="text-sm text-slate-600 sm:text-base">
              <span className="font-medium text-navy-950">{ack.name}</span>
              {" — "}
              {ack.note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
