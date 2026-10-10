"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  detail: React.ReactNode;
}

const subscribeMounted = () => () => {};

export function InfoModal({ isOpen, onClose, title, detail }: InfoModalProps) {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl bg-blue-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden shadow-blue-900/20"
        style={{ animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            {title}
          </h2>
          <div className="w-12 h-1 bg-white/20 mb-8 rounded-full" />
          <div className="text-lg sm:text-xl font-medium leading-relaxed text-blue-50">
            {detail}
          </div>
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
  );
}
