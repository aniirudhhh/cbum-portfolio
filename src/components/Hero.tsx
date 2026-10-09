"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-cursive", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".hero-portrait", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.4
      });

      gsap.from(".hero-text-left", {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8
      });

      gsap.from(".hero-text-right", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8
      });

      // Mouse parallax setup
      const xToCursive = gsap.quickTo(".hero-cursive", "x", { duration: 1.5, ease: "power2.out" });
      const yToCursive = gsap.quickTo(".hero-cursive", "y", { duration: 1.5, ease: "power2.out" });
      
      const xToPortrait = gsap.quickTo(".hero-portrait", "x", { duration: 2, ease: "power2.out" });
      const yToPortrait = gsap.quickTo(".hero-portrait", "y", { duration: 2, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Normalized coordinates (-1 to +1)
        const xPos = (clientX - centerX) / centerX;
        const yPos = (clientY - centerY) / centerY;

        // Cursive moves in opposite direction
        xToCursive(xPos * -35);
        yToCursive(yPos * -15);
        
        // Portrait moves slightly in the same direction
        xToPortrait(xPos * 20);
        yToPortrait(yPos * 10);
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Return a custom cleanup function for the context
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-screen left-1/2 -translate-x-1/2 min-h-0 md:min-h-[100svh] flex flex-col items-center justify-start md:justify-end pt-[135px] md:pt-0 overflow-hidden bg-background">

      {/* Background Cursive Text */}
      <div className="absolute top-[105px] mt-0 md:top-[25%] md:-mt-[40px] w-full flex justify-center pointer-events-none z-0 px-4">
        <h1 className="hero-cursive font-display text-[3.25rem] sm:text-[5rem] md:text-[clamp(5rem,18vw,16rem)] italic font-light text-foreground/30 tracking-tighter leading-none whitespace-nowrap">
          Hey there.
        </h1>
      </div>

      {/* Main Portrait */}
      <div className="hero-portrait relative z-10 w-full max-w-[340px] md:max-w-[500px] lg:max-w-[650px] flex-none flex justify-center items-end mt-0 mask-image-bottom-fade">
        <img 
          src="/shivam-portrait-3d-original.png" 
          alt="Shivam Kumar" 
          className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply filter contrast-[1.05]"
          onError={(e) => {
            const currentSrc = e.currentTarget.src;
            if (!currentSrc.includes("/shivam-portrait.png") && currentSrc.includes("/shivam-portrait-3d-original.png")) {
              e.currentTarget.src = "/shivam-portrait.png";
            }
          }}
        />
      </div>

      {/* Responsive Text Container */}
      <div className="w-full max-w-[1480px] flex flex-col md:block z-20 px-6 sm:px-12 -mt-[72px] md:mt-0 pb-8 pt-0 md:p-0 shrink-0">
        
        {/* Left / Top Text */}
        <div className="hero-text-left mt-0 md:absolute md:bottom-[8%] md:left-12 lg:left-24 flex flex-col items-start mb-2 md:mb-0">
          <h2 className="font-display text-[3.5rem] leading-[0.9] md:text-[clamp(4rem,7.5vw,6.5rem)] font-bold tracking-tight md:leading-[0.85] uppercase text-foreground">
            I AM <br /> SHIVAM
          </h2>
        </div>

        {/* Right / Bottom Text */}
        <div className="hero-text-right md:absolute md:bottom-[8%] md:right-12 lg:right-24 flex flex-col items-start md:text-left">
          <h2 className="font-display text-[1.1rem] leading-snug md:text-[clamp(1.2rem,2.2vw,2.2rem)] font-bold tracking-tight md:leading-tight uppercase text-foreground/80 md:text-foreground md:max-w-[300px]">
            Product <span className="md:hidden">•</span><br className="hidden md:block"/> Growth <span className="md:hidden">•</span><br className="hidden md:block"/> Analytics
          </h2>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-bottom-fade {
          -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }
      `}} />
    </section>
  );
}
