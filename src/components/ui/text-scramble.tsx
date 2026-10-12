"use client";

import { type ElementType, type JSX, useEffect, useMemo, useRef, useState } from "react";
import { motion, type MotionProps, useReducedMotion } from "framer-motion";

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & Omit<MotionProps, "children">;

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({ children, duration = 0.8, speed = 0.04,
  characterSet = defaultChars, as: Component = "p", className, trigger = true,
  onScrambleComplete, ...props }: TextScrambleProps) {
  const MotionComponent = useMemo(() => motion.create(Component as keyof JSX.IntrinsicElements), [Component]);
  const [displayText, setDisplayText] = useState(children);
  const reduceMotion = useReducedMotion();
  const completeRef = useRef(onScrambleComplete);
  useEffect(() => { completeRef.current = onScrambleComplete; }, [onScrambleComplete]);

  useEffect(() => {
    if (!trigger || reduceMotion || duration <= 0 || !characterSet.length) {
      setDisplayText(children);
      if (trigger) completeRef.current?.();
      return;
    }
    const tick = Math.max(0.01, speed);
    const steps = Math.max(1, Math.ceil(duration / tick));
    let step = 0;
    const interval = window.setInterval(() => {
      step++;
      const progress = step / steps;
      setDisplayText(Array.from(children, (char, index) =>
        /\s/.test(char) || index < progress * children.length ? char :
          characterSet[Math.floor(Math.random() * characterSet.length)]).join(""));
      if (step >= steps) {
        window.clearInterval(interval);
        setDisplayText(children);
        completeRef.current?.();
      }
    }, tick * 1000);
    return () => window.clearInterval(interval);
  }, [children, trigger, duration, speed, characterSet, reduceMotion]);

  return <MotionComponent className={className} {...props}>
    <span className="sr-only">{children}</span>
    <span aria-hidden="true" className="relative inline-block whitespace-nowrap align-bottom">
      <span className="invisible whitespace-pre">{children}</span>
      <span className="absolute inset-0 overflow-hidden whitespace-pre">{displayText}</span>
    </span>
  </MotionComponent>;
}

/** Scrambles when the containing link or button is hovered or keyboard focused. */
export function ScrambleLabel({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const control = ref.current?.closest("a, button");
    if (!control) return;
    const start = () => setActive(true);
    const reset = () => setActive(false);
    control.addEventListener("pointerenter", start);
    control.addEventListener("focus", start);
    control.addEventListener("pointerleave", reset);
    control.addEventListener("blur", reset);
    return () => {
      control.removeEventListener("pointerenter", start);
      control.removeEventListener("focus", start);
      control.removeEventListener("pointerleave", reset);
      control.removeEventListener("blur", reset);
    };
  }, []);
  return <span ref={ref} className={className}><TextScramble as="span" duration={0.8} speed={0.05} trigger={active}>{children}</TextScramble></span>;
}


