import { certifications } from "@/data/portfolio";

export function Certifications() {
  return (
    <section className="py-12 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
          Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {certifications.map((cert, index) => (
          <div key={index} className="flex flex-col p-8 rounded-[20px] thin-border bg-card-soft hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-white thin-border flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2">
              {cert.title}
            </h3>
            <p className="text-base font-medium text-muted">
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
