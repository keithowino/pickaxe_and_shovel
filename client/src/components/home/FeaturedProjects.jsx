import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, GitFork } from "lucide-react";
import { projectsPlaceholder } from "../../lib/DynamicData";
// import { base44 } from "@/api/base44Client";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //   base44.entities.Project.list("-created_date", 3)
    //     .then((data) => setProjects(data))
    //     .catch(() => {})
    //     .finally(() => setLoading(false));
    setProjects(projectsPlaceholder);
    setLoading(false);
  }, [loading]);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <div className="serial-number text-primary mb-3">
            // SELECTED WORKS
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Recent Builds
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          View all{" "}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-border h-64 animate-pulse bg-muted"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">
            No projects yet.{" "}
            {/* <Link to="/admin" className="text-primary underline">
              Import from GitHub →
            </Link> */}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border hover:border-primary transition-all group bg-card/50"
            >
              <div className="aspect-video border-b border-border bg-muted relative overflow-hidden">
                {p.thumbnail_url ? (
                  <img
                    src={p.thumbnail_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-heading text-6xl font-bold text-primary/20">
                    {p.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="absolute top-3 left-3 serial-number bg-background/80 backdrop-blur px-2 py-1">
                  {p.category || "Web"}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {p.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {p.primary_language && <span>{p.primary_language}</span>}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {p.stars || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {p.forks || 0}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
