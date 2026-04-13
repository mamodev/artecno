"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const word1 = "Artecno";
  const word2 = "Progetti";

  const word1Transforms = word1.split("").map((_, i) => 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0, 1], [0, i * -40])
  );

  const word2Transforms = word2.split("").map((_, i) => 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0, 1], [0, (word2.length - i) * 40])
  );

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
      >
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="h-1 w-12 bg-accent" />
            <h2 className="text-sm font-black uppercase text-accent tracking-[0.4em]">
              Studio Tecnico Associato
            </h2>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.95] uppercase tracking-tighter flex flex-col select-none"
          >
            <div className="flex">
              {word1.split("").map((char, i) => (
                <motion.span key={i} style={{ x: word1Transforms[i] }} className="block">
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex text-accent italic relative">
              {word2.split("").map((char, i) => (
                <motion.span key={i} style={{ x: word2Transforms[i] }} className="block">
                  {char}
                </motion.span>
              ))}
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-1 left-0 h-2 md:h-4 w-full bg-foreground -z-10 opacity-10 origin-left" 
              />
            </div>
          </motion.h1>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-10">
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <p className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight border-l-4 border-foreground pl-6">
              Multidisciplinary design since 1998. Architecture, Engineering, and Safety.
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Location / Headquarters</p>
              <p className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                Sesto Fiorentino / Florence / IT
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <button className="flex-1 brutalist-button bg-accent text-white border-foreground shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase tracking-widest py-5">
              Work
            </button>
            <button className="flex-1 brutalist-button font-black uppercase tracking-widest py-5 hover:bg-foreground hover:text-background transition-all">
              Contact
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Structural Decoration */}
      <div className="absolute top-0 right-0 h-full w-24 border-l border-foreground/5 hidden xl:block" />
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 overflow-hidden hidden md:flex">
        <span className="text-[10rem] font-black leading-none opacity-5 tracking-tighter">1998</span>
        <div className="h-1 w-40 bg-foreground opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] opacity-30 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[2px] h-12 bg-foreground/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
