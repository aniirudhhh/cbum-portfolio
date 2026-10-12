"use client";

import { Noto_Sans_Devanagari } from "next/font/google";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: "300",
  display: "swap",
});

const greetings = [
  { text: "Hey there!", lang: "en" },
  { text: "नमस्ते!", lang: "hi" },
  { text: "ನಮಸ್ಕಾರ!", lang: "kn" },
  { text: "¡Hola!", lang: "es" },
  { text: "Bonjour!", lang: "fr" },
  { text: "こんにちは!", lang: "ja" },
];

export function MultilingualGreeting({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!active || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % greetings.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion]);

  const greeting = greetings[index];
  return (
    <span className="relative inline-flex h-[1.35em] w-[9ch] max-w-[calc(100vw-2rem)] items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={greeting.lang} lang={greeting.lang}
          className={`absolute inset-0 flex items-center justify-center whitespace-nowrap ${greeting.lang === "hi" ? devanagari.className : ""}`}
          style={{ letterSpacing: greeting.lang === "hi" ? "normal" : undefined, fontSize: greeting.lang === "ja" ? "0.7em" : "1em", fontStyle: ["hi", "kn", "ja"].includes(greeting.lang) ? "normal" : "inherit" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" }}>
          {greeting.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
