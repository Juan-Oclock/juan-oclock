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

      // Set initial state with much darker gray
      gsap.set(chars, {
        color: "#1a1a1a"
      });

      // Mobile fallback - use IntersectionObserver
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Animate all characters at once on mobile
                gsap.to(chars, {
                  color: "#ffffff",
                  duration: 1.5,
                  stagger: 0.05,
                  ease: "power2.out"
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
        gsap.to(chars, {
          color: "#ffffff",
          duration: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false,
            onComplete: () => {
              // Ensure all characters are white when animation completes
              gsap.set(chars, { color: "#ffffff" });
            }
          }
        });
      } catch (error) {
        console.error('ScrollTrigger animation failed:', error);
        // Fallback to simple animation
        gsap.to(chars, {
          color: "#ffffff",
          duration: 1.5,
          stagger: 0.05,
          ease: "power2.out"
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
          {word.split("").map((char, charIndex) => {
            const globalIndex = text.split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0) + charIndex;
            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                ref={(el) => {
                  if (el) charsRef.current[globalIndex] = el;
                }}
                className="inline-block"
                style={{ color: "#1a1a1a" }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < text.split(" ").length - 1 && (
            <span className="inline-block" style={{ width: "0.3em" }}></span>
          )}
        </span>
      ))}
    </div>
  );
}