import { metrics } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-14 md:py-24 flex flex-col gap-10 md:gap-16 border-t border-[rgba(0,0,0,0.08)] mt-4 md:mt-12">
      {/* Top Split */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-bold uppercase tracking-wider mb-8">
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-lg">
            I like finding the point where users, data and business meet.
          </h2>
        </div>
        
        <div className="w-full md:w-1/2 md:pt-16">
          <p className="text-lg font-medium text-foreground/80 leading-relaxed max-w-md">
            I’ve co-founded a food venture and worked across digital marketing and operations. With a background in Marketing and Data Analytics, I bring customer understanding, analytical thinking and hands-on execution to product and growth problems.
          </p>
        </div>
      </div>

      {/* Personal Background & Metrics Split */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <div className="w-full md:w-[65%] lg:w-[70%] bg-card-soft thin-border rounded-[24px] p-6 md:p-10 flex flex-col divide-y divide-black/10">
          <div className="pb-6">
            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">What shaped me</h3>
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
              Co-founding LightBite put me close to the customer and the everyday realities of running a business. Working with vendors, managing stock and serving customers taught me to consider both the idea and what it takes to deliver it.
            </p>
          </div>
          <div className="py-6">
            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">How I work</h3>
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
              I like turning an unclear problem into manageable steps: understand who it affects, look at the evidence and choose a practical next action. I value following through and learning from what happens next.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">Where I want to contribute</h3>
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
              I’m interested in product, growth and analytics roles where I can bring my business experience to real customer problems, contribute to a team and keep developing my product skills.
            </p>
          </div>
        </div>

        {/* Metrics Column */}
        <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col gap-8 justify-center">
          {metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-5xl lg:text-6xl font-medium tracking-tighter mb-2">
                {metric.value}
              </div>
              <p className="text-sm font-medium text-muted max-w-[200px] leading-tight">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
