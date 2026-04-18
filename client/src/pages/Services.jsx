import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Wifi,
  Bot,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    desc: "Modern, responsive SPAs and dashboards built with React, Tailwind CSS, and Supabase. From concept to deployed product.",
    topics: ["React", "Tailwind", "Supabase", "Vite"],
    msg: "Hi Keith, I'm interested in building a custom web application.",
  },
  {
    icon: Cpu,
    title: "Mechatronics & Automation Prototypes",
    desc: "Concept-to-prototype for automated systems. Arduino and Raspberry Pi driven hardware tailored to your use case.",
    topics: ["Arduino", "C++", "Sensors", "Motors"],
    msg: "Hi Keith, I'd like to discuss a mechatronics prototype.",
  },
  {
    icon: Wifi,
    title: "IoT Smart Devices",
    desc: "Connected devices for homes, farms, and business. Real-time data, cloud-synced dashboards, mobile-accessible.",
    topics: ["ESP32", "MQTT", "Cloud", "Dashboards"],
    msg: "Hi Keith, I'm exploring an IoT project.",
  },
  {
    icon: Bot,
    title: "DIY Robotics Solutions",
    desc: "Affordable robotic solutions for education, agriculture, and research — built with locally sourced components.",
    topics: ["Robotics", "Motion", "Vision", "Python"],
    msg: "Hi Keith, I want to build a robot.",
  },
  {
    icon: GraduationCap,
    title: "Technical Consulting & Training",
    desc: "One-on-one mentoring, team workshops, and technical advisory for startups navigating the hardware/software stack.",
    topics: ["Workshops", "1:1", "Advisory", "Teams"],
    msg: "Hi Keith, I'd like to book consulting or training.",
  },
];

const Services = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="serial-number text-primary mb-4">
          // SPEC SHEET · 02
        </div>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          What I <span className="text-primary">build</span>.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Five service lines spanning the full software/hardware spectrum — each
          designed to ship real, working systems.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border bg-card/50 p-8 hover:border-primary transition-all group relative"
            >
              <div className="serial-number text-muted-foreground absolute top-4 right-4">
                0{i + 1}
              </div>
              <s.icon
                className="h-10 w-10 text-primary mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-heading text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 border border-border bg-background/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/contact?msg=${encodeURIComponent(s.msg)}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
