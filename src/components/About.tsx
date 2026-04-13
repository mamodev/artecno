"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const BrutalistMap = dynamic(() => import("./BrutalistMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-foreground/5 animate-pulse border-4 border-foreground" />
});

const associates = [
  { name: "Alessandra Baroncioni", role: "Architetto", img: "/artecno/images/associates/alessandra.jpg" },
  { name: "Fabrizio Morozzi", role: "Architetto", img: "/artecno/images/associates/fabrizio.jpg" },
  { name: "Enrico Forni", role: "Ingegnere", img: "/artecno/images/associates/enrico.jpg" },
  { name: "Francesco Borghigiani", role: "Geometra", img: "/artecno/images/associates/francesco.jpg" },
];

const workspacePhotos = [
  "/artecno/images/workplace/office_left.jpg",
  "/artecno/images/workplace/office2.jpg",
  "/artecno/images/workplace/office3.jpg",
];

function AnimatedSubHeader({ title, subtitle, inverse = false }: { title: string, subtitle?: string, inverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [inverse ? 100 : -100, 0, inverse ? -100 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="flex justify-between items-end border-b-4 border-foreground pb-8 mb-16">
      <motion.h3 
        style={{ x, opacity }}
        className="text-6xl font-black uppercase tracking-tighter"
      >
        {title}
      </motion.h3>
      {subtitle && (
        <span className="text-xl font-bold uppercase tracking-widest text-accent italic">
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-10vw", "0vw", "10vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-48 px-4 w-full border-t-4 border-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col gap-10">
            <motion.h2 
              style={{ x, opacity }}
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none origin-left"
            >
              The <br />
              <span className="text-accent">Studio</span>
            </motion.h2>
            <div className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-tight">
              <p>Established in 1998 in Sesto Fiorentino.</p>
              <p className="opacity-70 leading-snug">
                A multidisciplinary collective where architecture, engineering, and technical consultancy merge. 
                We operate as an integrated structure, ensuring total control over the building process.
              </p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden border-4 border-foreground brutalist-shadow bg-accent">
            <img 
              src="/artecno/images/workplace/studio_main.jpg" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Office"
            />
            <div className="absolute top-4 left-4 bg-foreground text-background px-4 py-2 text-xs font-black uppercase">
              Workplace / Via Matteotti 88
            </div>
          </div>
        </div>

        {/* Associates */}
        <div className="flex flex-col">
          <AnimatedSubHeader title="Associates" subtitle="(Core Team)" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {associates.map((person, idx) => (
              <div 
                key={idx}
                className="group relative flex flex-col border-4 border-foreground brutalist-shadow bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden border-b-4 border-foreground grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={person.img} className="w-full h-full object-cover" alt={person.name} />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-accent tracking-widest">{person.role}</span>
                  <h4 className="text-2xl font-black uppercase leading-none">{person.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workplace Gallery */}
        <div className="flex flex-col">
          <AnimatedSubHeader title="Workplace" inverse />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workspacePhotos.map((photo, idx) => (
              <div key={idx} className="aspect-video border-4 border-foreground brutalist-shadow overflow-hidden group">
                <img src={photo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={`Studio ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col mt-20">
          <AnimatedSubHeader title="Location" subtitle="Sesto Fiorentino" />
          <BrutalistMap />
        </div>
      </div>
    </section>
  );
}
