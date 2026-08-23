import Image from "next/image";
import type { ReactElement } from "react";
import ScrollSpyNav from "@/components/shared/ScrollSpyNav";
import {
  keynoteSpeakers,
  day1Speakers,
  day2Speakers,
  day2Note,
  day3Speakers,
  day4Speakers,
  wenSpeakers,
  day1Theme,
  day2Theme,
  day3Theme,
  day4Theme,
  hosts,
  atAGlanceStats,
  type EventPerson,
  type GlanceStatIcon,
} from "@/data/eventDetails";

const glanceIcons: Record<GlanceStatIcon, ReactElement> = {
  mic: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
    />
  ),
  storefront: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72"
    />
  ),
  certificate: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    />
  ),
};

function GlanceIcon({ icon }: { icon: GlanceStatIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className="h-6 w-6 text-brand-gold"
    >
      {glanceIcons[icon]}
    </svg>
  );
}

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
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 25vw, 96px"
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
        {person.role && (
          <p className="text-sm text-slate-600">{person.role}</p>
        )}
        {person.topic && (
          <p className="mt-1 text-sm font-medium text-brand-blue">
            {person.topic}
          </p>
        )}
      </div>
    </li>
  );
}

export default function EventDetails() {
  return (
    <section id="event-details" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
          At a Glance
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_110%_160%_at_0%_35%,var(--color-navy-800)_15%,var(--color-navy-950)_65%,#03060f_100%)] p-10 sm:p-12">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        />
        <div className="grid grid-cols-1 divide-y divide-brand-gold/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {atAGlanceStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-3 py-6 first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <GlanceIcon icon={stat.icon} />
              <span className="font-heading text-4xl font-semibold tracking-tight text-brand-gold">
                {stat.value}
              </span>
              <span className="text-[15px] font-semibold text-white">
                {stat.label}
              </span>
              <p className="text-[13.5px] leading-relaxed text-slate-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
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

      <div>
        <ScrollSpyNav
          items={[
            { id: "day-1", label: "Day 1" },
            { id: "day-2", label: "Day 2" },
            { id: "day-3", label: "Day 3" },
            { id: "day-4", label: "Day 4" },
          ]}
          ariaLabel="Speaker days"
          navClassName="sticky top-16 z-10 mx-auto mt-14 flex max-w-6xl justify-center gap-2 overflow-x-auto border-y border-transparent bg-white px-1 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [border-image:linear-gradient(to_right,transparent,var(--color-slate-300),transparent)_1] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
          activeClassName="bg-brand-gold text-navy-950"
        />

        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-14">
          <div id="day-1" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
              Day 1 — {day1Theme}
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {day1Speakers.map((speaker) => (
                <PersonCard key={speaker.name} person={speaker} />
              ))}
            </ul>
          </div>

          <div id="day-2" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
              Day 2 — {day2Theme}
            </h3>
            <p className="text-sm italic text-slate-500 sm:text-base">
              {day2Note}
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {day2Speakers.map((speaker) => (
                <PersonCard key={speaker.name} person={speaker} />
              ))}
            </ul>
          </div>

          <div id="day-3" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
              Day 3 — {day3Theme}
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {day3Speakers.map((speaker) => (
                <PersonCard key={speaker.name} person={speaker} />
              ))}
            </ul>
          </div>

          <div id="day-4" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
              Day 4 — {day4Theme}
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {day4Speakers.map((speaker) => (
                <PersonCard key={speaker.name} person={speaker} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold text-navy-950 sm:text-2xl">
            Day 4 — Women Engineering Network
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {wenSpeakers.map((speaker) => (
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
