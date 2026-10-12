"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useStartupComplete } from "@/lib/startup";

function StartupScrollGuard() {
  const lenis = useLenis();
  const ready = useStartupComplete();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!lenis) return;
    (window as any).__lenis = lenis;
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    if (ready) lenis.start();
    else lenis.stop();
  }, [lenis, ready]);
  return null;
}

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  return <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reducedMotion, anchors: true }}><StartupScrollGuard />{children}</ReactLenis>;
}
