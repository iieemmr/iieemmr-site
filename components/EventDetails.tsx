import Image from "next/image";
import {
  openingSpeakers,
  closingChapters,
  hosts,
  exhibitorStat,
} from "@/data/eventDetails";

export default function EventDetails() {
  return (
    <section id="event-details" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
            Event Recap Details
          </h2>
          <div className="inline-flex flex-col items-center rounded-xl bg-slate-50 px-6 py-4">
            <span className="font-heading text-3xl font-extrabold text-brand-blue">
              {exhibitorStat.value}
            </span>
            <span className="text-sm text-slate-600 sm:text-base">
              {exhibitorStat.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Opening Program
          </h3>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {openingSpeakers.map((speaker) => (
              <li
                key={speaker.name}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4"
              >
                {speaker.photoSrc ? (
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                    <Image
                      src={speaker.photoSrc}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label={`${speaker.name} — photo placeholder`}
                    className="flex aspect-[3/4] w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-100 p-2 text-center text-xs font-medium text-slate-500"
                  >
                    Photo placeholder
                  </div>
                )}
                <div>
                  <p className="font-medium text-navy-950">{speaker.name}</p>
                  <p className="text-sm text-slate-600">{speaker.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm italic text-slate-500 sm:text-base">
            All speakers volunteered their time and expertise, with no
            professional fee.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Closing Ceremony — All 6 Chapters
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {closingChapters.map((chapter) => (
              <li
                key={chapter.chapter}
                className="rounded-lg border border-slate-200 px-4 py-3"
              >
                <p className="font-medium text-navy-950">{chapter.chapter}</p>
                <p className="text-sm text-slate-600">{chapter.rep}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Conference Hosts
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {hosts.map((host) => (
              <li
                key={host.name}
                className="rounded-lg border border-slate-200 px-4 py-3"
              >
                <p className="font-medium text-navy-950">{host.name}</p>
                <p className="text-sm text-slate-600">{host.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
