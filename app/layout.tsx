import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const SITE_TITLE = "12th MMRC Recap | IIEE Metro Manila Region";
const SITE_DESCRIPTION =
  "A recap of the 12th IIEE Metro Manila Regional Conference (Brighter 2026) — highlights, speakers, sponsors, and photos from four days of learning, innovation, fellowship, and service.";

export const metadata: Metadata = {
  metadataBase: new URL("https://iieemmr-site.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "IIEE Metro Manila Region",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Delegates and officers of the 12th Metro Manila Regional Conference celebrating together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050b1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-gold focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          Skip to content
        </a>
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
