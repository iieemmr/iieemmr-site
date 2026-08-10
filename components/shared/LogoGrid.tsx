import Image from "next/image";
import PlaceholderBox from "@/components/shared/PlaceholderBox";
import type { Sponsor } from "@/data/sponsors";

type LogoGridProps = {
  sponsors: Sponsor[];
};

export default function LogoGrid({ sponsors }: LogoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {sponsors.map((sponsor) => (
        <div key={sponsor.name} className="flex flex-col items-center gap-2">
          {sponsor.logoSrc ? (
            <div className="relative h-20 w-full">
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <PlaceholderBox label={sponsor.alt} className="h-20 w-full" />
          )}
          <p className="text-center text-xs font-medium text-slate-600 sm:text-sm">
            {sponsor.name}
            {sponsor.note ? (
              <span className="block text-[11px] font-normal text-slate-400">
                {sponsor.note}
              </span>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}
