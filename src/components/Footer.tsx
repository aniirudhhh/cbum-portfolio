"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!container.current || !textRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Parallax effect on the giant text as you scroll into the footer
      gsap.fromTo(textRef.current, 
        { 
          yPercent: 40,
          scale: 0.9,
        },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={container} className="pt-14 md:pt-24 pb-8 flex flex-col relative text-white w-full">
      {/* Top Section: Links & Info */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8 mb-12 md:mb-24 z-10 relative">
        
        {/* Left: Info */}
        <div className="flex flex-col max-w-sm">
          <p className="text-2xl font-medium tracking-tight mb-6 leading-snug">
            Bringing customer understanding, <br className="hidden md:block"/> data and execution together.
          </p>
          <p className="text-sm font-medium tracking-wide text-white/70">
            Based in Bangalore, India.<br />
            Available for remote opportunities worldwide.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-row flex-wrap gap-16 md:gap-32">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Socials</span>
            <a href="https://linkedin.com/in/shivamkr026" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-white/70 transition-colors">LinkedIn</a>
            <a href="mailto:shivamkr026@gmail.com" className="text-sm font-medium hover:text-white/70 transition-colors">Email</a>
            <a href="mailto:shivamkr026@gmail.com?subject=Resume%20request" className="text-sm font-medium hover:text-white/70 transition-colors">Request résumé</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Sitemap</span>
            <a href="#projects" className="text-sm font-medium hover:text-white/70 transition-colors">Work</a>
            <a href="#about" className="text-sm font-medium hover:text-white/70 transition-colors">About</a>
            <a href="#experience" className="text-sm font-medium hover:text-white/70 transition-colors">Experience</a>
            <a href="#expertise" className="text-sm font-medium hover:text-white/70 transition-colors">Expertise</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-between items-center text-xs font-medium text-white/60 z-10 relative mb-2 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Shivam Kumar.</span>
        <span className="hidden md:inline-block">All rights reserved.</span>
      </div>

      {/* Massive Background Text */}
      <div className="w-full flex justify-center items-end overflow-hidden leading-none select-none pointer-events-none">
        <p aria-hidden="true"
          ref={textRef}
          className="font-display text-[clamp(4rem,15vw,20rem)] font-black uppercase tracking-tighter text-white/[0.04] m-0 p-0 leading-[0.75] text-center w-full" 
        >
          SHIVAM
        </p>
      </div>
    </footer>
  );
}
