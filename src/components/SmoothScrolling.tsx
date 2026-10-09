"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  if (reducedMotion) return <>{children}</>;
  return <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>{children}</ReactLenis>;
}
