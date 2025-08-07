"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[43.75rem] w-full">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedText 
                text="I'm a software developer who turns coffee and questionable ideas into clean, scalable web apps. When I'm not fixing bugs that mysteriously &quot;appeared on their own,&quot; I'm fulfilling my greatest role—being a single dad to an amazing daughter who lives with me full-time. Between writing code and packing lunch boxes, I walk 10k steps a day because apparently, parenting doesn't count as cardio (even though it should)."
                className="text-3xl md:text-4xl font-light leading-[1.4em]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedText 
                text="I specialize in scalable systems, reusable components, and bedtime routines that somehow always take two hours. My hobbies include working out, walking off merge conflicts, and answering the eternal question: &quot;Why does the Wi-Fi only break when I sit down?&quot;"
                className="text-3xl md:text-4xl font-light leading-[1.4em]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}