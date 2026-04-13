"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-accent z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}

export function ParallaxText({ children, baseVelocity = 100 }: { children: string, baseVelocity?: number }) {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1000], [0, baseVelocity]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-10 border-y-4 border-foreground bg-foreground text-background">
      <motion.div className="flex flex-nowrap gap-20 text-9xl font-black uppercase italic" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export function ScrollRevealImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, clipPath }}
      className="relative w-full aspect-video border-4 border-foreground brutalist-shadow overflow-hidden"
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

export function RotatingShape() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{ rotate }}
      className="fixed bottom-10 right-10 w-32 h-32 border-8 border-accent z-40 mix-blend-difference pointer-events-none"
    />
  );
}
