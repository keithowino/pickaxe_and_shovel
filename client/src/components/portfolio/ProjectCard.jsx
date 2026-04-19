import React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

const ProjectCard = ({ project, onClick, index }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="border border-border bg-card/60 hover:border-primary transition-all cursor-pointer group flex flex-col"
    >
      {/* System label header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="serial-number text-muted-foreground">
          SN/{String(index + 1).padStart(3, "0")}
        </span>
        <span className="serial-number text-primary">
          {project.category || "Web"}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video bg-muted relative overflow-hidden border-b border-border">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
            <span className="font-heading text-7xl font-bold text-primary/20">
              {project.name?.[0]?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {project.description || "No description."}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.tech_stack || []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 border border-border bg-background/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {project.stars || 0}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {project.forks || 0}
            </span>
            {project.primary_language && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {project.primary_language}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} on GitHub`}
                className="p-1 hover:text-primary transition-colors"
              >
                <IoLogoGithub className="h-4 w-4" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} live demo`}
                className="p-1 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
