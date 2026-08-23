import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Delegates and officers of the 12th Metro Manila Regional Conference celebrating together";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE_LINE = "Metro Manila Regional Conference";
const TAGLINE = "Thank you, IIEE Brighter 2026.";
const DATE_LINE = "01–04 JULY 2026 · MERALCO, ORTIGAS, METRO MANILA";
const BRAND_LABEL = "IIEE Metro Manila Region";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const params = new URLSearchParams({ family: `${family}:wght@${weight}`, text });
  const css = await fetch(`https://fonts.googleapis.com/css2?${params}`).then((res) =>
    res.text()
  );
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error(`Could not resolve font file for ${family} ${weight}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

const [heroImageData, logoImageData] = await Promise.all([
  readFile(join(process.cwd(), "public/photos/hero.jpg")),
  readFile(join(process.cwd(), "public/brand/iiee-logo.png")),
]);
const heroImageSrc = `data:image/jpeg;base64,${heroImageData.toString("base64")}`;
const logoImageSrc = `data:image/png;base64,${logoImageData.toString("base64")}`;

const [poppinsExtrabold, poppinsSemibold, interMedium] = await Promise.all([
  loadGoogleFont("Poppins", 800, `12th ${TITLE_LINE}`),
  loadGoogleFont("Poppins", 600, `${TAGLINE}${BRAND_LABEL}`),
  loadGoogleFont("Inter", 500, DATE_LINE),
]);

export default async function Image() {
  return new ImageResponse(
    (
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
          width={size.width}
          height={size.height}
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
            display: "flex",
            backgroundColor: "rgba(5,11,31,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 90,
            height: 460,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(5,11,31,0) 0%, rgba(5,11,31,0.85) 20%, rgba(5,11,31,0.85) 80%, rgba(5,11,31,0) 100%)",
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
          <span
            style={{
              display: "flex",
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 36,
              color: "#f5c518",
              letterSpacing: 1,
            }}
          >
            12th
          </span>
          <span
            style={{
              display: "flex",
              marginTop: 8,
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 48,
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            {TITLE_LINE}
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
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsExtrabold, style: "normal", weight: 800 },
        { name: "Poppins", data: poppinsSemibold, style: "normal", weight: 600 },
        { name: "Inter", data: interMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
