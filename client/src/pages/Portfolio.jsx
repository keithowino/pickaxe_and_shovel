// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { base44 } from "@/api/base44Client";
// import ProjectCard from "@/components/portfolio/ProjectCard";
// import ProjectModal from "@/components/portfolio/ProjectModal";

import MetaDataInsert from "../lib/MetaDataInsert";

// const CATEGORIES = [
//   "All",
//   "Web",
//   "Mechatronics",
//   "IoT",
//   "Robotics",
//   "In Progress",
// ];

const Portfolio = () => {
  //   const [projects, setProjects] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [category, setCategory] = useState("All");
  //   const [selected, setSelected] = useState(null);

  //   useEffect(() => {
  //     base44.entities.Project.list("-created_date")
  //       .then((data) => setProjects(data))
  //       .catch(() => {})
  //       .finally(() => setLoading(false));
  //   }, []);

  //   const filtered = useMemo(
  //     () =>
  //       category === "All"
  //         ? projects
  //         : projects.filter((p) => (p.category || "Web") === category),
  //     [projects, category],
  //   );

  return (
    <div>
      <MetaDataInsert title={"Portfolio"} />
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

        <div className="relative">
          <div className="serial-number text-primary mb-4">
            // SPEC GALLERY · 03
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            The <span className="text-primary">Portfolio</span>.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Live-synced from GitHub. Every build, logged and labelled like a
            production run.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-6">
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm font-medium border transition-all ${
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section> */}

      {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-border h-96 animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center">
            <div className="serial-number text-muted-foreground mb-4">
              NO RECORDS FOUND
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">
              The workshop is quiet.
            </h3>
            <p className="text-muted-foreground mb-6">
              No projects have been imported yet.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Admin → Import from GitHub
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onClick={() => setSelected(p)}
              />
            ))}
          </div>
        )}
      </section> */}

      {/* <ProjectModal project={selected} onClose={() => setSelected(null)} /> */}
    </div>
  );
};

export default Portfolio;
