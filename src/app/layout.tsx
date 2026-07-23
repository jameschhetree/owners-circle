import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteFooter";
import { WaitlistProvider } from "@/components/Waitlist";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const TITLE =
  "Owner's Circle | Podcast, Newsletter & Private Network for Builders";
const DESC =
  "Owner's Circle is a podcast, newsletter, and private network spotlighting business owners, operators, creators, and tech leaders building real companies, real influence, and real rooms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL("https://owners-circle.vercel.app"),
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    siteName: "Owner's Circle",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export const viewport = {
  themeColor: "#7A1F2B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroll />
        <WaitlistProvider>
          <main>{children}</main>
          <SiteFooter />
        </WaitlistProvider>
      </body>
    </html>
  );
}
