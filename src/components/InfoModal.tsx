"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  detail: React.ReactNode;
  badge?: string;
  wide?: boolean;
}

const subscribeMounted = () => () => {};

export function InfoModal({ isOpen, onClose, title, detail, badge, wide = false }: InfoModalProps) {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const lenis = useLenis();
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const l = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
    const savedScroll = window.scrollY;
    l?.stop();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      l?.start();
      if (l && typeof savedScroll === "number") {
        l.scrollTo(savedScroll, { immediate: true, force: true });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: savedScroll, behavior: "instant" });
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overscroll-contain font-sans"
      data-lenis-prevent
    >
      {/* Frosted Dark Backdrop Overlay */}
      <div
        data-lenis-prevent
        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md transition-opacity duration-300 overscroll-contain"
        onClick={onClose}
        onWheel={(e) => {
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true"
      />

      {/* Obsidian Frosted Glass Card (Scrollable, Isolated from Background) */}
      <div
        data-lenis-prevent
        onWheel={(e) => {
          e.stopPropagation();
        }}
        className={`relative w-full ${wide ? "max-w-5xl max-h-[90dvh] sm:max-h-[82dvh]" : "max-w-2xl max-h-[88dvh]"} overflow-hidden flex flex-col overscroll-contain bg-[#0d0d0e]/95 dark:bg-[#0a0a0b]/98 text-white rounded-[26px] sm:rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.18)]`}
        style={{ animation: "obsidianModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Subtle Ambient Specular Highlights */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[360px] h-[180px] bg-gradient-to-b from-white/[0.08] to-transparent rounded-full blur-2xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -right-28 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer z-20 group active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} className="transition-transform group-hover:rotate-90 duration-200" />
        </button>

        {/* Content Container */}
        <div className={`info-modal-content relative z-10 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain flex flex-col ${wide ? "p-4 pt-6 sm:p-8" : "p-6 sm:p-10 md:p-12"} [overflow-wrap:anywhere]`}
          data-lenis-prevent>
          {badge && (
            <div className="self-start px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-white/70 mb-3 max-w-[calc(100%-3rem)]">
              {badge}
            </div>
          )}

          <h2 className="font-display text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight text-white mb-4 pr-10">
            {title}
          </h2>

          <div className="w-10 h-[2px] bg-white/20 mb-4 rounded-full" />

          <div className="font-sans text-base sm:text-lg font-normal leading-relaxed text-white/80 space-y-4">
            {detail}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .info-modal-content { scrollbar-width: none; }
        .info-modal-content::-webkit-scrollbar { display: none; }
        @keyframes obsidianModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `
      }} />
    </div>,
    document.body
  );
}
