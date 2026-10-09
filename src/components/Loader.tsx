"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
      }
    });

    // 1. Initial text reveal (slide up from clip)
    tl.to(".loader-text-inner", {
      y: "0%",
      duration: 1,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.2
    });

    // 2. Progress counter animation
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    }, "<"); // start at the same time as text reveal

    // 3. Text slide up and fade out before curtain rises
    tl.to(".loader-text-inner", {
      y: "-100%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.05
    }, "+=0.2");

    // 4. Curtain slide up (reveal site)
    tl.to(".loader-overlay", {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="loader-overlay fixed inset-0 z-[100] bg-[#111111] text-[#F7F7F5] flex flex-col justify-between p-6 md:p-12">
      
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="overflow-hidden">
          <div className="loader-text-inner translate-y-[100%] font-semibold text-xs md:text-sm tracking-widest uppercase">
            Portfolio <br/> © {new Date().getFullYear()}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="loader-text-inner translate-y-[100%] font-semibold text-xs md:text-sm tracking-widest uppercase text-right">
            Shivam <br/> Kumar
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="flex justify-between items-end">
        <div className="overflow-hidden">
          <h1 className="loader-text-inner translate-y-[100%] text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tighter leading-[0.85] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            PRODUCT <br /> PORTFOLIO
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="loader-text-inner translate-y-[100%] text-[clamp(3rem,8vw,7rem)] font-bold tracking-tighter leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
            {progress.toString().padStart(3, '0')}%
          </h1>
        </div>
      </div>
      
    </div>
  );
}
