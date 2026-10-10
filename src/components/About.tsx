"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { metrics } from "@/data/portfolio";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { X, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";

const aboutData = [
  {
    id: 1,
    title: "What shaped me",
    short: "Co-founding LightBite put me close to the customer and the everyday realities of running a business. Working with vendors, managing stock and serving customers taught me to consider both the idea and what it takes to deliver it.",
    detail: "Building LightBite from the ground up forced me to wear multiple hats. I handled everything from vendor negotiations and inventory management to directly serving our customers. This hands-on experience taught me that a great idea is only as good as its execution. It gave me a deep appreciation for the operational realities behind a product and the importance of truly listening to user feedback on the front lines."
  },
  {
    id: 2,
    title: "How I work",
    short: "I like turning an unclear problem into manageable steps: understand who it affects, look at the evidence and choose a practical next action. I value following through and learning from what happens next.",
    detail: "My methodology is rooted in pragmatism and data. When faced with an ambiguous challenge, my first step is to break it down. I focus on identifying the core user segments affected, gather quantitative and qualitative evidence, and formulate a practical hypothesis. I strongly believe in iterative development: deploying a solution, measuring its real-world impact, and learning from the outcome to drive continuous improvement."
  },
  {
    id: 3,
    title: "Where I want to contribute",
    short: "I’m interested in product, growth and analytics roles where I can bring my business experience to real customer problems, contribute to a team and keep developing my product skills.",
    detail: "I am actively seeking roles where I can leverage my unique blend of entrepreneurial hustle and analytical rigor. Whether it's optimizing user funnels, leading product discovery, or translating data into actionable growth strategies, I want to tackle real customer problems. I thrive in collaborative environments where cross-functional teams work together to build products that not only make business sense but also genuinely improve users' lives."
  }
];

const subscribeMounted = () => () => {};

export function About() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  useEffect(() => {
    if (activeModal === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

  const activeItem = aboutData.find(item => item.id === activeModal);

  return (
    <section id="about" className="py-14 md:py-24 flex flex-col gap-10 md:gap-16 border-t border-[rgba(0,0,0,0.08)] mt-4 md:mt-12">
      {/* Top Split */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider mb-8 bg-black/5 dark:bg-white/10 text-foreground">
            About Me
          </div>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="text-4xl md:text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-lg text-foreground m-0"
          >
            I like finding the point where users, data and business meet.
          </ScrollReveal>
        </div>

        <div className="w-full md:w-1/2 md:pt-16">
          <p className="text-lg font-medium text-foreground/80 leading-relaxed max-w-md">
            I’ve co-founded a food venture and worked across digital marketing and operations. With a background in Marketing and Data Analytics, I bring customer understanding, analytical thinking and hands-on execution to product and growth problems.
          </p>
        </div>
      </div>

      {/* Personal Background & Metrics Split */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <div className="w-full md:w-[65%] lg:w-[70%] bg-card-soft thin-border rounded-2xl md:rounded-[24px] flex flex-col overflow-hidden">
          {aboutData.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className={`group cursor-pointer p-4 md:p-10 transition-colors hover:bg-black/5 dark:hover:bg-white/5 relative ${
                idx !== aboutData.length - 1 ? 'border-b border-black/10 dark:border-white/10' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight size={14} className="text-foreground" />
                </div>
              </div>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl transition-colors">
                {item.short}
              </p>
            </div>
          ))}
        </div>

        {/* Metrics Column */}
        <div className="w-full md:w-[35%] lg:w-[30%] grid grid-cols-3 gap-3 md:flex md:flex-col md:gap-8 justify-center">
          {metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex flex-col">
              <AnimatedCounter
                value={metric.value}
                className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-2"
              />
              <p className="text-xs md:text-sm font-medium text-muted max-w-[200px] leading-tight">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Portal */}
      {mounted && activeItem && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />
          <div
            className="relative w-full max-w-2xl bg-blue-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden shadow-blue-900/20"
            style={{ animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Decorative background circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                {activeItem.title}
              </h2>
              <div className="w-12 h-1 bg-white/20 mb-8 rounded-full" />
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-blue-50">
                {activeItem.detail}
              </p>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes modalSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}} />
        </div>,
        document.body
      )}
    </section>
  );
}
