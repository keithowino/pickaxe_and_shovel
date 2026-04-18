import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Hammer, Rocket } from "lucide-react";
// import { base44 } from "@/api/base44Client";

const StatsBar = () => {
  const [count, setCount] = useState(1);

  //   useEffect(() => {
  //     base44.entities.Project.list()
  //       .then((p) => setCount(p.length))
  //       .catch(() => setCount(0));
  //   }, []);

  const stats = [
    {
      icon: Hammer,
      label: "Projects Built",
      value: count !== null ? `${count}` : "—",
      color: "text-primary",
    },
    {
      icon: MapPin,
      label: "Based In",
      value: "Nairobi, KE 🇰🇪",
      color: "text-secondary",
    },
    {
      icon: Rocket,
      label: "Future Founder",
      value: "Mechatronics",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border border-border p-8 bg-card/50 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-6">
              <s.icon className={`h-6 w-6 ${s.color}`} />
              <span className="serial-number text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <div className="font-heading text-3xl lg:text-4xl font-bold">
              {s.value}
            </div>
            <div className="mt-2 serial-number text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
