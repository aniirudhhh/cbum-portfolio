import { toolkit } from "@/data/portfolio";

export function Toolkit() {
  return (
    <section className="py-12 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-10 md:mb-16">
        <div className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-bold uppercase tracking-wider mb-8 self-start bg-background">
          Toolkit
        </div>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
          Tools & Methods
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {Object.entries(toolkit).map(([category, skills], idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
            <h3 className="w-48 text-sm font-bold tracking-widest uppercase text-muted md:mt-2">
              {category}
            </h3>
            <div className="flex-1 flex flex-wrap gap-2">
              {skills.map((skill, sIdx) => (
                <div 
                  key={sIdx} 
                  className="px-4 py-2 bg-white thin-border rounded-full text-sm font-semibold tracking-tight text-foreground/80 hover:bg-card-soft transition-colors cursor-default"
                >
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
