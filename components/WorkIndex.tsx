"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../lib/github";

export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="index">
      <ul className="index-list">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="index-row"
              data-active={i === active || undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {p.image && (
                <Image
                  className="index-thumb"
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt=""
                  sizes="(max-width: 900px) 100vw, 1px"
                  loading="lazy"
                />
              )}
              <span className="index-title">{p.title}</span>
              <span className="index-kind">{p.kind}</span>
              <span className="index-year">{new Date(p.updated).getFullYear()}</span>
              <span className="index-summary">{p.summary}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="index-preview"
        aria-hidden="true"
        style={{ "--tint": projects[active].tint } as React.CSSProperties}
      >
        <div className="frame">
          {projects.map((p, i) => (
            <div className="slide" key={p.slug} data-active={i === active || undefined}>
              {p.image ? (
                <Image
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt=""
                  sizes="(max-width: 1240px) 45vw, 560px"
                />
              ) : (
                <div className="poster">
                  <span>{p.kind}</span>
                  <strong>{p.title}</strong>
                  <ul>
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="caption">{projects[active].summary}</p>
      </div>
    </div>
  );
}
