"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  function closeMenu() {
    menuRef.current?.close();
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (desktop.matches) menuRef.current?.close(); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen, lenis]);

  return (
    <>
      <nav aria-label="Main navigation" className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md py-3 md:py-4 shadow-sm" : "bg-transparent py-4 md:py-8"}`}>
        <div className="max-w-[1480px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <a href="#hero" aria-label="Shivam — home" className="font-bold text-lg tracking-tight">SHIVAM</a>
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-medium">
            {links.map(link => <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">{link.label}</a>)}
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-flex items-center justify-center bg-foreground text-background font-bold tracking-widest uppercase text-xs px-6 py-3 rounded-[2px] hover:bg-black/80 transition-colors">Let&apos;s Talk</a>
            <button ref={toggleRef} type="button" aria-label="Open menu" aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => { menuRef.current?.showModal(); setIsOpen(true); }} className="md:hidden flex flex-col justify-center items-end gap-[5px] w-11 h-11">
              <span className="h-0.5 w-6 bg-foreground" />
              <span className="h-0.5 w-4 bg-foreground" />
              <span className="h-0.5 w-6 bg-foreground" />
            </button>
          </div>
        </div>
      </nav>
      <dialog ref={menuRef} id="mobile-menu" aria-label="Navigation menu" data-lenis-prevent onClose={() => { setIsOpen(false); toggleRef.current?.focus(); }} className="mobile-menu bg-[#111111] text-[#F7F7F5] p-6 sm:p-12">
        <div className="flex items-center justify-between mb-12">
          <span className="font-bold text-lg">SHIVAM</span>
          <button type="button" onClick={closeMenu} className="min-h-11 px-3 font-semibold">Close ✕</button>
        </div>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-6">
          {[...links, { href: "#contact", label: "Contact" }].map(link => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="text-4xl sm:text-5xl font-black uppercase tracking-tighter hover:text-white/60">{link.label}</a>
          ))}
        </nav>
      </dialog>
    </>
  );
}
