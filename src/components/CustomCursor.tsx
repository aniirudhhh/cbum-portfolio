"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor({ inDialog = false }: { inDialog?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
      const scaleXTo = gsap.quickTo(cursor, "scaleX", { duration: 0.25, ease: "power3.out" });
      const scaleYTo = gsap.quickTo(cursor, "scaleY", { duration: 0.25, ease: "power3.out" });
      let revealing = false;
      const syncReveal = () => {
        if (!revealing) return;
        const bounds = cursor.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent("wordmark-cursor", { detail: {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
          radius: bounds.width / 2,
        } }));
      };
      gsap.ticker.add(syncReveal);
      const hide = () => {
        cursor.style.opacity = "0";
        document.documentElement.classList.remove("custom-cursor-active");
      };
      const move = (event: MouseEvent) => {
        cursor.style.opacity = "1";
        document.documentElement.classList.add("custom-cursor-active");
        xTo(event.clientX);
        yTo(event.clientY);
        const target = event.target;
        revealing = target instanceof Element && !!target.closest("[data-cursor-reveal]");
        const scaleVal = target instanceof Element && target.closest("a, button, [role='button'], .skill-pill") ? 3 : 1;
        scaleXTo(scaleVal);
        scaleYTo(scaleVal);
      };
      window.addEventListener("mousemove", move);
      document.addEventListener("mouseleave", hide);
      window.addEventListener("blur", hide);
      return () => {
        gsap.ticker.remove(syncReveal);
        window.removeEventListener("mousemove", move);
        document.removeEventListener("mouseleave", hide);
        window.removeEventListener("blur", hide);
        hide();
      };
    });
    return () => media.revert();
  }, []);
  return <div aria-hidden="true" ref={cursorRef} style={{ opacity: 0 }} className={`${inDialog ? "absolute" : "fixed"} top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform`} />;
}
