import { ogImage } from "../lib/og";

export const alt = "Joost Schreuders, developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Small apps, useful tools and the occasional game.", "Student software developer");
}
