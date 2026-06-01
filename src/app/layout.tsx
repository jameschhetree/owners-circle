import type { Metadata } from "next";
import { Inter_Tight, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteFooter";
import { WaitlistProvider } from "@/components/Waitlist";

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
});

const TITLE =
  "Owner's Circle | Podcast, Newsletter & Private Network for DMV Builders";
const DESC =
  "Owner's Circle is a DMV-first podcast, newsletter, and private network spotlighting business owners, operators, creators, and tech leaders building real companies, real influence, and real rooms.";

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
  themeColor: "#5a1410",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
