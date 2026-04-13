"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const services = [
  { title: "Architettura", desc: "Design and construction management for residential, industrial, and commercial projects." },
  { title: "Ingegneria", desc: "Structural, hydraulic, and geotechnical engineering solutions for complex infrastructures." },
  { title: "Safety", desc: "Comprehensive safety management for construction sites and mobile work environments." },
  { title: "Conservation", desc: "Restoration and enhancement of historical-artistic cultural heritage." },
  { title: "Consultancy", desc: "Cadastral, contractual, and technical consultancy for land management." },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerX = useTransform(scrollYProgress, [0, 0.5, 1], ["10vw", "0vw", "-10vw"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="services" ref={sectionRef} className="py-48 px-4 w-full border-t-4 border-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <motion.h2 
          style={{ x: headerX, opacity: headerOpacity }}
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none"
        >
          Services<span className="text-accent">.</span>
        </motion.h2>
        
        <div className="flex flex-col">
          {services.map((service, idx) => (
            <ServiceItem key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service, index }: { service: any, index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // UNIFORM speed, no stagger. Link to center of screen.
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={itemRef}
      style={{ x, opacity }}
      className="group border-b-4 border-foreground/10 last:border-0 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:bg-foreground hover:text-background transition-colors duration-200 px-8 relative bg-background"
    >
      <div className="flex items-center gap-6">
        <span className="text-xl font-black text-accent opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200">
          0{index + 1}
        </span>
        {/* Smaller Title: 4xl to 6xl instead of 6xl to 8xl */}
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter group-hover:italic transition-all duration-200">
          {service.title}
        </h3>
      </div>
      
      <p className="max-w-md text-lg font-bold uppercase tracking-tight opacity-50 group-hover:opacity-100 leading-tight transition-opacity duration-200">
        {service.desc}
      </p>
      
      <div className="hidden md:flex w-16 h-16 items-center justify-center border-4 border-accent group-hover:border-background group-hover:bg-accent transition-all duration-200 group-hover:rotate-45">
        <span className="text-2xl font-black group-hover:text-white">→</span>
      </div>
    </motion.div>
  );
}
