import BeforeAfterSlider from "@/components/shared/BeforeAfterSliderClient";
import { beforeAfterPair } from "@/data/beforeAfter";

export default function BeforeAfterHighlight() {
  return (
    <section id="before-after" className="bg-navy-950 px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Presenting the 12th MMRC
        </h2>
        <BeforeAfterSlider pair={beforeAfterPair} />
      </div>
    </section>
  );
}
