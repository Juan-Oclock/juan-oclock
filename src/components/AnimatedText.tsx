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

      // Create timeline for better control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "top 40%",
          scrub: 1,
          markers: true
        }
      });

      // Animate each character with stagger
      chars.forEach((char, index) => {
        tl.to(char, {
          color: "#ffffff",
          duration: 0.1,
        }, index * 0.02);
      });
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