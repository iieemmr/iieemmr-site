import Image from "next/image";
import {
  keynoteSpeakers,
  day1Speakers,
  day2Speakers,
  day3Speakers,
  day4Speakers,
  hosts,
  exhibitorStat,
  type EventPerson,
} from "@/data/eventDetails";

function PersonCard({ person }: { person: EventPerson }) {
  return (
    <li
      key={person.name}
      className="flex flex-row items-center gap-4 rounded-lg border border-slate-200 p-3 sm:flex-col sm:items-stretch sm:gap-3 sm:p-4"
    >
      {person.photoSrc ? (
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md sm:aspect-[3/4] sm:w-full">
          <Image
            src={person.photoSrc}
            alt={person.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`${person.name} — photo placeholder`}
          className="flex aspect-square w-24 shrink-0 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-100 p-2 text-center text-xs font-medium leading-tight text-slate-500 sm:aspect-[3/4] sm:w-full"
        >
          Photo placeholder
        </div>
      )}
      <div>
        <p className="font-medium text-navy-950">{person.name}</p>
        <p className="text-sm text-slate-600">{person.role}</p>
      </div>
    </li>
  );
}

export default function EventDetails() {
  return (
    <section id="event-details" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:text-left">
        <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
          Event Recap Details
        </h2>
        <p className="flex items-center gap-2 text-center sm:text-right">
          <span className="font-heading text-4xl font-extrabold text-brand-blue sm:text-5xl">
            {exhibitorStat.value}
          </span>
          <span className="text-sm text-slate-600 sm:text-base">
            {exhibitorStat.label}
          </span>
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-4">
        <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
          Keynote Speakers
        </h3>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
          {keynoteSpeakers.map((speaker) => (
            <PersonCard key={speaker.name} person={speaker} />
          ))}
        </ul>
        <p className="text-sm italic text-slate-500 sm:text-base">
          All speakers volunteered their time and expertise, with no
          professional fee.
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Day 1
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {day1Speakers.map((speaker) => (
              <PersonCard key={speaker.name} person={speaker} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Day 2
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {day2Speakers.map((speaker) => (
              <PersonCard key={speaker.name} person={speaker} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Day 3
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {day3Speakers.map((speaker) => (
              <PersonCard key={speaker.name} person={speaker} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Day 4
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {day4Speakers.map((speaker) => (
              <PersonCard key={speaker.name} person={speaker} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Conference Hosts
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {hosts.map((host) => (
              <PersonCard key={host.name} person={host} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
