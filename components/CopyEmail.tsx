"use client";

import { useState } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      return document.execCommand("copy");
    } finally {
      field.remove();
    }
  }
}

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    setState((await copyText(email)) ? "copied" : "failed");
    setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button type="button" className="btn quiet small copy" onClick={copy}>
      {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
      <span className="sr" role="status">
        {state === "copied" ? "Email address copied" : ""}
      </span>
    </button>
  );
}
