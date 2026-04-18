import React from "react";

const SKILLS = [
  "React",
  "Tailwind CSS",
  "Supabase",
  "Vite",
  "TypeScript",
  "JavaScript",
  "Python",
  "C++",
  "Ruby",
  "Node.js",
  "MongoDB",
  "Arduino",
  "Raspberry Pi",
  "GitHub",
  "Netlify",
  "Heroku",
  "Framer Motion",
  "Bootstrap",
  "IoT",
  "Robotics",
];

const SkillsMarquee = () => {
  const doubled = [...SKILLS, ...SKILLS];
  return (
    <section className="py-8 border-y border-border bg-card/30 overflow-hidden">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {doubled.map((skill, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-heading text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors select-none">
              {skill}
            </span>
            <span className="text-primary text-sm">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;
