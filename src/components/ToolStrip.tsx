"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaWordpress,
  FaSlack,
  FaFigma,
  FaJira,
  FaTrello,
  FaGoogle,
  FaMeta,
  FaShopify,
  FaChartPie,
  FaRobot
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

// Defined exactly based on the previous tools list, with a few extra AI/Product ones to pad out the marquee
const icons = [
  { Icon: FaChartPie, color: "#E37400", name: "Analytics" },
  { Icon: FaJira, color: "#0052CC", name: "Jira" },
  { Icon: FaSlack, color: "#4A154B", name: "Slack" },
  { Icon: FaMeta, color: "#0468FF", name: "Meta Ads" },
  { Icon: FaFigma, color: "#F24E1E", name: "Figma" },
  { Icon: FaWordpress, color: "#21759B", name: "WordPress" },
  { Icon: FaRobot, color: "#412991", name: "AI Tools" },
  { Icon: FaGoogle, color: "#DB4437", name: "Google Workspace" },
  { Icon: FaShopify, color: "#96BF48", name: "Shopify" },
  { Icon: FaTrello, color: "#0052CC", name: "Trello" },
];

export function ToolStrip() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    // Create the marquee timeline
    const tl = gsap.to(rowRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30, // base slow speed
      repeat: -1,
    });

    // Speed up on scroll
    let scrollTimeout: NodeJS.Timeout;
    
    // Use ScrollTrigger to detect scroll velocity globally
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // self.getVelocity() returns pixels per second
        const velocity = Math.abs(self.getVelocity());
        
        // Map velocity to a timeScale modifier (1 is normal speed, increases as you scroll faster)
        const targetTimeScale = 1 + velocity / 500;
        
        // Smoothly tween to the target speed
        gsap.to(tl, {
          timeScale: Math.min(targetTimeScale, 8), // cap at 8x speed
          duration: 0.2,
          overwrite: true
        });

        // Reset back to normal speed when scrolling stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to(tl, {
            timeScale: 1,
            duration: 0.5,
            overwrite: true
          });
        }, 100);
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full py-10 md:py-16 flex justify-center relative overflow-hidden bg-background">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      {/* The scrolling container */}
      <div 
        ref={rowRef}
        className="flex flex-nowrap w-max items-center"
      >
        {/* We render the set twice to allow seamless looping (gsap shifts by 50%) */}
        {[...icons, ...icons].map((item, index) => {
          const { Icon, color, name } = item;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-6 md:mx-10 group"
              style={{ color: color }}
              title={name}
            >
              <Icon className="w-8 h-8 md:w-12 md:h-12 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
