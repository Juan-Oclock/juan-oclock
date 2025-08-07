"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-start relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-[43.75rem] w-full text-left"
        >
            
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8"
          >
            <p className="text-3xl md:text-5xl text-white uppercase leading-[1.2em]">
              <span className="font-light">FROM IDEA TO</span><br />
              <span className="font-medium" style={{ color: "#fed42a" }}>"WAIT, IT WORKS".</span>
            </p>
          </motion.div>
          
          </motion.div>
      </div>
    </section>
  );
}