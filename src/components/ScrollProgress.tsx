"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = progressRef.current;
    if (!circle) return;

    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const offsetTo = gsap.quickTo(circle, "strokeDashoffset", { duration: 0.3, ease: "power2.out" });

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;

      setIsVisible(scrollY > 150);
      offsetTo(circumference - Math.min(progress, 1) * circumference);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`hidden md:block fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <MagneticButton strength={0.2}>
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl shadow-lg border border-black/5 hover:bg-black/5 transition-colors group"
        >
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-black/10"
            />
            <circle
              ref={progressRef}
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-foreground"
            />
          </svg>
          <ArrowUp size={20} strokeWidth={2.5} className="text-foreground z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1" />
        </button>
      </MagneticButton>
    </div>
  );
}
