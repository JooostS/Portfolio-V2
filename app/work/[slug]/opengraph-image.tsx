import { getProjects } from "../../../lib/github";
import { ogImage } from "../../../lib/og";

export const alt = "A project by Joost Schreuders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  return ogImage(project?.title ?? "Project", project?.kind ?? "");
}
