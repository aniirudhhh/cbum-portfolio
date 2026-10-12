"use client";

import { useEffect, useRef, useState } from "react";

const names = [
  { text: "シヴァム", lang: "ja", label: "日本語" },
  { text: "Shivam", lang: "fr", label: "Français" },
  { text: "Shivam", lang: "de", label: "Deutsch" },
  { text: "शिवम", lang: "hi", label: "हिन्दी" },
];

export function NavbarWordmark() {
  const [languageIndex, setLanguageIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const chooseLanguage = () => setLanguageIndex(previous => {
    const offset = 1 + Math.floor(Math.random() * (names.length - 1));
    return (previous + offset) % names.length;
  });
  const name = names[languageIndex];
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const reveal = (event: Event) => {
      const element = ref.current;
      if (!element) return;
      const { x, y, radius } = (event as CustomEvent<{ x: number; y: number; radius: number }>).detail;
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--reveal-x", `${x - bounds.left}px`);
      element.style.setProperty("--reveal-y", `${y - bounds.top}px`);
      element.style.setProperty("--reveal-radius", `${radius}px`);
    };
    window.addEventListener("wordmark-cursor", reveal);
    return () => window.removeEventListener("wordmark-cursor", reveal);
  }, []);
  return (
    <a ref={ref} href="#hero" aria-label="Shivam — home"
      onPointerEnter={() => { chooseLanguage(); setIsRevealing(true); }}
      onPointerLeave={() => setIsRevealing(false)}
      onFocus={() => { chooseLanguage(); setIsRevealing(true); }}
      onBlur={() => setIsRevealing(false)}
      data-cursor-reveal className="navbar-wordmark relative inline-grid items-center justify-items-center font-bold text-lg tracking-tight py-2 shrink-0 w-24 whitespace-nowrap">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-display">SHIVAM</span>
      <span aria-hidden="true" lang="en" className="wordmark-base font-display absolute inset-0 flex items-center justify-center pointer-events-none">SHIVAM</span>
      {isRevealing && <>
      <span aria-hidden="true" lang={name.lang} className="wordmark-reveal absolute inset-0 flex items-center justify-center"
        style={{ fontFamily: name.lang === "hi" ? "var(--font-wordmark-hindi)" : name.lang === "ja" ? "var(--font-sans)" : "var(--font-display)", fontStyle: name.lang === "fr" ? "italic" : "normal", letterSpacing: name.lang === "de" ? "0.04em" : "normal" }}>{name.text}</span>
      <span aria-hidden="true" lang={name.lang} className="wordmark-language absolute top-full left-1/2 -translate-x-1/2 text-[9px] leading-none font-sans font-medium tracking-normal whitespace-nowrap text-foreground/60">{name.label}</span>
      </>}
    </a>
  );
}
