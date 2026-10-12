"use client";

import { useEffect, useRef, useState } from "react";

const messages = {
  projects: ["Plot twist: these cards come with actual execution.", "Less ‘big idea’. More ‘here’s what happened’."],
  experience: ["Work experience. With a side of character development.", "These roles came with homework. And invoices."],
  toolkit: ["Tools collected. Thinking still required.", "A good toolkit. Sadly, no ‘solve everything’ button."],
  contact: ["I’d shake your hand, but… polygons.", "The human handles emails. I handle the cheekbones."],
} as const;
const storageKey = "astra-scroll-messages";

export function useAstraScrollMessage(blocked: boolean) {
  const [message, setMessage] = useState("");
  const activity = useRef({ lastScroll: Date.now(), hasScrolled: false });
  const visit = useRef({ seen: [] as string[], count: 0, lastShown: 0 });
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (saved && Array.isArray(saved.seen) && typeof saved.count === "number" && typeof saved.lastShown === "number") visit.current = saved;
    } catch { /* Storage is optional. */ }
  }, []);

  useEffect(() => {
    setMessage("");
    if (blocked) return;
    activity.current.lastScroll = Date.now();
    let previousY = window.scrollY;
    let shownAt = 0;
    let shownSection = "";
    const modalOpen = () => !!document.querySelector('[role="dialog"][aria-modal="true"], dialog[open]');
    const activeSection = () => Object.keys(messages).find(id => {
      const bounds = document.getElementById(id)?.getBoundingClientRect();
      const line = window.innerHeight * 0.4;
      return bounds && bounds.top <= line && bounds.bottom > line;
    });
    const dismiss = () => { setMessage(""); shownAt = 0; shownSection = ""; };
    const onScroll = () => {
      if (Math.abs(window.scrollY - previousY) < 1) return;
      previousY = window.scrollY;
      activity.current.lastScroll = Date.now();
      activity.current.hasScrolled = true;
      dismiss();
    };
    const observer = new MutationObserver(() => { if (modalOpen()) dismiss(); });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open", "aria-modal"] });
    const timer = window.setInterval(() => {
      const now = Date.now();
      if (document.hidden || modalOpen()) { dismiss(); return; }
      const section = activeSection();
      if (shownAt) {
        if (now - shownAt >= 5000 || section !== shownSection) dismiss();
        return;
      }
      const state = visit.current;
      if (!activity.current.hasScrolled || now - activity.current.lastScroll < 2000 || !section || state.seen.includes(section) || state.count >= 3 || now - state.lastShown < 45000) return;
      const lines = messages[section as keyof typeof messages];
      setMessage(lines[Math.floor(Math.random() * lines.length)]);
      shownAt = now;
      shownSection = section;
      state.seen.push(section);
      state.count++;
      state.lastShown = now;
      try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Storage is optional. */ }
    }, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.clearInterval(timer); window.removeEventListener("scroll", onScroll); };
  }, [blocked]);
  return blocked ? "" : message;
}

