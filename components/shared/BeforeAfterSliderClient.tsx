"use client";

import dynamic from "next/dynamic";

const BeforeAfterSlider = dynamic(
  () => import("@/components/shared/BeforeAfterSlider"),
  { ssr: false },
);

export default BeforeAfterSlider;
