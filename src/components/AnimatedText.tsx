"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({
  text,
  className = ""
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const initAnimation = () => {
      if (!containerRef.current) return;

      const chars = charsRef.current.filter(Boolean);
      if (chars.length === 0) return;

      // Set initial color and font-weight using inline style
      chars.forEach(char => {
        char.style.color = "#403f3f";
        char.style.fontWeight = "400";
        char.style.transition = "color 0.3s ease, font-weight 0.3s ease";
      });

      // Mobile fallback - use IntersectionObserver
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Animate all characters at once on mobile
                chars.forEach((char, index) => {
                  setTimeout(() => {
                    char.style.color = "#ffffff";
                  }, index * 50);
                });
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
      }

      // Desktop ScrollTrigger animation
      try {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            markers: false,
            onUpdate: (self) => {
              const progress = Math.max(0, Math.min(1, self.progress));
              chars.forEach((char, index) => {
                const charProgress = Math.max(0, Math.min(1, (progress * chars.length - index) / chars.length));
                if (charProgress > 0) {
                  char.style.color = `rgba(255, 255, 255, ${charProgress})`;
                }
              });
            }
          }
        });
      } catch (error) {
        console.error('ScrollTrigger animation failed:', error);
        // Fallback to simple animation
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.style.color = "#ffffff";
          }, index * 100);
        });
      }
    };

    const timer = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              ref={(el) => {
                if (el) charsRef.current[wordIndex * 1000 + charIndex] = el;
              }}
              className="inline-block"
              style={{ color: "#403f3f", fontWeight: "400" }}
            >
              {char}
            </span>
          ))}
          {wordIndex < text.split(" ").length - 1 && (
            <span className="inline-block" style={{ width: "0.3em" }}></span>
          )}
        </span>
      ))}
    </div>
  );
}