"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const projects = [
  {
    title: "LightBite",
    role: "Co-Founder",
    timeline: "Mar 2025 — Aug 2025",
    problem: "Needed a reliable system to handle daily inventory (25+ SKUs) while simultaneously running B2B client outreach for a new food venture.",
    execution: "Set up structured vendor workflows, optimized the menu based on initial feedback, and aggressively pursued local B2B partnerships.",
    impact: "Achieved profitability and successfully served 300+ unique customers within the first few months.",
    tags: ["Go-To-Market", "Operations", "Customer Discovery"],
    metricValue: "300+",
    metricLabel: "Unique Customers"
  },
  {
    title: "Numero Uno",
    role: "Digital Marketing Intern",
    timeline: "Dec 2025 — Mar 2026",
    problem: "Needed to establish a reliable baseline for audience targeting and improve organic search visibility.",
    execution: "Published 16+ SEO-optimized articles, created 7+ visual creatives and supported Meta Ads audience targeting and testing.",
    impact: "Monitored website activity in GA4 and Google Business Profile to support campaign and content decisions.",
    tags: ["SEO", "GA4 Analytics", "A/B Testing", "Meta Ads"],
    metricValue: "16+",
    metricLabel: "SEO Articles"
  }
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // The sticky layout is handled elegantly by Tailwind CSS (`sticky top-32`).
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-16 md:mb-24">
        <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 self-start bg-black/5 dark:bg-white/10 text-foreground">
          Case Studies
        </div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground m-0 max-w-2xl leading-[1.1]"
        >
          Featured Work: Proof of Execution.
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-12 md:gap-40">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5 md:gap-16 items-start relative">

            {/* Left Column (Sticky on Desktop) */}
            <div className="w-full md:w-[35%] lg:w-[40%] md:sticky md:top-32 flex flex-col gap-6">
              <div>
                <h3 className="font-display text-3xl md:text-6xl font-black tracking-tighter uppercase mb-2">
                  {project.title}
                </h3>
                <p className="text-sm md:text-lg font-medium text-foreground/60">{project.role} • {project.timeline}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-black/5 text-foreground/80 rounded-md text-xs font-bold tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column (Scrolls past) */}
            <div className="w-full md:w-[65%] lg:w-[60%] flex flex-col gap-4 md:gap-8">

              {/* Graphic/Metric Card */}
              <div className="w-full aspect-[2/1] md:aspect-[16/10] bg-section-dark text-white rounded-2xl md:rounded-[24px] p-5 md:p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl">
                {/* Subtle dynamic background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <AnimatedCounter
                    value={project.metricValue}
                    className="font-display text-[4rem] md:text-[8rem] font-black tracking-tighter leading-none mb-2 md:mb-4 text-white"
                  />
                  <span className="text-lg md:text-xl font-medium text-white/70 tracking-tight">
                    {project.metricLabel}
                  </span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mt-0 md:mt-4 bg-card-soft p-4 md:p-10 rounded-2xl md:rounded-[24px] thin-border">
                <div className="flex flex-col gap-2 md:gap-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-muted border-b border-black/10 pb-2">01. The Problem</span>
                  <p className="text-sm md:text-base font-medium text-foreground/80 leading-relaxed">{project.problem}</p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-muted border-b border-black/10 pb-2">02. The Execution</span>
                  <p className="text-sm md:text-base font-medium text-foreground/80 leading-relaxed">{project.execution}</p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3 md:col-span-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-muted border-b border-black/10 pb-2">03. The Impact</span>
                  <p className="text-sm md:text-lg font-medium text-foreground leading-relaxed">{project.impact}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
