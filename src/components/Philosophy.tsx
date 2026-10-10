import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

export function Philosophy() {
  return (
    <section className="py-14 md:py-32 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-card-soft rounded-full flex items-center justify-center mb-8 md:mb-12">
        <span className="text-4xl md:text-5xl font-serif text-muted font-bold -mt-2">&quot;</span>
      </div>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] max-w-4xl mb-8 md:mb-12 text-foreground m-0"
      >
        {"I start by understanding the problem.\nThen I choose a practical next step and use evidence to decide what to improve."}
      </ScrollReveal>

      <div className="flex flex-col items-center">
        <span className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 bg-black/5 dark:bg-white/10 text-foreground">
          My approach
        </span>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm md:text-base font-semibold tracking-tight text-foreground/80">
          <span>Understand the user.</span>
          <span className="hidden md:inline text-muted">•</span>
          <span>Choose the next step.</span>
          <span className="hidden md:inline text-muted">•</span>
          <span>Measure the outcome.</span>
          <span className="hidden md:inline text-muted">•</span>
          <span>Learn and improve.</span>
        </div>
      </div>
    </section>
  );
}
