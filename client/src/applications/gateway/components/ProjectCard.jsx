import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { Heading, Text } from "../../../shared/index.js";

export default function ProjectCard({ project, onClick, index }) {
	/**
	 * Ensure tech_stack is an array
	 */
	const techStack = Array.isArray(project.techStack) ? project.techStack : [];

	const visibleStack = techStack.slice(0, 4);
	const remainingCount = techStack.length - visibleStack.length;

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<motion.article
			layout
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.05 }}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			aria-label={`View details for ${project.name}`}
			className="border border-border bg-card/60 hover:border-primary active:scale-[0.99] transition-all cursor-pointer group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
				{project.thumbnailUrl ? (
					<img
						src={project.thumbnailUrl}
						alt={project.name}
						loading="lazy"
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						onError={(e) => {
							e.target.onerror = null;
							e.target.style.display = "none";
							e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                <span class="font-heading text-6xl sm:text-7xl font-bold text-primary/20">${project.name?.[0]?.toUpperCase() || "?"}</span>
              </div>`;
						}}
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
						<span className="font-heading text-6xl sm:text-7xl font-bold text-primary/20">
							{project.name?.[0]?.toUpperCase() || "?"}
						</span>
					</div>
				)}
			</div>

			<div className="p-5 flex-1 flex flex-col">
				<Heading
					level={4}
					className="group-hover:text-primary transition-colors uppercase"
				>
					{project.name}
				</Heading>

				<Text className="line-clamp-2 mb-4 flex-1">
					{project.description || "No description."}
				</Text>

				<div className="flex flex-wrap gap-1.5 mb-4">
					{visibleStack.map((t) => (
						<span
							key={t}
							className="text-xs px-2 py-0.5 border border-border bg-background/60"
						>
							{t}
						</span>
					))}
					{remainingCount > 0 && (
						<span className="text-xs px-2 py-0.5 border border-dashed border-border text-muted-foreground">
							+{remainingCount}
						</span>
					)}
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
						{project.primaryLanguage && (
							<span className="flex items-center gap-1">
								<span className="h-2 w-2 rounded-full bg-primary" />
								{project.primaryLanguage}
							</span>
						)}
					</div>
					<div className="flex gap-1 -mr-1.5">
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noreferrer"
								onClick={(e) => e.stopPropagation()}
								aria-label={`${project.name} on GitHub`}
								className="p-2 rounded-sm hover:text-primary hover:bg-primary/10 transition-colors"
							>
								<IoLogoGithub className="h-4 w-4" />
							</a>
						)}
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noreferrer"
								onClick={(e) => e.stopPropagation()}
								aria-label={`${project.name} live demo`}
								className="p-2 rounded-sm hover:text-primary hover:bg-primary/10 transition-colors"
							>
								<ExternalLink className="h-4 w-4" />
							</a>
						)}
					</div>
				</div>
			</div>
		</motion.article>
	);
}
