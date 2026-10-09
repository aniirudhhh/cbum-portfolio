"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { LiveTime } from "@/components/LiveTime";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("shivamkr026@gmail.com");
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Select and copy the email address shown above.");
    }
  }

  return (
    <section id="contact" className="py-14 md:py-32 w-full flex flex-col md:flex-row gap-10 md:gap-8 justify-between relative z-10 border-t border-black/10 mt-6 md:mt-12">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={5} 
            blurStrength={10}
            containerClassName="font-display text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase text-foreground m-0"
          >
            {"Let’s\nConnect"}
          </ScrollReveal>
          <p className="text-base font-medium text-foreground/60 max-w-sm mt-4 leading-relaxed">
            Hiring for a product, growth or analytics role—or working on an interesting problem? I’d love to connect.
          </p>
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-start gap-8">
          <a 
            href="mailto:shivamkr026@gmail.com"
            className="flex items-center gap-4 bg-transparent hover:bg-black/5 transition-colors rounded-full p-2 pr-6 border border-black/10"
          >
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold">
              <span className="text-[10px] uppercase tracking-widest">Email</span>
            </div>
            <span className="font-semibold text-xs tracking-wider uppercase text-foreground">shivamkr026@gmail.com</span>
          </a>
          <LiveTime />
        </div>
      </div>

      <div className="w-full md:w-1/2 md:pl-12 lg:pl-24">
        <div className="rounded-[24px] thin-border bg-card-soft p-6 md:p-10">
          <h3 className="text-2xl font-semibold tracking-tight">Have a role or project in mind?</h3>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            Tell me a little about your team, the opportunity and how I can help.
          </p>
          <a
            href="mailto:shivamkr026@gmail.com?subject=Let%27s%20connect"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-foreground text-background font-bold tracking-widest uppercase text-xs px-8 py-5 rounded-[2px] hover:bg-black/80 transition-colors"
          >
            Email me <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-muted">Opens your email app. You can also copy my address and use your preferred inbox.</p>
          <button type="button" onClick={copyEmail} className="mt-5 text-sm font-semibold underline underline-offset-4 py-2">
            Copy email address
          </button>
          <p role="status" className="min-h-6 mt-2 text-sm text-muted">{copyStatus}</p>
        </div>
      </div>

    </section>
  );
}
