import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-14 md:py-24 bg-card-soft w-screen relative left-1/2 -translate-x-1/2 flex justify-center">
      <div className="w-full max-w-[1480px] px-4 md:px-8 lg:px-12 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start mb-10 md:mb-16">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-bold uppercase tracking-wider mb-8 bg-background">
              Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
              Hands-on experience. Practical lessons.
            </h2>
          </div>
          <div className="w-full md:w-1/2 md:pt-20">
            <p className="text-lg font-medium text-foreground/70 leading-relaxed">
              From running a food venture to supporting marketing campaigns and daily operations, each role has shaped how I approach business problems.
            </p>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col border-t border-[rgba(0,0,0,0.08)]">
          {experience.map((item) => (
            <div 
              key={item.id}
              className="group flex flex-col md:flex-row justify-between md:items-center py-8 md:py-12 border-b border-[rgba(0,0,0,0.08)] hover:bg-black/[0.02] transition-colors -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 cursor-default"
            >
              <div className="w-full md:w-2/3 flex flex-col md:pr-8 mb-4 md:mb-0">
                <h3 className={`text-xl md:text-2xl font-bold tracking-tight mb-2 ${item.highlight ? "text-foreground" : "text-foreground/90"}`}>
                  {item.role} at {item.company}
                </h3>
                <p className="text-sm font-medium text-muted leading-relaxed max-w-2xl">
                  {item.summary}
                </p>
              </div>
              <div className="w-full md:w-1/3 flex md:justify-end">
                <span className="text-sm md:text-base font-medium tracking-normal text-muted group-hover:text-foreground transition-colors">
                  {item.dates.replace(" — ", "–")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
