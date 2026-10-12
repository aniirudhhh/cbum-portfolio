"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sliders, ShieldCheck, Cpu, Terminal } from "lucide-react";

// =========================================================================
// 01. LightBite — Operations & Inventory Ledger (Authentic Swiss Layout)
// =========================================================================
export function LightBiteVisual() {
  const [selectedSpec, setSelectedSpec] = useState<"supply" | "inventory">("supply");

  return (
    <div className="w-full min-w-0 bg-[#0E0E10] text-white rounded-2xl md:rounded-[24px] border border-white/10 p-4 sm:p-6 xl:p-8 flex flex-col justify-between shadow-2xl relative select-none font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-white/50 block mb-1">
            FIG. 01 — OPERATIONS & SUPPLY LEDGER
          </span>
          <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-white uppercase">
            LightBite Operational Matrix
          </h4>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-sans tracking-wider text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            BANGALORE • PROFITABLE P&L
          </span>
        </div>
      </div>

      {/* Hero Metric Ledger (Clean tabular numbers) */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 py-6 border-b border-white/10">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            01. Total Volume
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            300+
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            Unique customers served
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            02. SKU Catalog
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            25+
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            Active managed SKUs
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            03. Spoilage Rate
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            &lt; 4%
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            Waste via reorder ROP
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            04. Fulfillment SLA
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            98.4%
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            On-time order dispatch
          </span>
        </div>
      </div>

      {/* Operational Architecture Schematic */}
      <div className="py-6 border-b border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50 font-sans uppercase tracking-wider">
          <span>Supply Chain Workflow</span>
          <span>End-to-End Cycle</span>
        </div>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-2">
          {[
            { step: "01", title: "Procurement", desc: "Local vendor orders locked daily by 06:00 AM." },
            { step: "02", title: "Inventory Audit", desc: "Stock count against standardized consumption sheet." },
            { step: "03", title: "Prep & Portion", desc: "Standardized recipes to maintain unit margins." },
            { step: "04", title: "B2B Dispatch", desc: "Campus & corporate accounts fulfilled on schedule." },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] font-bold text-white/40 block mb-1">
                  {item.step}
                </span>
                <span className="font-display text-xs font-bold uppercase tracking-tight text-white block mb-1">
                  {item.title}
                </span>
                <p className="text-xs text-white/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-dive Spec Switcher */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={selectedSpec === "supply"}
            onClick={() => setSelectedSpec("supply")}
            className={`min-h-11 px-3 py-2 rounded-lg font-sans uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
              selectedSpec === "supply"
                ? "bg-white text-black font-bold"
                : "bg-white/[0.05] text-white/60 hover:text-white"
            }`}
          >
            Supply Controls
          </button>
          <button
            type="button"
            aria-pressed={selectedSpec === "inventory"}
            onClick={() => setSelectedSpec("inventory")}
            className={`min-h-11 px-3 py-2 rounded-lg font-sans uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
              selectedSpec === "inventory"
                ? "bg-white text-black font-bold"
                : "bg-white/[0.05] text-white/60 hover:text-white"
            }`}
          >
            SKU Category Breakdown
          </button>
        </div>

        <span className="font-sans text-[11px] text-white/40">
          {selectedSpec === "supply"
            ? "Protocol: Daily Reorder Point (ROP) + Minimum Batch Size"
            : "Menu: 4 Core Categories across 25+ Active SKUs"}
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 02. Numero Uno — Search & Attribution Architecture
// =========================================================================
export function NumeroUnoVisual() {
  const [activeStream, setActiveStream] = useState<"fit24" | "vitalyears">("fit24");

  return (
    <div className="w-full min-w-0 bg-[#0E0E10] text-white rounded-2xl md:rounded-[24px] border border-white/10 p-4 sm:p-6 xl:p-8 flex flex-col justify-between shadow-2xl relative select-none font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-white/50 block mb-1">
            FIG. 02 — SEARCH & ATTRIBUTION MATRIX
          </span>
          <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-white uppercase">
            Numero Uno Digital Marketing Operations
          </h4>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-sans tracking-wider text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            GA4 & META ADS ATTRIBUTION
          </span>
        </div>
      </div>

      {/* Hero Metric Ledger */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 py-6 border-b border-white/10">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            01. Content Produced
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            16+
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            SEO-optimized articles
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            02. Creative Assets
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            7+
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            Figma & Canva visuals
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            03. Core Clients
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            02
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            Fit24 & Vitalyears
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1">
            04. Tracking Tools
          </span>
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
            GA4
          </span>
          <span className="text-xs text-white/60 mt-1 font-medium">
            & Google Business Profile
          </span>
        </div>
      </div>

      {/* Campaign Streams Architecture */}
      <div className="py-6 border-b border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50 font-sans uppercase tracking-wider">
          <span>Client Execution Streams</span>
          <span>Click to Inspect Strategy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            onClick={() => setActiveStream("fit24")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStream === "fit24"
                ? "bg-white/[0.06] border-white/30"
                : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/50">
                STREAM A • FITNESS & WELLNESS
              </span>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-white/10 text-white">
                8 Articles
              </span>
            </div>
            <h5 className="font-display text-sm md:text-base font-bold text-white mb-1 uppercase">
              Fit24 SEO & On-Page Campaign
            </h5>
            <p className="text-xs text-white/65 leading-relaxed">
              Targeted high-intent local fitness queries. Structured keyword clusters in WordPress, crafted metadata, and designed social visual banners.
            </p>
          </div>

          <div
            onClick={() => setActiveStream("vitalyears")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStream === "vitalyears"
                ? "bg-white/[0.06] border-white/30"
                : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/50">
                STREAM B • EARLY EDUCATION
              </span>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-white/10 text-white">
                8 Articles
              </span>
            </div>
            <h5 className="font-display text-sm md:text-base font-bold text-white mb-1 uppercase">
              Vitalyears Organic Search Series
            </h5>
            <p className="text-xs text-white/65 leading-relaxed">
              Researched long-tail informational keywords for child development. Monitored organic search user paths and bounce rates in Google Analytics 4.
            </p>
          </div>
        </div>
      </div>

      {/* Attribution Footer */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="font-sans text-[11px] text-white/50">
          Workflow: Keyword Clustering ➔ Content Production ➔ Creative Testing ➔ GA4 Attribution
        </span>
        <span className="font-sans text-[11px] text-white/40">
          Dec 2025 — Mar 2026
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 03. ZeptoAssist AI — System Architecture & PRD Spec (Technical & Authentic)
// =========================================================================
export function ZeptoAssistVisual() {
  const [activeNode, setActiveNode] = useState<number>(1);

  const nodes = [
    {
      id: 0,
      code: "IN-01",
      name: "Ticket Ingestion",
      layer: "Client & Webhook Layer",
      spec: "Triggered upon post-delivery complaint (Missing or damaged items in 10-min quick commerce order). Ingests Order ID, store metadata, and customer claim text.",
      technical: "Webhook payload: { order_id, user_claim, timestamp, photo_url }"
    },
    {
      id: 1,
      code: "RAG-02",
      name: "Context Retrieval (RAG)",
      layer: "Vector & Policy Store",
      spec: "Retrieves order manifest (SKUs, quantities), store refund SOP, and customer account dispute frequency to establish verifiable context before LLM prompting.",
      technical: "Vector match: Embedding similarity over Return Policy & Order Checklist"
    },
    {
      id: 2,
      code: "LLM-03",
      name: "Claude Decision Engine",
      layer: "Inference & Guardrail Layer",
      spec: "Contextual reasoning evaluates claim plausibility against order constraints. Hallucination filter verifies claim matches retrieved SKUs before producing confidence score.",
      technical: "Evaluation metrics: Confidence >= 0.90, deterministic action output"
    },
    {
      id: 3,
      code: "ACT-04",
      name: "Automated Resolution",
      layer: "Execution & Escalation",
      spec: "Tiered action router: Low-value disputes (<= ₹150) receive automated instant wallet credit. High-value or ambiguous claims route to human agent with pre-populated PRD context.",
      technical: "Outcome: Instant credit vs. Human Hand-off with pre-filled context"
    }
  ];

  return (
    <div className="w-full min-w-0 bg-[#0E0E10] text-white rounded-2xl md:rounded-[24px] border border-white/10 p-4 sm:p-6 xl:p-8 flex flex-col justify-between shadow-2xl relative select-none font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-white/50 block mb-1">
            FIG. 03 — AI SYSTEM ARCHITECTURE & PRD SPECIFICATION
          </span>
          <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-white uppercase">
            ZeptoAssist Quick-Commerce Support Triage
          </h4>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-sans tracking-wider text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            IIT ROORKEE iHUB × MASAI CASE STUDY
          </span>
        </div>
      </div>

      {/* Interactive System Pipeline Schematics */}
      <div className="py-6 border-b border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50 font-sans uppercase tracking-wider">
          <span>RAG Pipeline Architecture</span>
          <span>Select Node to Inspect PRD Spec</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveNode(node.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white text-black border-white shadow-lg"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06]"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className={`font-sans text-[10px] font-bold ${isSelected ? "text-black/60" : "text-white/40"}`}>
                      {node.code}
                    </span>
                    <span className={`text-[9px] font-sans uppercase px-1.5 py-0.5 rounded ${
                      isSelected ? "bg-black/10 text-black font-semibold" : "bg-white/10 text-white/60"
                    }`}>
                      Stage {node.id + 1}
                    </span>
                  </div>
                  <h6 className={`font-display text-xs md:text-sm font-bold uppercase tracking-tight leading-snug mb-1 ${
                    isSelected ? "text-black" : "text-white"
                  }`}>
                    {node.name}
                  </h6>
                </div>
                <span className={`text-[10px] font-sans mt-3 ${isSelected ? "text-black/70" : "text-white/40"}`}>
                  {node.layer}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRD Specification Inspector Terminal */}
      <div className="py-5 border-b border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-white/50">
          <span className="flex items-center gap-2 text-white font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            NODE SPECIFICATION: {nodes[activeNode].name} ({nodes[activeNode].code})
          </span>
          <span>Layer: {nodes[activeNode].layer}</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40">
            PRD Functional Requirement
          </span>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans">
            {nodes[activeNode].spec}
          </p>
          <div className="mt-2 pt-2 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-sans text-white/50">
            <span>Protocol Implementation:</span>
            <span className="text-white/80 min-w-0 [overflow-wrap:anywhere]">{nodes[activeNode].technical}</span>
          </div>
        </div>
      </div>

      {/* Footer Specs */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="font-sans text-[11px] text-white/50">
          Prototype Stack: Lovable.dev • Claude API • Make.com Webhooks
        </span>
        <span className="font-sans text-[11px] text-white/40">
          AI Product Management Case Study & Prototype
        </span>
      </div>
    </div>
  );
}
