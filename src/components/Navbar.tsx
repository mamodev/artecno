"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = ["projects", "services", "about", "contact"];

export default function Navbar() {
  const logoUrl = "https://lh3.googleusercontent.com/sitesv/AA5AbUAtaLG09NoAht1g3-uay_TTB-HLP4DVGuPVbWW-ewYOzFqLsg9Z-v-iJVQ5aDRdAqaEK-xbQ1g9YnQeMdsrQkpBHCxK_I0_FFCZZvIjYQvWlF29Jpy0Ugd-xxwtzC-um75-LFkD-5s0lWs3LWF_c9rDIkVxnro4eygsZY-iO1GeyFuRYkv19xZD_D76iBjsrLS6j9a1qQqBOaHf-5rEHOrZnBDoCZoCEKEnpiw=w1280";
  
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
  const borderBottomWidth = useTransform(scrollY, [0, 100], ["0px", "4px"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0 0px 0 0 rgba(0,0,0,0)", "0 6px 0 0 rgba(0,0,0,1)"]);
  const paddingY = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navItems.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav 
      style={{
        backgroundColor,
        borderBottomWidth,
        boxShadow,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed top-0 left-0 w-full z-50 border-foreground"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 border-2 border-foreground overflow-hidden bg-white">
            <img 
              src={logoUrl} 
              alt="Artecno Logo" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-4xl font-black tracking-tighter uppercase group-hover:text-accent transition-colors">
              Artecno<span className="text-accent">.</span>
            </span>
            <span className="text-[0.55rem] font-bold uppercase tracking-[0.3em] opacity-80">
              Studio Tecnico Associato
            </span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-10 font-black uppercase text-xs tracking-[0.2em]">
          {navItems.map((item) => {
            const isActive = activeSection === item;
            return (
              <Link 
                key={item}
                href={`#${item}`} 
                className={`transition-all relative group py-2 ${isActive ? "text-accent" : "hover:text-accent"}`}
              >
                {item}
                <motion.span 
                  initial={false}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-1 bg-accent" 
                />
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </div>

        <button className="md:hidden text-2xl font-black">MENU</button>
      </div>
    </motion.nav>
  );
}
