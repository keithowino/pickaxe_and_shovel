import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-card border border-border w-full max-w-3xl my-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="serial-number text-primary">
                  TECHNICAL READOUT
                </span>
                <span className="serial-number text-muted-foreground">
                  {project.category || "Web"}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="aspect-video bg-muted border-b border-border overflow-hidden">
              {project.thumbnail_url ? (
                <img
                  src={project.thumbnail_url}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-heading text-8xl font-bold text-primary/20">
                    {project.name?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 md:p-10">
              <h2 className="font-heading text-3xl font-bold mb-3">
                {project.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {project.description || "No description."}
              </p>

              {project.notes && (
                <div className="mb-6 border-l-2 border-primary pl-4 py-1">
                  <p className="text-sm text-muted-foreground italic">
                    {project.notes}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Stars", value: project.stars || 0, Icon: Star },
                  { label: "Forks", value: project.forks || 0, Icon: GitFork },
                  {
                    label: "Language",
                    value: project.primary_language || "N/A",
                    Icon: null,
                  },
                ].map(({ label, value, Icon }) => (
                  <div key={label} className="border border-border p-4">
                    <div className="serial-number text-muted-foreground mb-1">
                      {label}
                    </div>
                    <div className="flex items-center gap-2 font-heading text-xl font-bold">
                      {Icon && <Icon className="h-4 w-4 text-primary" />}
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mb-8">
                <div className="serial-number text-muted-foreground mb-3">
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.tech_stack || []).length > 0 ? (
                    project.tech_stack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 border border-border bg-background text-sm"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <IoLogoGithub className="h-4 w-4" /> View on GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-border hover:border-primary px-5 py-3 font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
