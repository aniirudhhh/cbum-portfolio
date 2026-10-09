"use client";

import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-14 md:py-32 w-full flex flex-col md:flex-row gap-10 md:gap-8 justify-between relative z-10 border-t border-black/10 mt-6 md:mt-12">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Let’s <br /> Connect
          </h2>
          <p className="text-base font-medium text-foreground/60 max-w-sm mt-4 leading-relaxed">
            Hiring for a product, growth or analytics role—or working on an interesting problem? I’d love to connect.
          </p>
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-start gap-4">
          <a 
            href="mailto:shivamkr026@gmail.com"
            className="flex items-center gap-4 bg-transparent hover:bg-black/5 transition-colors rounded-full p-2 pr-6 border border-black/10"
          >
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold">
              <span className="text-[10px] uppercase tracking-widest">Email</span>
            </div>
            <span className="font-semibold text-xs tracking-wider uppercase text-foreground">shivamkr026@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-full md:w-1/2 md:pl-12 lg:pl-24">
        <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 w-full relative group">
              <label className="text-xs font-bold text-foreground/65 uppercase tracking-widest transition-colors group-focus-within:text-foreground">01. Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-0 py-3 bg-transparent border-b border-black/20 text-lg font-medium outline-none focus:border-black transition-colors rounded-none placeholder:text-black/55"
              />
            </div>
            <div className="flex flex-col gap-3 w-full relative group">
              <label className="text-xs font-bold text-foreground/65 uppercase tracking-widest transition-colors group-focus-within:text-foreground">02. Email</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-0 py-3 bg-transparent border-b border-black/20 text-lg font-medium outline-none focus:border-black transition-colors rounded-none placeholder:text-black/55"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 relative group">
            <label className="text-xs font-bold text-foreground/65 uppercase tracking-widest transition-colors group-focus-within:text-foreground">03. Message</label>
            <textarea 
              placeholder="Tell me about the role, project or problem..." 
              rows={3}
              className="w-full px-0 py-3 bg-transparent border-b border-black/20 text-lg font-medium outline-none focus:border-black transition-colors rounded-none placeholder:text-black/55 resize-none"
            />
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background font-bold tracking-widest uppercase text-xs px-10 py-5 hover:bg-black/80 transition-colors rounded-[2px] w-full sm:w-auto"
            >
              Send Message <ArrowUpRight size={16} />
            </button>
          </div>
          
        </form>
      </div>

    </section>
  );
}
