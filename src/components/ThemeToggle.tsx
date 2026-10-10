"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import gsap from "gsap";

const subscribeMounted = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!mounted) {
    return <div className="inline-flex px-5 py-3" />;
  }

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" }
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <MagneticButton className="inline-flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center px-5 py-3 rounded-[2px] bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-xs font-bold uppercase tracking-widest text-foreground"
          aria-label="Toggle theme"
          aria-expanded={isOpen}
        >
          Theme
        </button>
      </MagneticButton>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 md:left-auto md:right-0 mt-2 w-36 rounded-xl bg-background/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden z-50 origin-top-right"
        >
          <div className="p-1 flex flex-col gap-1">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  setTheme(t.name);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  theme === t.name
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <t.icon size={14} className={theme === t.name ? "text-background" : "text-foreground/70"} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
