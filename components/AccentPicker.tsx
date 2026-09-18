"use client";

import { useEffect, useState } from "react";

const ACCENTS = [
  { name: "Mint", value: "#71ffc5" },
  { name: "Lilac", value: "#c7b8ff" },
  { name: "Sky", value: "#8fd6ff" },
  { name: "Butter", value: "#ffe37a" },
  { name: "Peach", value: "#ffb896" }
];

function apply(index: number) {
  document.documentElement.style.setProperty("--mint", ACCENTS[index].value);
}

export default function AccentPicker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("accent"));
      if (saved > 0 && saved < ACCENTS.length) {
        setActive(saved);
        apply(saved);
      }
    } catch {}
  }, []);

  function pick(index: number) {
    setActive(index);
    apply(index);
    try {
      localStorage.setItem("accent", String(index));
    } catch {}
  }

  return (
    <div className="swatches" role="group" aria-label="Accent colour">
      <span>Accent</span>
      {ACCENTS.map((a, i) => (
        <button
          key={a.name}
          type="button"
          className="swatch"
          style={{ "--c": a.value } as React.CSSProperties}
          aria-label={a.name}
          aria-pressed={active === i}
          onClick={() => pick(i)}
        />
      ))}
    </div>
  );
}
