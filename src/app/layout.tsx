import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteDescription =
  "Stop guessing your clothing size. Build your personal Fit Passport and discover better-fitting clothes across brands.";

export const metadata: Metadata = {
  title: {
    default: "FitPassport — Your size. Across every brand.",
    template: "%s · FitPassport",
  },
  description: siteDescription,
  applicationName: "FitPassport",
  openGraph: {
    type: "website",
    siteName: "FitPassport",
    title: "FitPassport — Your size. Across every brand.",
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f6f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
