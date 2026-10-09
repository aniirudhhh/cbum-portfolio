import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-8 md:mb-12">
        <div className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-bold uppercase tracking-wider mb-8 self-start bg-background">
          Education
        </div>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
          Academic Background
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {education.map((edu, index) => (
          <div key={index} className="flex flex-col p-8 rounded-[20px] thin-border bg-white hover:-translate-y-1 transition-transform">
            <span className="text-xs font-bold text-muted mb-2 tracking-wider uppercase">
              {edu.graduated || edu.years}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2">
              {edu.degree}
            </h3>
            <p className="text-base font-medium text-foreground/80 mb-6">
              {edu.institution}
            </p>
            
            <div className="mt-auto pt-6 border-t border-black/5 flex flex-col gap-1">
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
        ))}
      </div>
    </section>
  );
}
