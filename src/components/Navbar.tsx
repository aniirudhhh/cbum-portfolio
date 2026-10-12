"use client";

import { NavbarWordmark } from "@/components/NavbarWordmark";
import { ScrambleLabel } from "@/components/ui/text-scramble";

import { useEffect, useState } from "react";
import { KineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { openCommandPalette } from "@/components/CommandPalette";
import { Search } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav aria-label="Main navigation" className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md py-3 md:py-4 shadow-sm" : "bg-transparent py-4 md:py-8"}`}>
        <div className="max-w-[1480px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <NavbarWordmark />
          <div className="flex items-center gap-3 md:gap-4">
            {/* Quick Command Palette Trigger */}
            <button
              type="button"
              onClick={() => openCommandPalette()}
              aria-label="Open command palette"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-black/5 dark:border-white/10 text-xs text-foreground/70 hover:text-foreground transition-all cursor-pointer"
            >
              <Search size={12} className="text-muted" />
              <span className="hidden lg:inline text-[11px] font-sans"><ScrambleLabel>Search</ScrambleLabel></span>
              <kbd className="font-sans font-medium text-[10px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-foreground/70 border border-black/5 dark:border-white/10">⌘K</kbd>
            </button>

            <KineticNavigation />
          </div>
        </div>
      </nav>

    </>
  );
}
