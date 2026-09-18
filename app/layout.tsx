import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans"
});

const title = "Joost Schreuders, student software developer";
const description =
  "Joost Schreuders is a student software developer from Zuid-Holland who builds small web apps, desktop tools and the occasional game.";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jooosts.nl"),
  title,
  description,
  openGraph: { title, description, siteName: "Joost Schreuders" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
