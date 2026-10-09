import { interests } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

export function Interests() {
  return (
    <section className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-12">
        <ScrollReveal 
          baseOpacity={0} 
          enableBlur={true} 
          baseRotation={5} 
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-foreground m-0"
        >
          Curious About
        </ScrollReveal>
      </div>

      <div className="flex flex-col border-t border-[rgba(0,0,0,0.08)]">
        {interests.map((interest, index) => (
          <div key={index} className="py-6 border-b border-[rgba(0,0,0,0.08)] hover:pl-4 transition-all duration-300 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 group">
            <span className="text-2xl md:text-3xl font-medium tracking-tight text-foreground/80 md:w-1/3 shrink-0 group-hover:text-foreground transition-colors">
              {interest.title}
            </span>
            <div className="md:w-2/3 md:pt-1">
              <ScrollReveal 
                baseOpacity={0} 
                enableBlur={true} 
                baseRotation={3} 
                blurStrength={8}
                containerClassName="text-base md:text-lg font-medium text-foreground/60 leading-relaxed m-0"
              >
                {interest.description}
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
