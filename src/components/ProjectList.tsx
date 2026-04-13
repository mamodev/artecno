"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { title: "Panificio Tecchiolli", category: "Industrial", year: "2023", img: "/images/projects/p3.jpg" },
  { title: "Residenza Aurora", category: "Residential", year: "2022", img: "/images/projects/p4.jpg" },
  { title: "Villa Verticale", category: "Architecture", year: "2021", img: "/images/projects/p1.jpg" },
  { title: "Area Ex Stazione", category: "Urban Renewal", year: "2023", img: "/images/projects/p2.jpg" },
];

export default function ProjectList() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Header centered at 50% section scroll
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-10vw", "0vw", "10vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="projects" ref={sectionRef} className="py-48 px-4 w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.h2 
            style={{ x, opacity }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none origin-left"
          >
            Portfolio
          </motion.h2>
          <span className="text-xl font-bold uppercase tracking-widest text-accent italic">(Selected Works)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, category, year, index, img }: { title: string; category: string; year: string; index: number; img: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Card centered at 50% card scroll
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, index % 2 === 0 ? 100 : -100]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className="group relative flex flex-col gap-8 bg-background"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-4 border-foreground brutalist-shadow">
        <motion.img
          src={img}
          alt={title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="text-xs font-black px-2 py-1 bg-accent text-white border-2 border-foreground uppercase">
            {category}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <h3 className="text-4xl md:text-5xl font-black uppercase leading-tight">{title}</h3>
          <span className="text-sm font-black uppercase tracking-widest opacity-50">{year}</span>
        </div>
        <div className="w-full h-2 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </div>
    </motion.div>
  );
}
