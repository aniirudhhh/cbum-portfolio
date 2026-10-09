import { interests } from "@/data/portfolio";

export function Interests() {
  return (
    <section className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
          Curious About
        </h2>
      </div>

      <div className="flex flex-col border-t border-[rgba(0,0,0,0.08)]">
        {interests.map((interest, index) => (
          <div key={index} className="py-6 border-b border-[rgba(0,0,0,0.08)] hover:pl-4 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-medium tracking-tight text-foreground/80">
              {interest}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
