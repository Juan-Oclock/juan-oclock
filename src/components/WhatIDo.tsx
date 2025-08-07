"use client";

import { motion } from "framer-motion";

export default function WhatIDo() {
  const services = [
    {
      title: "E-commerce Platforms",
      description: "Full-stack online stores with payment processing, inventory management, and user analytics"
    },
    {
      title: "Business Tools & Dashboards", 
      description: "Data-driven applications for business intelligence, reporting, and workflow automation"
    },
    {
      title: "Personal Web & Mobile Apps",
      description: "Innovative side projects and mobile applications that solve everyday problems"
    }
  ];

  return (
    <section id="what-i-do" className="section-padding">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[43.75rem] w-full">
          <div className="space-y-16">
            {/* First container - What I Do heading and description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-medium leading-tight uppercase" style={{ color: "#fed42a" }}>
                What I Do
              </h2>
              
              <div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                  I specialize in creating digital solutions that bridge the gap between complex business needs and user-friendly experiences. From e-commerce platforms to business intelligence tools, I build applications that drive results.
                </p>
              </div>
            </motion.div>
            
            {/* Second container - Three columns for services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
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
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
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