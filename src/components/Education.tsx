"use client";

import { useState } from "react";
import { education } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { InfoModal } from "@/components/InfoModal";
import { ArrowRight } from "lucide-react";

export function Education() {
  const [activeItem, setActiveItem] = useState<typeof education[0] | null>(null);

  return (
    <section id="education" className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-8 md:mb-12">
        <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 self-start bg-black/5 dark:bg-white/10 text-foreground">
          Education
        </div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-foreground m-0"
        >
          Academic Background
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
        {education.map((edu, index) => (
          <SpotlightCard
            key={index}
            onClick={() => setActiveItem(edu)}
            spotlightColor="var(--color-border)"
            className="group/card cursor-pointer rounded-2xl md:rounded-[20px] p-4 md:p-8 thin-border bg-card-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                <ArrowRight size={14} className="text-foreground" />
              </div>

              <span className="text-xs font-bold text-muted mb-2 tracking-wider uppercase">
                {edu.graduated || edu.years}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2 group-hover/card:opacity-80 transition-opacity">
                {edu.degree}
              </h3>
              <p className="text-sm md:text-base font-medium text-foreground/80 mb-3 md:mb-6">
                {edu.institution}
              </p>

              <div className="mt-auto pt-3 md:pt-6 border-t border-black/5 flex flex-col gap-1">
                {edu.specialization && (
                  <span className="text-sm font-medium text-foreground/70">
                    <strong className="text-foreground">Specialization:</strong> {edu.specialization}
                  </span>
                )}
                {edu.stream && (
                  <span className="text-sm font-medium text-foreground/70">
                    <strong className="text-foreground">Stream:</strong> {edu.stream}
                  </span>
                )}
                {edu.cgpa && (
                  <span className="text-sm font-medium text-foreground/70">
                    <strong className="text-foreground">CGPA:</strong> {edu.cgpa}
                  </span>
                )}
                {edu.board && (
                  <span className="text-sm font-medium text-foreground/70">
                    <strong className="text-foreground">Board:</strong> {edu.board}
                  </span>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <InfoModal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        badge="Education"
        title={activeItem?.degree || ""}
        detail={
          <div className="flex flex-col gap-5">
            <h4 className="text-xl sm:text-2xl font-semibold text-white/90">{activeItem?.institution}</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1">Timeline</span>
                <span className="text-base sm:text-lg font-medium text-white">{activeItem?.graduated || activeItem?.years}</span>
              </div>
              {(activeItem?.cgpa || activeItem?.stream) && (
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1">
                    {activeItem?.cgpa ? "CGPA" : "Stream"}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-white">{activeItem?.cgpa || activeItem?.stream}</span>
                </div>
              )}
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-white/80 text-sm sm:text-base font-normal leading-relaxed">
                {activeItem?.detail}
              </p>
            </div>
          </div>
        }
      />
    </section>
  );
}
