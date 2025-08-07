"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="cursor-pointer"
        >
          <h2 className="text-sm font-bold">
            <span className="text-white">Juan</span>
            <span className="gradient-text">Oclock.</span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-6 py-2 rounded-full text-xs font-medium border-[0.5px] border-gray-500 hover:border-gray-300 transition-colors"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
}