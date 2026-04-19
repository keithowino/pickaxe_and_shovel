import React from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React", level: 50, category: "Frontend" },
  { name: "Tailwind CSS", level: 50, category: "Frontend" },
  { name: "TypeScript", level: 1, category: "Frontend" },
  { name: "Vite", level: 1, category: "Frontend" },
  { name: "Supabase", level: 20, category: "Backend" },
  { name: "MongoDB", level: 50, category: "Backend" },
  { name: "Node.js", level: 50, category: "Backend" },
  { name: "Python", level: 50, category: "Language" },
  { name: "C++", level: 50, category: "Language" },
  { name: "Ruby", level: 50, category: "Language" },
  { name: "Arduino", level: 1, category: "Hardware" },
  { name: "Git / GitHub", level: 85, category: "Tools" },
];

const SkillsGrid = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SKILLS.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="border border-border p-5 bg-card/50 hover:border-primary transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-semibold">{s.name}</span>
            <span className="serial-number text-muted-foreground">
              {s.category}
            </span>
          </div>
          <div className="h-1 bg-muted relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.04 }}
              className="absolute inset-y-0 left-0 bg-primary"
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{s.level}%</div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGrid;
