import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import BackToTop from "../components/BackToTop";
import ToneShift from "../components/ToneShift";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"]
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  style: ["normal", "italic"]
});

const description =
  "Joost Schreuders is a student software developer from Zuid-Holland who builds small web apps, desktop tools and the occasional game.";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#08110e" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jooosts.nl"),
  title: "Joost Schreuders, developer",
  description,
  openGraph: { title: "Joost Schreuders, developer", description, siteName: "Joost Schreuders" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="progress" aria-hidden="true" />
        <ToneShift />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
