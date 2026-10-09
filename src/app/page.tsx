"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ToolStrip } from "@/components/ToolStrip";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Toolkit } from "@/components/Toolkit";
import { Interests } from "@/components/Interests";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!container.current) return;
    
    const ctx = gsap.context(() => {
      // Global stagger reveal for text and elements within sections (skipping hero which has its own)
      const sections = gsap.utils.toArray('section:not(#hero)');
      
      sections.forEach((sec: any) => {
        const elements = sec.querySelectorAll('h2, h3, h4, p, li, img, a, button, .stagger-box');
        
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-background flex flex-col items-center">
      <div className="w-full max-w-[1480px] px-4 md:px-8 lg:px-12 flex flex-col relative">
        <Navbar />
        <Hero />
        <ToolStrip />
        <About />
        <Expertise />
        <Experience />
        <Education />
        <Certifications />
        <Toolkit />
        <Interests />
        <Philosophy />
      </div>

      {/* Contact */}
      <div className="w-full bg-background flex flex-col items-center border-t border-black/5 mt-12">
        <div className="w-full max-w-[1480px] px-4 md:px-8 lg:px-12">
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#111111] flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-[1480px] px-4 md:px-8 lg:px-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}
