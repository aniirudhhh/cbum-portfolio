"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeToggle } from "@/components/ThemeToggle";
import { openCommandPalette } from "@/components/CommandPalette";

const links = [
  { href: "#projects", label: "Our work", detail: "Case studies" },
  { href: "#about", label: "About me", detail: "The human behind it" },
  { href: "#experience", label: "Experience", detail: "Lessons in execution" },
  { href: "#toolkit", label: "Toolkit", detail: "Tools & methods" },
  { href: "#contact", label: "Let’s talk", detail: "Start a conversation" },
];

export function KineticNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const pending = useRef<(() => void) | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [shape, setShape] = useState(0);
  const lenis = useLenis();

  useEffect(() => () => { timeline.current?.kill(); if (dialog.current?.open) lenis?.start(); }, [lenis]);

  function show() {
    if (!dialog.current || open) return;
    pending.current = undefined;
    closing.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timeline.current?.kill();
    gsap.registerPlugin(CustomEase);
    CustomEase.create("kineticMain", "0.65, 0.01, 0.05, 0.99");
    const layers = dialog.current.querySelectorAll(".kinetic-layer");
    const items = dialog.current.querySelectorAll(".kinetic-link");
    const fadeTargets = dialog.current.querySelectorAll("[data-menu-fade]");
    const scrim = dialog.current.querySelector(".kinetic-scrim");
    // Reset while hidden, before native dialog autofocus can scroll the panel.
    const stack = dialog.current.querySelector(".kinetic-panel-stack");
    const panel = dialog.current.querySelector<HTMLElement>(".kinetic-panel");
    const icon = dialog.current.querySelector(".kinetic-close-icon");
    gsap.set(stack, { xPercent: 0 });
    gsap.set(layers, { xPercent: 101 });
    gsap.set(items, { x: 0, y: 0, yPercent: 140, rotate: 10, opacity: 1 });
    gsap.set(fadeTargets, { autoAlpha: 0, y: 0, yPercent: 50 });
    gsap.set(scrim, { autoAlpha: 0 });
    gsap.set(icon, { rotate: 0 });
    if (panel) panel.scrollTop = 0;
    dialog.current.showModal();
    dialog.current.querySelector<HTMLButtonElement>(".kinetic-close")?.focus({ preventScroll: true });
    if (panel) panel.scrollTop = 0;
    lenis?.stop();
    setOpen(true);
    timeline.current = gsap.timeline({ defaults: { ease: "kineticMain", duration: reduce ? 0 : 0.7 } })
      .to(scrim, { autoAlpha: 1 }, 0)
      .to(layers, { xPercent: 0, duration: reduce ? 0 : 0.575, stagger: reduce ? 0 : 0.12 }, 0)
      .to(items, { yPercent: 0, rotate: 0, stagger: reduce ? 0 : 0.05 }, reduce ? 0 : 0.35)
      .to(fadeTargets, { autoAlpha: 1, yPercent: 0, stagger: reduce ? 0 : 0.04 }, reduce ? 0 : 0.55)
      .to(icon, { rotate: 315 }, 0);

  }

  function close(after?: () => void) {
    if (!dialog.current?.open || closing.current) return;
    closing.current = true;
    pending.current = after;
    timeline.current?.kill();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timeline.current = gsap.timeline({ defaults: { duration: reduce ? 0 : 0.7, ease: "kineticMain" }, onComplete: () => dialog.current?.close() })
      .to(dialog.current.querySelector(".kinetic-scrim"), { autoAlpha: 0 }, 0)
      .to(dialog.current.querySelector(".kinetic-panel-stack"), { xPercent: 120 }, 0)
      .to(dialog.current.querySelector(".kinetic-close-icon"), { rotate: 0 }, 0);

  }

  return <>
    <button ref={trigger} type="button" onClick={show} aria-label="Open menu" aria-expanded={open} aria-controls="kinetic-navigation"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold bg-background/70 hover:bg-card-soft">
      Menu <Plus size={18} aria-hidden="true" />
    </button>
    <dialog ref={dialog} id="kinetic-navigation" aria-label="Navigation menu" className="kinetic-dialog" data-lenis-prevent
      onCancel={event => { event.preventDefault(); close(); }}
      onClose={() => {
        setOpen(false); closing.current = false; lenis?.start();
        trigger.current?.focus({ preventScroll: true });
        const next = pending.current; pending.current = undefined;
        if (next) requestAnimationFrame(next);
      }}>
      <CustomCursor inDialog />
      <button className="kinetic-scrim" aria-label="Close navigation backdrop" tabIndex={-1} onClick={() => close()} />
      <div className="kinetic-panel-stack">
        <div className="kinetic-layer kinetic-layer-one" aria-hidden="true" />
        <div className="kinetic-layer kinetic-layer-two" aria-hidden="true" />
        <div className="kinetic-layer kinetic-layer-three" aria-hidden="true" />
        <div className="kinetic-panel" data-lenis-prevent>
          <div className={`kinetic-shape kinetic-shape-${shape}`} aria-hidden="true"><i /><i /><i /></div>
          <div data-menu-fade className="relative z-10 flex items-center justify-between gap-4 mb-8">
            <span className="font-display text-sm font-bold tracking-widest">SHIVAM</span>
            <button autoFocus type="button" onClick={() => close()} className="kinetic-close min-h-11 flex items-center gap-2 text-sm">Close <Plus className="kinetic-close-icon" size={20} /></button>
          </div>
          <nav aria-label="Portfolio sections" className="relative z-10 flex-1 flex flex-col justify-center">
            {links.map((link, index) => <div key={link.href} className="overflow-hidden">
              <a href={link.href} className="kinetic-link" onMouseEnter={() => setShape(index)} onFocus={() => setShape(index)}
                onClick={event => { event.preventDefault(); close(() => {
                  if (lenis) lenis.scrollTo(link.href, { offset: -80, duration: 1.1 });
                  else document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }); }}>
                <span className="kinetic-number">0{index + 1}</span><span>{link.label}</span><ArrowUpRight className="kinetic-arrow" size={28} />
                <span className="sr-only">{link.detail}</span>
              </a>
            </div>)}
          </nav>
          <div data-menu-fade className="relative z-10 mt-8 pt-5 border-t border-border flex items-center justify-between gap-4">
            <button type="button" className="min-h-11 flex items-center gap-2 text-sm" onClick={() => close(openCommandPalette)}><Search size={16} /> Commands & search</button>
            <ThemeToggle side="top" />
          </div>
          <p data-menu-fade className="relative z-10 mt-3 text-xs text-muted">Product · Growth · Analytics</p>
        </div>
      </div>
    </dialog>
  </>;
}

export { KineticNavigation as Component };
