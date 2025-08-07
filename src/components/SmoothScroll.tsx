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
    if (typeof window !== 'undefined') {
      try {
        // Check if mobile and adjust settings
        const isMobile = window.innerWidth < 768;
        
        const smoother = ScrollSmoother.create({
          smooth: isMobile ? 0.8 : 1.5, // Reduced smooth on mobile
          effects: !isMobile, // Disable effects on mobile
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        // Refresh ScrollTrigger on resize for better mobile support
        const handleResize = () => {
          ScrollTrigger.refresh();
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
          smoother.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('ScrollSmoother initialization failed:', error);
      }
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}