"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toolkit } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import {
  FileText, Route, Compass, Layout, GitCompare, Rocket,
  Brain, Network, Sparkles, Heart, GitMerge, Bot,
  TrendingUp, PenTool, Megaphone, LineChart, PieChart,
  FileSpreadsheet, BarChart, LayoutDashboard,
  Palette, LayoutTemplate, CheckCircle2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "PRD Writing": FileText,
  "User Journey Mapping": Route,
  "Product Discovery": Compass,
  "Jira": Layout,
  "A/B Testing": GitCompare,
  "GTM Strategy": Rocket,
  "LLM Integration": Brain,
  "RAG Architecture": Network,
  "Prompt Optimization": Sparkles,
  "Lovable.dev": Heart,
  "Make.com": GitMerge,
  "Claude API": Bot,
  "SEO": TrendingUp,
  "Content Strategy": PenTool,
  "Meta Ads Manager": Megaphone,
  "GA4": LineChart,
  "Mixpanel": PieChart,
  "Excel": FileSpreadsheet,
  "Power BI": BarChart,
  "Google Data Studio": LayoutDashboard,
  "Figma": PenTool,
  "Canva": Palette,
  "WordPress": LayoutTemplate
};



export function Toolkit() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Find all rows (categories)
      const rows = gsap.utils.toArray<HTMLElement>('.toolkit-row');

      rows.forEach((row) => {
        const pills = row.querySelectorAll('.skill-pill');

        gsap.fromTo(pills,
          { opacity: 0, scale: 0.9, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: row,
              start: "top 85%", // Triggers when the row enters the viewport
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="toolkit" ref={containerRef} className="py-12 md:py-24 border-t border-[rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex flex-col mb-10 md:mb-16">
        <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 self-start bg-black/5 dark:bg-white/10 text-foreground">
          Toolkit
        </div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-medium tracking-tight text-foreground m-0"
        >
          Tools & Methods
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-6 md:gap-14">
        {Object.entries(toolkit).map(([category, skills], idx) => (
          <div key={idx} className="toolkit-row flex flex-col md:flex-row md:items-start gap-3 md:gap-12">
            <h3 className="w-48 text-xs font-bold tracking-widest uppercase text-muted md:mt-3">
              {category}
            </h3>
            <div className="flex-1 flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="skill-pill opacity-0 flex items-center gap-2 md:gap-2.5 px-3 md:px-5 py-2 md:py-2.5 bg-card-soft border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 rounded-full text-xs md:text-sm font-semibold tracking-tight text-foreground/90 transition-all cursor-default"
                >
                  {(() => {
                    const Icon = iconMap[skill] || CheckCircle2;
                    return <Icon size={14} className="text-foreground/50" strokeWidth={2.5} />;
                  })()}
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
