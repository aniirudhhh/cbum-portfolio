"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Extract digits and any surrounding characters (e.g. "+", "$", "%")
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  
  // Extract prefix and suffix correctly
  const prefix = numericMatch ? value.substring(0, numericMatch.index) : "";
  const suffix = numericMatch ? value.substring(numericMatch.index! + numericMatch[1].length) : value;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !numberRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const obj = { val: 0 };
    
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: targetNumber,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Trigger when it enters the bottom of the viewport
          toggleActions: "play none none none", // Only play once
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(obj.val).toString();
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [targetNumber]);

  if (!numericMatch) {
    // If there is no number in the string, just return the string
    return <div className={className}>{value}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {prefix}
      <span ref={numberRef}>{targetNumber}</span>
      {suffix}
    </div>
  );
}
