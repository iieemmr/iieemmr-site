"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderCssVars,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import PlaceholderBox from "@/components/shared/PlaceholderBox";
import type { BeforeAfterPair } from "@/data/beforeAfter";

type BeforeAfterSliderProps = {
  pair: BeforeAfterPair;
};

export default function BeforeAfterSlider({ pair }: BeforeAfterSliderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-navy-800 bg-navy-900">
        <ReactCompareSlider
          style={{ height: "100%", width: "100%" }}
          aria-label="Drag to compare the before and after photos"
          itemOne={
            pair.beforeSrc ? (
              <div className="relative h-full w-full">
                <Image
                  src={pair.beforeSrc}
                  alt={pair.beforeAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <PlaceholderBox label={pair.beforeCaption} className="h-full w-full" />
            )
          }
          itemTwo={
            pair.afterSrc ? (
              <div className="relative h-full w-full">
                <Image
                  src={pair.afterSrc}
                  alt={pair.afterAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <PlaceholderBox label={pair.afterCaption} className="h-full w-full" />
            )
          }
          handle={
            <ReactCompareSliderHandle
              style={
                { [ReactCompareSliderCssVars.handleColor]: "#050b1f" } as CSSProperties
              }
              buttonStyle={{
                backgroundColor: "#f5c518",
                color: "#050b1f",
                border: "2px solid #f5c518",
              }}
              linesStyle={{ outline: "1px solid #f5c518" }}
            />
          }
        />
      </div>
      <div className="flex justify-between text-sm font-medium text-slate-300">
        <span>{pair.beforeCaption}</span>
        <span>{pair.afterCaption}</span>
      </div>
    </div>
  );
}
