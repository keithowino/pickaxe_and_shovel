import React from "react";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2023",
    title: "The Spark",
    desc: "Began self-teaching web development in Nairobi. First HTML, CSS, and JavaScript experiments turned into a passion.",
  },
  {
    year: "2024",
    title: "Modern Stack",
    desc: "Dove deep into React, Tailwind CSS, and Supabase. Built production-ready single-page applications.",
  },
  {
    year: "2025",
    title: "Pickaxe & Shovel",
    desc: "Launched personal brand. Started sketching mechatronics prototypes alongside software projects.",
  },
  {
    year: "Next",
    title: "Atoms > Bits",
    desc: "Full transition into mechatronics engineering. Automating real East African challenges — agriculture, logistics, education.",
  },
];

const Timeline = () => {
  return (
    <div className="relative">
      <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-14">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-12 lg:pl-0 grid lg:grid-cols-2 gap-6"
          >
            {/* Dot */}
            <div className="absolute left-[13px] lg:left-1/2 top-1 h-3 w-3 bg-primary border-2 border-background -translate-x-px" />
            {/* Content — alternates sides on desktop */}
            <div
              className={`${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
            >
              <div className="serial-number text-primary mb-2">{m.year}</div>
              <h3 className="font-heading text-2xl font-bold mb-2">
                {m.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
