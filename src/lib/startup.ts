"use client";

import { useSyncExternalStore } from "react";

let complete = false;
const listeners = new Set<() => void>();
let robotReady = false;
const robotListeners = new Set<() => void>();

export function markRobotReady() {
  robotReady = true;
  robotListeners.forEach((listener) => listener());
}

export function waitForRobot(callback: () => void) {
  if (robotReady) callback();
  else robotListeners.add(callback);
  return () => { robotListeners.delete(callback); };
}

export function finishStartup() {
  complete = true;
  listeners.forEach((listener) => listener());
}

export function useStartupComplete() {
  return useSyncExternalStore(
    (listener) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    () => complete,
    () => false,
  );
}
