import React from "react";
import { motion } from "framer-motion";
// import Timeline from "@/components/about/Timeline";
// import SkillsGrid from "@/components/about/SkillsGrid";

const About = () => {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="serial-number text-primary mb-4">
            // SPEC SHEET · 01
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            From <span className="text-primary">bits</span> to{" "}
            <span className="text-secondary">atoms</span>.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            I'm Keith Owino — a self-taught developer from Nairobi, Kenya. I
            build web applications today and i am methodically in the path to
            learning mechatronics to build automated systems that solve real
            East African problems: smart agriculture, affordable robotics, and
            connected IoT infrastructure.
          </p>
        </motion.div>
      </section>

      {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="serial-number text-primary mb-3">// TIMELINE</div>
        <h2 className="font-heading text-4xl font-bold mb-12">
          The Journey So Far
        </h2>
        <Timeline />
      </section> */}

      {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="serial-number text-primary mb-3">// CAPABILITIES</div>
        <h2 className="font-heading text-4xl font-bold mb-12">
          Skills & Proficiency
        </h2>
        <SkillsGrid />
      </section> */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="border border-border bg-card/50 p-10 lg:p-16 relative">
          <div className="absolute top-0 right-0 serial-number bg-primary text-primary-foreground px-3 py-1">
            MANIFESTO
          </div>
          <blockquote>
            <p className="font-heading text-2xl lg:text-3xl font-bold mb-4 max-w-3xl leading-snug">
              "The next decade belongs to those who can bridge software and
              hardware — and ship it from Africa."
            </p>
            <footer className="text-muted-foreground serial-number">
              — KEITH OWINO · NAIROBI · 2025
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default About;
