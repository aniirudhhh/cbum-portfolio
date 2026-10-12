"use client";

import { useEffect, useLayoutEffect, useState, useRef, useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import {
  Search,
  FileText,
  Download,
  ArrowRight,
  Copy,
  Mail,
  ExternalLink,
  Sun,
  Moon,
  Bot,
  Layers,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Check,
  X
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Case Studies" | "Navigation" | "Actions" | "Preferences";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  shortcut?: string;
  action: () => void;
}

const subscribeMounted = () => () => {};

export function CommandPalette() {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const lenis = useLenis();

  // Temporary toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const isNavigatingRef = useRef(false);

  // Commands definition
  const commands: CommandItem[] = useMemo(() => {
    const scrollToSection = (id: string) => {
      isNavigatingRef.current = true;
      setIsOpen(false);
      const l = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
      l?.start();

      requestAnimationFrame(() => {
        if (l) {
          l.scrollTo(`#${id}`, { offset: -40, duration: 1.2 });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 600);
      });
    };

    return [
      // Case Studies
      {
        id: "cs-zepto",
        title: "ZeptoAssist AI",
        subtitle: "Flagship case study · AI product & RAG prototype",
        category: "Case Studies",
        icon: Sparkles,
        action: () => scrollToSection("projects")
      },
      {
        id: "cs-lightbite",
        title: "LightBite",
        subtitle: "Founder case study · 300+ customers",
        category: "Case Studies",
        icon: Layers,
        action: () => scrollToSection("projects")
      },
      {
        id: "cs-numerouno",
        title: "Numero Uno",
        subtitle: "Digital marketing · SEO & growth",
        category: "Case Studies",
        icon: BookOpen,
        action: () => scrollToSection("projects")
      },

      // Navigation
      {
        id: "nav-about",
        title: "About Shivam",
        subtitle: "Personal journey, operating philosophy & metrics",
        category: "Navigation",
        icon: BookOpen,
        action: () => scrollToSection("about")
      },
      {
        id: "nav-experience",
        title: "Experience & Roles",
        subtitle: "Numero Uno, Jyothi Wood & LightBite founder",
        category: "Navigation",
        icon: Briefcase,
        action: () => scrollToSection("experience")
      },
      {
        id: "nav-education",
        title: "Academic Background",
        subtitle: "BBA Data Analytics & Marketing • CGPA 7.85",
        category: "Navigation",
        icon: GraduationCap,
        action: () => scrollToSection("education")
      },
      {
        id: "nav-certifications",
        title: "Certifications",
        subtitle: "IIT Roorkee AI PM & Google Analytics 4",
        category: "Navigation",
        icon: Award,
        action: () => scrollToSection("education")
      },
      {
        id: "nav-toolkit",
        title: "Toolkit & Methods",
        subtitle: "PRD, RAG, GA4, Meta Ads, Figma, Jira",
        category: "Navigation",
        icon: Wrench,
        action: () => scrollToSection("toolkit")
      },
      {
        id: "nav-contact",
        title: "Contact & Connect",
        subtitle: "Send a message or open direct inquiry",
        category: "Navigation",
        icon: Mail,
        action: () => scrollToSection("contact")
      },
      {
        id: "nav-top",
        title: "Back to Top",
        subtitle: "Return to beginning of portfolio",
        category: "Navigation",
        icon: ArrowRight,
        action: () => scrollToSection("hero")
      },

      // Quick Actions
      {
        id: "act-view-resume", title: "View résumé", subtitle: "Open Shivam’s résumé as a PDF", category: "Actions", icon: FileText,
        action: () => { setIsOpen(false); window.open("/shivam-resume.pdf", "_blank", "noopener,noreferrer"); }
      },
      {
        id: "act-download-resume", title: "Download résumé", subtitle: "Save a PDF copy", category: "Actions", icon: Download,
        action: () => {
          setIsOpen(false);
          const link = document.createElement("a");
          link.href = "/shivam-resume.pdf";
          link.download = "Shivam-Resume.pdf";
          document.body.appendChild(link); link.click(); link.remove();
        }
      },
      {
        id: "act-copy-email",
        title: "Copy Email Address",
        subtitle: "shivamkr026@gmail.com",
        category: "Actions",
        icon: Copy,
        action: async () => {
          setIsOpen(false);
          try {
            await navigator.clipboard.writeText("shivamkr026@gmail.com");
            showToast("Copied shivamkr026@gmail.com to clipboard ✨");
          } catch {
            showToast("Email: shivamkr026@gmail.com");
          }
        }
      },
      {
        id: "act-email",
        title: "Send an Email",
        subtitle: "Opens your default email client",
        category: "Actions",
        icon: Mail,
        action: () => {
          setIsOpen(false);
          window.location.href = "mailto:shivamkr026@gmail.com?subject=Let%27s%20connect";
        }
      },
      {
        id: "act-linkedin",
        title: "View LinkedIn Profile",
        subtitle: "linkedin.com/in/shivamkr026",
        category: "Actions",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://linkedin.com/in/shivamkr026", "_blank", "noopener,noreferrer");
        }
      },
      {
        id: "act-astra",
        title: "Interact with Astra AI",
        subtitle: "Interact with the 3D companion",
        category: "Actions",
        icon: Bot,
        action: () => {
          setIsOpen(false);
          const companion = document.querySelector(".robot-about") as HTMLElement | null;
          if (companion) {
            companion.click();
          } else {
            scrollToSection("hero");
          }
        }
      },

      // Preferences
      {
        id: "pref-theme-toggle",
        title: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        subtitle: `Currently in ${resolvedTheme || "system"} theme`,
        category: "Preferences",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          showToast(`Theme changed to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`);
        }
      }
    ];
  }, [resolvedTheme, setTheme, lenis]);

  // Filter commands by search term
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const term = search.toLowerCase().trim();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(term) ||
        cmd.category.toLowerCase().includes(term) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(term))
    );
  }, [commands, search]);

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Restore background scroll before the closed overlay can paint.
  useLayoutEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);

      const l = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
      const savedScroll = window.scrollY;
      l?.stop();

      const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 40);

      return () => {
        window.clearTimeout(timer);
        l?.start();
        if (!isNavigatingRef.current) {
          if (l && typeof savedScroll === "number") {
            l.scrollTo(savedScroll, { immediate: true, force: true });
          } else if (typeof window !== "undefined") {
            window.scrollTo({ top: savedScroll, behavior: "instant" });
          }
        }
      };
    }
  }, [isOpen, lenis]);

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Auto-scroll list when keyboard navigating
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-command-item="${selectedIndex}"]`);
    if (activeEl) {
      const list = listRef.current;
      const listBounds = list.getBoundingClientRect();
      const itemBounds = activeEl.getBoundingClientRect();
      if (itemBounds.top < listBounds.top) {
        list.scrollTop -= listBounds.top - itemBounds.top;
      } else if (itemBounds.bottom > listBounds.bottom) {
        list.scrollTop += itemBounds.bottom - listBounds.bottom;
      }
    }
  }, [selectedIndex, isOpen]);

  // Handle arrow navigation and enter
  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Toast Notification */}
      {/* Toast Notification */}
      {toastMessage &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full bg-[#121215]/95 text-white border border-white/15 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-xs font-sans font-medium tracking-wide animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <Check size={13} className="text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>,
          document.body
        )}

      {/* Clean Luxury Command Palette Modal */}
      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            data-lenis-prevent
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[8dvh] sm:pt-[15dvh] px-3 pb-3 sm:px-4 overscroll-contain font-sans"
            onKeyDown={handlePaletteKeyDown}
          >
            {/* Dark Frosted Backdrop */}
            <div
              data-lenis-prevent
              className="fixed inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-sm transition-opacity overscroll-contain"
              onClick={() => setIsOpen(false)}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              aria-hidden="true"
            />

            {/* Clean Obsidian Glass Palette Card */}
            <div
              data-lenis-prevent
              className="command-palette-card relative w-full max-w-xl max-h-[min(640px,80dvh)] bg-[#101016]/95 text-white rounded-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.14)] overflow-hidden flex flex-col backdrop-blur-2xl overscroll-contain font-sans"
              style={{ animation: "paletteIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              {/* Clean Search Input Bar */}
              <div className="flex items-center px-5 py-5 border-b border-white/10 gap-3.5 bg-white/[0.02]">
                <Search size={20} className="text-violet-300/80 shrink-0" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  aria-label="Search commands and sections"
                  placeholder="Where would you like to go?"
                  className="command-palette-input w-full bg-transparent text-base text-white placeholder:text-white/45 font-sans font-medium tracking-tight"
                  style={{
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    WebkitAppearance: "none",
                  }}
                />
                {search && (
                  <button type="button" onClick={() => { setSearch(""); setSelectedIndex(0); inputRef.current?.focus({ preventScroll: true }); }}
                    className="p-2 rounded-lg text-white/50 hover:bg-white/10 hover:text-white cursor-pointer" aria-label="Clear search">
                    <X size={15} />
                  </button>
                )}
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close command palette"
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] text-white/55 hover:bg-white/10 hover:text-white cursor-pointer">
                  <span className="hidden sm:inline">Esc</span><X size={16} className="sm:hidden" />
                </button>
              </div>

              {/* Clean Command Items List */}
              <div
                ref={listRef}
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="min-h-0 flex-1 max-h-[420px] overflow-y-auto overscroll-contain p-2.5 scrollbar-thin space-y-1"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                    <span className="text-xs text-white/40 font-mono tracking-wider uppercase mb-1">
                      No results found
                    </span>
                    <p className="text-xs text-white/25">
                      Try searching for &quot;Zepto&quot;, &quot;LightBite&quot;, &quot;Email&quot;, or &quot;Theme&quot;.
                    </p>
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = selectedIndex === idx;

                    // Clean category separator when not searching
                    const prevCmd = filteredCommands[idx - 1];
                    const showCategoryHeader = !search.trim() && (!prevCmd || prevCmd.category !== cmd.category);

                    return (
                      <div key={cmd.id}>
                        {showCategoryHeader && (
                          <div className="px-3.5 pt-5 pb-2 text-[10px] uppercase font-semibold tracking-[0.14em] text-white/50">
                            {cmd.category}
                          </div>
                        )}
                        <button
                          type="button"
                          aria-label={cmd.title}
                          data-command-item={idx}
                          onClick={() => cmd.action()}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`group w-full text-left px-3 py-3 rounded-xl border transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-violet-400 ${
                            isSelected
                              ? "bg-violet-400/[0.12] border-violet-400/25 text-white shadow-[inset_3px_0_0_rgba(167,139,250,0.8)]"
                              : "border-transparent text-white/70 hover:bg-white/[0.04]"
                          }`}
                        >
                          {/* Left: Minimal Icon + Title + Subtitle */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected ? "bg-violet-400/15 text-violet-200" : "bg-white/5 text-white/55"
                              }`}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span
                                className={`font-sans text-sm tracking-tight truncate leading-tight ${
                                  isSelected ? "font-semibold text-white" : "font-semibold text-white/85"
                                }`}
                              >
                                {cmd.title}
                              </span>
                              {cmd.subtitle && (
                                <span
                                  className={`font-sans text-[11px] truncate mt-0.5 tracking-normal ${
                                    isSelected ? "text-white/65 font-normal" : "text-white/50 font-normal"
                                  }`}
                                >
                                  {cmd.subtitle}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right: Clean Keycap or subtle arrow */}
                          <div className="flex items-center gap-2 shrink-0">
                            {cmd.id === "act-linkedin" ? (
                              <ExternalLink size={14} className="text-white/45" />
                            ) : isSelected ? (
                              <kbd className="hidden sm:block text-xs px-1.5 py-0.5 rounded border border-violet-300/20 bg-violet-300/10 text-violet-200">↵</kbd>
                            ) : (
                              <ArrowRight size={14} className="text-white/20" />
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="shrink-0 px-5 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/45">
                <div className="flex items-center gap-4">
                  <span><span className="text-white/70 mr-1.5">↑ ↓</span> Navigate</span>
                  <span><span className="text-white/70 mr-1.5">↵</span> Open</span>
                </div>
                <span>{filteredCommands.length} {filteredCommands.length === 1 ? "result" : "results"}</span>
              </div>
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
              .command-palette-card,
              .command-palette-card input,
              .command-palette-card button,
              .command-palette-card kbd,
              .command-palette-card span {
                font-family: var(--font-sans);
              }
              .command-palette-card .font-display {
                font-family: var(--font-display);
              }
              .command-palette-input,
              .command-palette-input:focus,
              .command-palette-input:focus-visible,
              .command-palette-input:active {
                outline: none !important;
                outline-offset: 0 !important;
                box-shadow: none !important;
                border: none !important;
                -webkit-tap-highlight-color: transparent !important;
              }
              @media (prefers-reduced-motion: reduce) {
                .command-palette-card { animation: none !important; }
              }
              @keyframes paletteIn {
                from { opacity: 0; transform: translateY(-6px) scale(0.99); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
            `
            }} />
          </div>,
          document.body
        )}
    </>
  );
}

// Global trigger helper
export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
}
