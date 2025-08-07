"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}