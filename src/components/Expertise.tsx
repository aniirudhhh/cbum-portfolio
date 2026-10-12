"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { expertise } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { InfoModal } from "@/components/InfoModal";

export function Expertise() {
  const [activeItem, setActiveItem] = useState<typeof expertise[0] | null>(null);

  return (
    <section id="expertise" className="py-14 md:py-24 flex flex-col lg:flex-row gap-10 md:gap-16 border-t border-[rgba(0,0,0,0.08)]">
      {/* Left */}
      <div className="w-full lg:w-1/3 flex flex-col items-start">
        <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 bg-black/5 dark:bg-white/10 text-foreground">
          Expertise
        </div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6 text-foreground m-0"
        >
          A practical mix of product, growth and analytics.
        </ScrollReveal>
        <p className="text-lg font-medium text-foreground/80 leading-relaxed mb-8">
          I bring experience in content, campaigns and business operations, alongside training in AI product management. My focus is on understanding the problem and finding a practical next step.
        </p>
        <a href="#experience" className="inline-flex items-center gap-2 text-sm font-bold tracking-tight hover:opacity-70 transition-opacity">
          View Experience <ArrowRight size={16} strokeWidth={2.5} />
        </a>
      </div>

      {/* Right - 2x2 Grid */}
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {expertise.map((item, index) => (
          <SpotlightCard
            key={index}
            onClick={() => setActiveItem(item)}
            spotlightColor={item.dark ? "rgba(255, 255, 255, 0.08)" : "var(--color-border)"}
            className={`group/card cursor-pointer rounded-2xl md:rounded-[20px] p-4 md:p-10 md:min-h-[260px] transition-all duration-300 hover:-translate-y-1 ${
              item.dark
                ? "bg-section-dark text-white shadow-lg hover:shadow-xl hover:shadow-black/20"
                : "bg-card-soft text-foreground thin-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5"
            }`}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 md:mb-4 group-hover/card:opacity-85 transition-opacity">{item.title}</h3>
                <p className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${item.dark ? "text-white/80 group-hover/card:text-white" : "text-foreground/80 group-hover/card:text-foreground"}`}>
                  {item.description}
                </p>
              </div>

              <div className="mt-3 md:mt-8 self-end">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:scale-110 ${
                  item.dark ? "bg-white/10 text-white" : "bg-background text-foreground shadow-sm"
                }`}>
                  <ArrowRight size={18} strokeWidth={2} className={item.dark ? "opacity-100" : "opacity-70"} />
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <InfoModal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        badge="Area of Expertise"
        title={activeItem?.title || ""}
        detail={
          <div className="flex flex-col gap-4">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">{activeItem?.description}</p>
            <div className="mt-2 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
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
