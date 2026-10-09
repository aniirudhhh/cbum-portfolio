"use client";

import { useRef, useEffect } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
}

export function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(255, 255, 255, 0.06)",
  ...props 
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className={`relative overflow-hidden group/spotlight ${className}`}
      style={{ "--spotlight-color": spotlightColor } as React.CSSProperties}
      {...props}
    >
      {/* The spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), var(--spotlight-color), transparent 40%)",
        }}
      />
      
      {/* The content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
