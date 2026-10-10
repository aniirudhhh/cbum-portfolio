"use client";

import { useEffect, useRef, useState } from "react";
import { finishStartup, waitForRobot } from "@/lib/startup";

export function Loader() {
  const overlay = useRef<HTMLDivElement>(null);
  const release = useRef<() => void>(() => {});
  const exit = useRef<() => void>(() => {});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const element = overlay.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.starting = "true";
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    resetScroll();
    let scrollFrame = 0;
    const holdAtHero = () => {
      if (window.scrollY !== 0) resetScroll();
      scrollFrame = window.requestAnimationFrame(holdAtHero);
    };
    scrollFrame = window.requestAnimationFrame(holdAtHero);
    let finished = false;
    release.current = () => {
      if (finished) return;
      finished = true;
      window.cancelAnimationFrame(scrollFrame);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      delete document.documentElement.dataset.starting;
      resetScroll();
      setIsComplete(true);
      finishStartup();
    };
    let exitStarted = false;
    let frame = 0;
    const beginExit = () => {
      if (exitStarted) return;
      exitStarted = true;
      resetScroll();
      frame = window.requestAnimationFrame(() => {
        resetScroll();
        element.dataset.leaving = "true";
      });
    };
    exit.current = beginExit;
    const beginCounting = () => {
      resetScroll();
      element.dataset.counting = "true";
    };
    let unsubscribeRobot = () => {};
    const exitTimer = window.setTimeout(() => {
      unsubscribeRobot = waitForRobot(beginCounting);
    }, 200);
    // A late animation event must not leave scrolling locked.
    let releaseTimer: number | undefined;
    const fallback = window.setTimeout(() => {
      beginExit();
      releaseTimer = window.setTimeout(() => release.current(), 1200);
    }, 6000);
    return () => {
      unsubscribeRobot();
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallback);
      window.clearTimeout(releaseTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      delete document.documentElement.dataset.starting;
      window.history.scrollRestoration = previousRestoration;
      release.current = () => {};
      exit.current = () => {};
    };
  }, []);

  if (isComplete) return null;
  return (
    <div ref={overlay} data-lenis-prevent
      onAnimationEnd={(event) => {
        if (event.animationName === "loader-count") exit.current();
        if (event.target === event.currentTarget && event.animationName === "loader-curtain-exit") release.current();
      }}
      className="loader-overlay fixed inset-0 z-[100] bg-[#111111] text-[#F7F7F5] flex flex-col justify-between p-6 md:p-12">
      <div className="flex justify-between items-start">
        <div className="overflow-hidden"><div className="loader-text-inner font-semibold text-xs md:text-sm tracking-widest uppercase">Portfolio <br /> © {new Date().getFullYear()}</div></div>
        <div className="overflow-hidden"><div className="loader-text-inner font-semibold text-xs md:text-sm tracking-widest uppercase text-right">Shivam <br /> Kumar</div></div>
      </div>
      <div className="flex justify-between items-end">
        <div className="overflow-hidden"><h1 className="loader-text-inner font-display text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tighter leading-[0.85] uppercase">PRODUCT <br /> PORTFOLIO</h1></div>
        <div className="loader-counter font-display text-[clamp(3rem,8vw,7rem)] font-bold tracking-tighter tabular-nums" aria-label="Loading portfolio">
          <div className="loader-counter-strip" aria-hidden="true">
            {Array.from({ length: 101 }, (_, value) => <span key={value}>{value.toString().padStart(3, "0")}%</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
