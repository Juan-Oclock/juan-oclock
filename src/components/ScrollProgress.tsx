"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <motion.div
        ref={ref}
        className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50 origin-left"
        style={{ scaleX }}
      />
      <div className="h-1"></div>
    </>
  );
}