"use client";

import { useState } from "react";
import { certifications } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { InfoModal } from "@/components/InfoModal";
import { Award, ArrowRight } from "lucide-react";

export function Certifications() {
  const [activeItem, setActiveItem] = useState<typeof certifications[0] | null>(null);

  return (
    <section className="py-12 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-8 md:mb-12">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-foreground m-0"
        >
          Certifications
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
        {certifications.map((cert, index) => (
          <SpotlightCard
            key={index}
            onClick={() => setActiveItem(cert)}
            spotlightColor="var(--color-border)"
            className="group/card cursor-pointer rounded-2xl md:rounded-[20px] p-4 md:p-8 thin-border bg-card-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                <ArrowRight size={14} className="text-foreground" />
              </div>
              <div className="w-10 h-10 rounded-full bg-background thin-border flex items-center justify-center mb-3 md:mb-6 text-foreground group-hover/card:scale-105 transition-transform">
                <Award size={20} strokeWidth={2} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2 group-hover/card:opacity-80 transition-opacity">
                {cert.title}
              </h3>
              <p className="text-sm md:text-base font-medium text-muted">
                {cert.issuer}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <InfoModal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        badge="Certification"
        title={activeItem?.title || ""}
        detail={
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs font-bold tracking-wider uppercase text-white/70">
                Issuer
              </span>
              <span className="text-lg sm:text-xl font-medium text-white/90">{activeItem?.issuer}</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
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
