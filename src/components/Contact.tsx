"use client";

import { motion } from "framer-motion";

export default function Contact() {

  return (
    <section id="contact" className="section-padding">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[43.75rem] w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-medium leading-tight uppercase">
                <a 
                  href="mailto:onelasttimejuan@gmail.com" 
                  className="text-white hover:text-gray-300 transition-colors underline decoration-2 underline-offset-4"
                >
                  Send a Message
                </a> - <span className="lowercase" style={{ color: "#fed42a" }}>i'm probably awake anyway</span>
              </h2>
              
              <div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                  I love taking ideas from "wouldn't it be cool if…" to "oh wow, it works!". If you've got something fun or meaningful in mind, I'm in.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 mt-4 italic">
                  Dad joke: My daughter asked what I launched today. I said "a site." She said, "So… not a spaceship?" Total disappointment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}