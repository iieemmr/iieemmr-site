import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageAlt =
  "Delegates and officers of the 12th Metro Manila Regional Conference celebrating together";
export const ogImageSize = { width: 1200, height: 630 };

const TAGLINE = "Thank you, IIEE Brighter 2026.";
const DATE_LINE = "01–04 JULY 2026 · MERALCO, ORTIGAS, METRO MANILA";
const BRAND_LABEL = "IIEE Metro Manila Region";

const [heroImageData, logoImageData, poppinsExtrabold, poppinsSemibold, interMedium] =
  await Promise.all([
    readFile(join(process.cwd(), "public/photos/hero.jpg")),
    readFile(join(process.cwd(), "public/brand/iiee-logo.png")),
    readFile(join(process.cwd(), "public/fonts/Poppins-ExtraBold.ttf")),
    readFile(join(process.cwd(), "public/fonts/Poppins-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/fonts/Inter-Medium.ttf")),
  ]);
const heroImageSrc = `data:image/jpeg;base64,${heroImageData.toString("base64")}`;
const logoImageSrc = `data:image/png;base64,${logoImageData.toString("base64")}`;

export const ogImageFonts = [
  { name: "Poppins", data: poppinsExtrabold, style: "normal" as const, weight: 800 as const },
  { name: "Poppins", data: poppinsSemibold, style: "normal" as const, weight: 600 as const },
  { name: "Inter", data: interMedium, style: "normal" as const, weight: 500 as const },
];

export function ogImageJsx() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#050b1f",
      }}
    >
      <img
        src={heroImageSrc}
        alt=""
        width={ogImageSize.width}
        height={ogImageSize.height}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "62% center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(118deg, #050b1f 0%, #0b1533 50%, #101d40 100%)",
          opacity: 0.9,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 44,
          left: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={logoImageSrc} alt="" width={40} height={40} style={{ marginRight: 12 }} />
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 22,
            color: "#ffffff",
          }}
        >
          {BRAND_LABEL}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 90px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.15,
          }}
        >
          <span
            style={{
              display: "flex",
              marginRight: 16,
              backgroundImage: "linear-gradient(90deg, #1e5fd9, #1fbaa6, #f5c518)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            12th
          </span>
          <span style={{ display: "flex", color: "#ffffff" }}>Metro Manila</span>
        </div>
        <span
          style={{
            display: "flex",
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.15,
            color: "#ffffff",
          }}
        >
          Regional Conference
        </span>
        <span
          style={{
            display: "flex",
            marginTop: 30,
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 30,
            color: "#f5c518",
          }}
        >
          {TAGLINE}
        </span>
        <span
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 21,
            letterSpacing: 3,
            color: "#1fbaa6",
          }}
        >
          {DATE_LINE}
        </span>
      </div>
    </div>
  );
}
