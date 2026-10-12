"use client";

import { ScrambleLabel } from "@/components/ui/text-scramble";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { InfoModal } from "@/components/InfoModal";
import { LightBiteVisual, NumeroUnoVisual, ZeptoAssistVisual } from "@/components/ProjectVisuals";

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  timeline: string;
  problem: string;
  execution: string;
  impact: string;
  tags: string[];
  badge: string;
  visualComponent: React.ComponentType;
  deepDive: {
    overview: string;
    sections: { heading: string; content: string }[];
    takeaways: string[];
  };
}

const projects: ProjectItem[] = [
  {
    id: "lightbite",
    title: "LightBite",
    role: "Co-Founder",
    timeline: "Mar 2025 — Aug 2025",
    problem: "Needed a reliable, low-waste operating system to manage perishable inventory across 25+ SKUs while concurrently running daily B2B outreach for a newly founded food venture.",
    execution: "Formulated daily consumption and reorder checklists, standardized vendor delivery SLAs, and iterated menu recipes directly using feedback from customer discovery interviews.",
    impact: "Achieved operational profitability within the early months, maintaining 98%+ order accuracy and serving 300+ unique customers across Bangalore.",
    tags: ["Go-To-Market", "Operations", "Customer Discovery", "P&L Ownership"],
    badge: "Founder Case Study",
    visualComponent: LightBiteVisual,
    deepDive: {
      overview: "LightBite was built from the ground up to solve daily nutrition and meal friction for busy campus and office communities. Running it required wearing multiple hats across inventory, vendor negotiations, and customer front-lines.",
      sections: [
        {
          heading: "01. Operational Framework & Supply Chain",
          content: "Built standardized daily stock reconciliation checklists and minimum reorder points (ROPs) across 25+ perishable SKUs. Negotiated vendor delivery terms to guarantee 98% on-time kitchen fulfillment, keeping food waste below 4%."
        },
        {
          heading: "02. Customer Discovery & Rapid Iteration",
          content: "Conducted over 50 structured in-person customer interviews during the first month. Trimming slower-moving dishes allowed us to focus kitchen capacity on high-margin corporate combo packs and daily subscription orders."
        },
        {
          heading: "03. Unit Economics & Profitability",
          content: "Tracked ingredient unit costs meticulously against B2B price points, ensuring positive unit margins from month one and reaching operational profitability without external capital."
        }
      ],
      takeaways: [
        "Great ideas mean nothing without disciplined execution and vendor reliability.",
        "Listening directly to paying customers on the front line yields better roadmap insights than any abstract hypothesis.",
        "Operating with real P&L constraints builds a rigorous product instinct for prioritizing what genuinely moves the needle."
      ]
    }
  },
  {
    id: "numerouno",
    title: "Numero Uno",
    role: "Digital Marketing Intern",
    timeline: "Dec 2025 — Mar 2026",
    problem: "Client campaigns (including Fit24 and Vitalyears) lacked structured long-tail keyword clustering, reliable GA4 interaction tracking, and systematic creative testing for audience acquisition.",
    execution: "Researched high-intent search clusters, published 16+ on-page SEO optimized articles via WordPress, crafted 7+ visual creatives in Figma/Canva, and supported Meta Ads audience segmentation.",
    impact: "Monitored website engagement trends in GA4 and Google Business Profile, delivering baseline attribution data that guided ongoing content scheduling and paid creative optimization.",
    tags: ["SEO Strategy", "GA4 Analytics", "A/B Testing", "Meta Ads"],
    badge: "Growth & Analytics Case Study",
    visualComponent: NumeroUnoVisual,
    deepDive: {
      overview: "At Numero Uno Marketing, I collaborated with cross-functional growth teams to bridge content creation with data-driven audience measurement for client digital footprints.",
      sections: [
        {
          heading: "01. Search Strategy & Cluster Architecture",
          content: "Identified high-volume, low-competition query clusters in fitness and health. Produced and published 16+ comprehensive, SEO-optimized articles with internal linking structures and meta descriptions on WordPress."
        },
        {
          heading: "02. Visual Creative Iterations",
          content: "Designed 7+ branded visual creatives using Figma and Canva, aligning visual hierarchy with audience interest hooks for organic blogs and social placements."
        },
        {
          heading: "03. GA4 Attribution & Campaign Testing",
          content: "Set up and monitored engagement event tracking inside Google Analytics 4 and Google Business Profile. Supported audience cohort segmentation and creative A/B testing on Meta Ads Manager to track engagement differences."
        }
      ],
      takeaways: [
        "Content velocity must be backed by technical SEO fundamentals and keyword intent mapping.",
        "Analytics is only useful when it translates directly into actionable next steps for creative and content teams.",
        "Clear audience segmentation prevents wasted ad spend and improves organic content relevance."
      ]
    }
  },
  {
    id: "zeptoassist",
    title: "ZeptoAssist AI",
    role: "AI Product Management Case Study",
    timeline: "IIT Roorkee iHUB x Masai",
    problem: "In 10-minute quick-commerce, post-delivery support complaints (missing groceries, wrong replacements, transit spills) flood human support agents, causing high CSAT drops and customer churn risk.",
    execution: "Authored an end-to-end PRD with user journey mapping and risk mitigation matrices. Designed an LLM + RAG triage workflow over order history and store policies, assembling a working functional prototype using Lovable.dev, Claude API, and Make.com.",
    impact: "Formulated a structured experimentation framework: proxy resolution latency reduction, hallucination guardrails, and a multi-phase rollout plan (Shadow verification ➔ 10% canary ➔ Full automated triage).",
    tags: ["AI Product Management", "RAG Architecture", "PRD Writing", "Claude API", "Make.com"],
    badge: "AI Product Case Study",
    visualComponent: ZeptoAssistVisual,
    deepDive: {
      overview: "Completed as an intensive AI Product Management case study through IIT Roorkee iHUB x Masai. The project tackled one of the most critical friction points in quick-commerce: automating post-delivery dispute resolution with high confidence and zero hallucinations.",
      sections: [
        {
          heading: "01. Problem Framing & PRD Development",
          content: "Mapped the dual user journey: the anxious buyer wanting immediate resolution vs. the overwhelmed tier-1 support rep. Wrote comprehensive PRD specifications, edge-case user stories, and acceptance criteria for automated instant credits vs. human escalation."
        },
        {
          heading: "02. RAG & LLM System Architecture",
          content: "Designed a Retrieval-Augmented Generation (RAG) pipeline: customer complaints query the Vector DB containing the order packing checklist, store return SOPs, and delivery timestamps. The Claude API analyzes contextual consistency, outputting confidence scores and deterministic triage actions."
        },
        {
          heading: "03. Interactive Prototype Implementation",
          content: "Assembled a working prototype connecting a Lovable.dev frontend with Make.com webhook automation and the Claude API. Validated end-to-end response times under 30 seconds for routine issues like missing items."
        },
        {
          heading: "04. Risk Mitigation & Rollout Strategy",
          content: "Constructed a strict hallucination prevention policy: any dispute over ₹150 or with ambiguous photographic evidence routes seamlessly to human tier-2 agents with pre-filled context summaries. Designed a phased rollout plan with clear guardrails."
        }
      ],
      takeaways: [
        "AI product features need rigorous guardrails, deterministic policy checks, and graceful human handoffs.",
        "Writing a crisp PRD with clear edge cases is 80% of solving AI agent reliability problems.",
        "Prototyping with tools like Claude API and Make.com bridges the gap between theoretical product specs and functional engineering reality."
      ]
    }
  }
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Sticky layout on desktop handled by Tailwind CSS (`sticky top-32`).
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-14 md:py-24 border-t border-[rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="flex flex-col mb-10 md:mb-24">
        <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold normal-case md:uppercase tracking-normal md:tracking-wider mb-8 self-start bg-black/5 dark:bg-white/10 text-foreground">
          Case Studies & Flagship Work
        </div>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground m-0 max-w-3xl leading-[1.1]"
        >
          Featured Work: Proof of Execution.
        </ScrollReveal>
        <p className="mt-4 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
          From founding a profitable venture to AI product discovery and digital growth, each project reflects structured thinking, metrics, and follow-through.
        </p>
      </div>

      {/* Case Study Cards List */}
      <div className="flex flex-col gap-14 md:gap-40">
        {projects.map((project, index) => {
          const Visual = project.visualComponent;

          return (
            <div key={index} className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start relative">

              {/* Left Column (Sticky on Desktop) */}
              <div className="w-full min-w-0 lg:w-[38%] lg:sticky lg:top-32 flex flex-col gap-4 sm:gap-6">
                <div>
                  <span className="font-sans text-xs md:text-[11px] font-bold normal-case md:uppercase tracking-normal md:tracking-widest text-muted block mb-2">
                    {project.badge}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter normal-case md:uppercase mb-2">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm font-semibold tracking-normal md:tracking-wider normal-case md:uppercase text-foreground/60">
                    {project.role} • {project.timeline}
                  </p>
                </div>

                {/* Skill & Framework Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-black/5 dark:bg-white/10 text-foreground/80 rounded-[2px] font-sans text-xs md:text-[11px] font-semibold tracking-normal md:tracking-wider normal-case md:uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Deep Dive Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex w-full sm:w-auto justify-center min-h-11 items-center gap-2.5 px-6 py-3.5 rounded-[2px] bg-foreground text-background text-xs font-bold normal-case md:uppercase tracking-normal md:tracking-widest hover:opacity-85 transition-opacity cursor-pointer group"
                  >
                    <ScrambleLabel>Read Full Case Study</ScrambleLabel>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 duration-200" />
                  </button>
                </div>
              </div>

              {/* Right Column (Scrolls past) */}
              <div className="w-full min-w-0 lg:w-[62%] flex flex-col gap-4 sm:gap-6 lg:gap-8">

                {/* Interactive Visual Console */}
                <Visual />

                {/* Narrative Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-card-soft p-4 sm:p-6 lg:p-8 rounded-2xl md:rounded-[24px] thin-border">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs md:text-[11px] font-sans font-bold tracking-normal md:tracking-widest normal-case md:uppercase text-muted border-b border-border pb-2">
                      01. The Problem
                    </span>
                    <p className="text-sm md:text-base font-normal text-foreground/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs md:text-[11px] font-sans font-bold tracking-normal md:tracking-widest normal-case md:uppercase text-muted border-b border-border pb-2">
                      02. The Execution
                    </span>
                    <p className="text-sm md:text-base font-normal text-foreground/80 leading-relaxed">
                      {project.execution}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2 pt-3 border-t border-border">
                    <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs md:text-[11px] font-sans font-bold tracking-normal md:tracking-widest normal-case md:uppercase text-muted">
                        03. The Impact & Evidence
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="min-h-11 inline-flex items-center text-xs font-sans font-bold normal-case md:uppercase tracking-normal md:tracking-wider text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        Inspect PRD & Full Notes →
                      </button>
                    </div>
                    <p className="text-base md:text-lg font-medium text-foreground leading-relaxed mt-1">
                      {project.impact}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Obsidian Glass InfoModal */}
      <InfoModal
        wide
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        badge={activeModalProject?.badge || "Case Study"}
        title={activeModalProject?.title || ""}
        detail={
          activeModalProject && (
            <div className="flex flex-col gap-3 text-left font-sans">
              {/* Overview */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="block font-display text-xs md:text-[11px] font-bold normal-case md:uppercase tracking-normal md:tracking-wider text-white/50 mb-1">
                  Executive Summary
                </span>
                <p className="text-sm text-white/85 leading-relaxed">
                  {activeModalProject.deepDive.overview}
                </p>
              </div>

              {/* In-depth Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeModalProject.deepDive.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <h4 className="font-display text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <FileText size={15} className="text-white/60 shrink-0" /> {sec.heading}
                    </h4>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="block font-display text-xs md:text-[11px] font-bold normal-case md:uppercase tracking-normal md:tracking-wider text-white/50 mb-2">
                  Key Retrospective Learnings
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {activeModalProject.deepDive.takeaways.map((item, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                      <CheckCircle2 size={15} className="text-white/70 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeModalProject.id === "zeptoassist" && (
                <p className="text-xs md:text-[11px] font-sans text-white/40 border-t border-white/10 pt-3">
                  * Note: Case study completed under IIT Roorkee iHUB x Masai AI PM training. Focuses on product discovery, RAG system design, and functional prototype validation.
                </p>
              )}
            </div>
          )
        }
      />
    </section>
  );
}
