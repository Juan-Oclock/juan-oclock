"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Create array of spans for each character in the animated text
    const text = textRef.current;
    const characters = text.querySelectorAll('.char');

    gsap.set(characters, { 
      opacity: 0 
    });

    gsap.to(characters, {
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.5
    });
  }, []);

  const renderAnimatedText = (text: string, className: string = "", animate: boolean = false) => {
    if (animate) {
      return (
        <span className={className} style={{ color: "#fed42a" }}>
          {text.split('').map((char, index) => (
            <span key={index} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    }
    return <span className={className}>{text}</span>;
  };

  return (
    <section className="h-[70vh] flex items-center justify-start relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/sparking-dribble.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 w-full flex justify-center px-6">
        <div className="max-w-[43.75rem] w-full text-left">
          
          <div ref={textRef} className="mt-8">
            <p className="text-3xl md:text-5xl text-white uppercase leading-[1.1em]">
              {renderAnimatedText("FROM IDEA TO", "font-light")}<br />
              {renderAnimatedText('"WAIT, IT WORKS".', "font-medium", true)}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}