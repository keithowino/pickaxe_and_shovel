import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, Cpu } from "lucide-react";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

      {/* Floating pickaxe */}
      <motion.div
        style={{ rotate: rotate1 }}
        className="absolute top-20 right-8 lg:right-28 opacity-10 lg:opacity-20 pointer-events-none select-none"
      >
        <svg width="200" height="200" viewBox="0 0 48 48" fill="none">
          <g transform="rotate(-35 24 24)">
            {/* Handle (shaft) */}
            <rect
              x="22"
              y="10"
              width="4"
              height="26"
              rx="2"
              fill="hsl(var(--primary))"
            />

            {/* Head (main bar) */}
            <rect
              x="14"
              y="10"
              width="20"
              height="4"
              rx="2"
              fill="hsl(var(--primary))"
            />

            {/* Left spike */}
            <path d="M14 12 L8 16 L14 14 Z" fill="hsl(var(--primary))" />

            {/* Right spike */}
            <path d="M34 12 L40 16 L34 14 Z" fill="hsl(var(--primary))" />
          </g>
        </svg>
      </motion.div>

      {/* Floating shovel */}
      <motion.div
        style={{ rotate: rotate2 }}
        className="absolute bottom-28 right-8 lg:right-28 opacity-10 lg:opacity-20 pointer-events-none select-none"
      >
        <svg width="160" height="160" viewBox="0 0 48 48" fill="none">
          <g transform="rotate(-35 24 24)">
            {/* Handle grip (D-shape) */}
            <path
              d="M20 4 
         C16 4, 14 8, 18 10 
         L30 10 
         C34 8, 32 4, 28 4 Z"
              fill="hsl(var(--secondary))"
            />

            {/* Shaft */}
            <rect
              x="22"
              y="10"
              width="4"
              height="18"
              rx="2"
              fill="hsl(var(--secondary))"
            />

            {/* Metal connector */}
            <rect
              x="21"
              y="28"
              width="6"
              height="3"
              rx="1"
              fill="hsl(var(--secondary))"
            />

            {/* Blade (more realistic spade shape) */}
            <path
              d="M16 31
     C16 46, 32 46, 32 31
     C32 29, 28 27, 24 27
     C20 27, 16 29, 16 31 Z"
              fill="hsl(var(--secondary))"
            />

            {/* Blade center ridge */}
            <path
              d="M24 27 L24 36"
              stroke="hsl(var(--background))"
              stroke-width="0.7"
            />
          </g>
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="serial-number text-primary">
            SYS/001 // KEITH.OWINO // NAIROBI.KE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight text-balance max-w-4xl"
        >
          Digging deep.
          <br />
          <span className="text-primary">Building</span> the{" "}
          <span className="text-secondary">future</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Web Designer → Mechatronics Engineer. Crafting software today, forging
          automated hardware for East Africa tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-medium hover:bg-primary/90 transition-all"
          >
            <Terminal className="h-4 w-4" />
            Explore Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border hover:border-primary hover:text-primary px-7 py-4 font-medium transition-colors"
          >
            <Cpu className="h-4 w-4" />
            Get in Touch
          </Link>
        </motion.div>

        {/* Quick stat pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {[
            "Based in Nairobi 🇰🇪",
            "Web → Mechatronics",
            "Available for Projects",
          ].map((s) => (
            <span
              key={s}
              className="serial-number border border-border px-3 py-2 bg-card/50"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
