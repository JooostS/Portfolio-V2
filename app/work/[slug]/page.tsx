import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "../../../components/Contact";
import Header from "../../../components/Header";
import { formatList, formatMonth, getProjects } from "../../../lib/github";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  return project ? { title: `${project.title} by Joost Schreuders`, description: project.summary } : {};
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <div className="stage" data-tone-section="hero">
      <Header />
      <main className="wrap case">
        <Link href="/#work" className="back">All work</Link>
        <h1 className="case-title">{project.title}</h1>
        <p className="lede">{project.summary}</p>

        <div className="actions">
          {project.liveUrl && (
            <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveLabel}
            </a>
          )}
          <a className="btn quiet" href={project.repoUrl} target="_blank" rel="noreferrer">
            View the code
          </a>
        </div>

        {project.image && (
          <Image
            className="shot"
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            sizes="(max-width: 1240px) 100vw, 1240px"
            priority
          />
        )}

        <dl className="facts">
          <div>
            <dt>Type</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{formatList(project.stack)}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{formatMonth(project.updated)}</dd>
          </div>
        </dl>

        {project.features.length > 0 && (
          <section className="case-section">
            <h2 className="section-title">What it does</h2>
            <ul className="features">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {project.embed && project.liveUrl && (
          <section className="case-section">
            <h2 className="section-title">Try it</h2>
            <iframe
              className="embed"
              src={project.liveUrl}
              title={`${project.title}, running live`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </section>
        )}

        <nav className="next" aria-label="Next project">
          <span>Next project</span>
          <Link href={`/work/${next.slug}`}>{next.title}</Link>
        </nav>
      </main>
      </div>
      <Contact />
    </>
  );
}
