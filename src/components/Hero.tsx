"use client";

import { MultilingualGreeting } from "@/components/MultilingualGreeting";
import { ScrambleLabel } from "@/components/ui/text-scramble";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import portrait from "../../public/shivam-portrait-3d-original.png";
import { MagneticButton } from "@/components/MagneticButton";
import { useStartupComplete } from "@/lib/startup";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const startupComplete = useStartupComplete();

  useLayoutEffect(() => {
    const hero = container.current;
    if (!hero || !startupComplete) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".hero-cursive", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0)
        .fromTo(".hero-portrait", { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4 }, 0.15)
        .fromTo(".hero-text-left", { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.35)
        .fromTo(".hero-text-right", { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.45);
    }, hero);

    media.add("(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Separate depth layers keep pointer motion independent of the entrance animation.
      const background = hero.querySelector(".hero-depth-background");
      const portraitLayer = hero.querySelector(".hero-depth-portrait");
      gsap.set([background, portraitLayer], { willChange: "transform", force3D: true });
      gsap.set(portraitLayer, { transformPerspective: 1200, transformOrigin: "50% 65%" });

      const backgroundX = gsap.quickTo(background, "x", { duration: 1.2, ease: "power3.out" });
      const backgroundY = gsap.quickTo(background, "y", { duration: 1.2, ease: "power3.out" });
      const portraitX = gsap.quickTo(portraitLayer, "x", { duration: 0.9, ease: "power3.out" });
      const portraitY = gsap.quickTo(portraitLayer, "y", { duration: 0.9, ease: "power3.out" });
      const tiltX = gsap.quickTo(portraitLayer, "rotationX", { duration: 1.1, ease: "power3.out" });
      const tiltY = gsap.quickTo(portraitLayer, "rotationY", { duration: 1.1, ease: "power3.out" });

      const moveLayers = (x: number, y: number) => {
        backgroundX(x * -36);
        backgroundY(y * -20);
        portraitX(x * 24);
        portraitY(y * 14);
        tiltX(y * -1.8);
        tiltY(x * 2.5);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = hero.getBoundingClientRect();
        const x = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
        const y = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
        moveLayers(x, y);
      };
      const reset = () => moveLayers(0, 0);
      hero.addEventListener("pointermove", onPointerMove, { passive: true });
      hero.addEventListener("pointerleave", reset);
      hero.addEventListener("pointercancel", reset);
      window.addEventListener("blur", reset);
      return () => {
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", reset);
        hero.removeEventListener("pointercancel", reset);
        window.removeEventListener("blur", reset);
      };
    }, hero);

    return () => media.revert();
  }, [startupComplete]);

  return (
    <section id="hero" ref={container} data-intro-pending={!startupComplete} className="relative w-screen left-1/2 -translate-x-1/2 min-h-0 md:min-h-[100svh] flex flex-col items-center justify-start md:justify-end pt-[135px] md:pt-0 overflow-hidden bg-background">

      {/* Background Cursive Text */}
      <div className="absolute top-[105px] mt-0 md:top-[25%] md:-mt-[40px] w-full flex justify-center pointer-events-none z-0 px-4">
        <p aria-hidden="true" className="hero-cursive font-display text-[3.25rem] sm:text-[5rem] md:text-[clamp(5rem,18vw,16rem)] italic font-light text-foreground/30 tracking-tighter leading-none whitespace-nowrap">
          <span className="hero-depth-background inline-block"><MultilingualGreeting active={startupComplete} /></span>
        </p>
      </div>

      {/* Main Portrait */}
      <div className="hero-portrait relative z-10 w-full max-w-[340px] md:max-w-[500px] lg:max-w-[650px] flex-none flex justify-center items-end mt-0 mask-image-bottom-fade">
        <div className="hero-depth-portrait w-full">
        <Image
          src={portrait}
          alt="Shivam Kumar"
          sizes="(min-width: 1024px) 650px, (min-width: 768px) 500px, 340px"
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply contrast-[1.05]"
        />
        </div>
      </div>

      {/* Responsive Text Container */}
      <div className="w-full max-w-[1480px] flex flex-col md:block z-20 px-6 sm:px-12 -mt-[72px] md:mt-0 pb-8 pt-0 md:p-0 shrink-0">

        {/* Left / Top Text */}
        <div className="hero-text-left mt-0 md:absolute md:bottom-[8%] md:left-12 lg:left-24 flex flex-col items-start mb-2 md:mb-0">
          <h1 className="hero-depth-name font-display text-[3.5rem] leading-[0.9] md:text-[clamp(4rem,7.5vw,6.5rem)] font-bold tracking-tight md:leading-[0.85] uppercase text-foreground">
            I'M <br /> SHIVAM
          </h1>
        </div>

        {/* Right / Bottom Text */}
        <div className="hero-text-right md:absolute md:bottom-[8%] md:right-[220px] lg:right-[240px] flex flex-col items-start md:text-left">
          <h2 className="font-display text-[1.1rem] leading-snug md:text-[clamp(1.2rem,2.2vw,2.2rem)] font-bold tracking-tight md:leading-tight uppercase text-foreground/80 md:text-foreground md:max-w-[300px]">
            Product <span className="md:hidden">•</span><br className="hidden md:block"/> Growth <span className="md:hidden">•</span><br className="hidden md:block"/> Analytics
          </h2>
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-foreground/70">
            Bringing hands-on experience in entrepreneurship, marketing and operations to product and growth problems.
          </p>
          <MagneticButton className="mt-5">
            <a href="/shivam-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-[2px] bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-black/80 dark:hover:bg-white/80 transition-colors"><ScrambleLabel>View résumé</ScrambleLabel></a>
          </MagneticButton>
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
