"use client";

import { motion } from "framer-motion";

export default function FreeTime() {
  const hobbies = [
    {
      title: "Weightlifting",
      description: "Like a gym rat with a debugger - pushing limits and fixing form"
    },
    {
      title: "Hiking & Adventure",
      description: "Finding bugs in nature and solutions on mountain trails"
    },
    {
      title: "Side Projects",
      description: "Building stuff no one asked for, but everyone needs"
    }
  ];

  return (
    <section id="free-time" className="section-padding relative">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/30624770/pexels-photo-30624770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 w-full flex justify-center px-6">
        <div className="max-w-[43.75rem] w-full">
          <div className="space-y-16">
            {/* First container - Free Time heading and description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-medium leading-tight uppercase" style={{ color: "#fed42a" }}>
                In My Free Time
              </h2>
              
              <div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                  When I'm not coding, you'll find me chasing gains, trails, and weird ideas. Life's too short for boring hobbies and boring code.
                </p>
              </div>
            </motion.div>
            
            {/* Second container - Three columns for hobbies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="p-6 border border-gray-900 rounded-lg shadow-lg hover:shadow-xl cursor-pointer bg-black/30 backdrop-blur-sm"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <h3 className="text-xl font-medium mb-2" style={{ color: "#fed42a" }}>
                      {hobby.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {hobby.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}