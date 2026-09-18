"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ToneShift() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    delete root.dataset.tone;
    const sections = document.querySelectorAll<HTMLElement>("[data-tone-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) root.dataset.tone = (entry.target as HTMLElement).dataset.toneSection;
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
