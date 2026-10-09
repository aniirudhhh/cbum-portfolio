"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current || !linksRef.current || !footerRef.current) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      
      // Open animation: Dropdown curtain effect
      gsap.to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });
      
      // Stagger reveal links
      gsap.fromTo(
        linksRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
      
      // Reveal menu footer/socials
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 }
      );
    } else {
      document.body.style.overflow = "auto";
      
      // Close animation
      gsap.to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled && !isOpen ? 'bg-background/90 backdrop-blur-md py-3 md:py-4 shadow-sm' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-[1480px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2 z-50">
            <span className={`font-bold text-lg tracking-tight transition-colors duration-500 ${isOpen ? 'text-[#F7F7F5]' : 'text-foreground'}`}>
              SHIVAM
            </span>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-medium tracking-tight">
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#expertise" className="hover:opacity-60 transition-opacity">Expertise</a>
            <a href="#experience" className="hover:opacity-60 transition-opacity">Experience</a>
            <a href="#education" className="hover:opacity-60 transition-opacity">Education</a>
          </div>

          {/* Right: Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4 z-50">
            <a href="#contact" className="hidden sm:inline-flex px-5 py-2 rounded-full thin-border text-sm font-semibold tracking-tight hover:bg-foreground hover:text-white transition-colors">
              Let&apos;s Talk
            </a>
            
            {/* Minimalist Hamburger Button */}
            <button 
              className="md:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10 group"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <span className={`block h-[2px] transition-all duration-500 ease-in-out ${isOpen ? 'w-6 bg-[#F7F7F5] rotate-45 translate-y-[7px]' : 'w-6 bg-foreground group-hover:w-4'}`} />
              <span className={`block h-[2px] transition-all duration-500 ease-in-out ${isOpen ? 'w-6 bg-[#F7F7F5] opacity-0' : 'w-4 bg-foreground group-hover:w-6'}`} />
              <span className={`block h-[2px] transition-all duration-500 ease-in-out ${isOpen ? 'w-6 bg-[#F7F7F5] -rotate-45 -translate-y-[7px]' : 'w-6 bg-foreground group-hover:w-4'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Dark Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#111111] text-[#F7F7F5] z-40 flex flex-col justify-between px-6 sm:px-12 pt-20 md:pt-24 pb-8 overflow-y-auto"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="flex flex-col gap-4 sm:gap-6 mt-4 md:mt-0" ref={linksRef}>
          <a href="#about" onClick={closeMenu} className="text-[2.5rem] leading-none sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/50 transition-colors">About</a>
          <a href="#expertise" onClick={closeMenu} className="text-[2.5rem] leading-none sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/50 transition-colors">Expertise</a>
          <a href="#experience" onClick={closeMenu} className="text-[2.5rem] leading-none sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/50 transition-colors">Experience</a>
          <a href="#education" onClick={closeMenu} className="text-[2.5rem] leading-none sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/50 transition-colors">Education</a>
          <a href="#contact" onClick={closeMenu} className="text-[2.5rem] leading-none sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-white/50 transition-colors mt-2 md:mt-4">Contact</a>
        </div>

        <div ref={footerRef} className="flex justify-center items-center border-t border-white/10 pt-6 mt-6 md:mt-12 shrink-0">
          <a href="#contact" onClick={closeMenu} className="w-full text-center py-4 rounded-full border border-white/20 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
            Talk Now
          </a>
        </div>
      </div>
    </>
  );
}
