import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { FeatureGrid, Heading, Text } from "../../../shared/index.js";

export default function ProjectModal({ project, onClose }) {
	const closeBtnRef = useRef(null);

	useEffect(() => {
		if (!project) return;

		const handler = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);

		// Lock body scroll while the modal is open
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// Send initial focus into the modal
		closeBtnRef.current?.focus();

		return () => {
			window.removeEventListener("keydown", handler);
			document.body.style.overflow = previousOverflow;
		};
	}, [project, onClose]);

	/**
	 * Ensure tech_stack is an array
	 */
	const techStack =
		project?.techStack && Array.isArray(project.techStack)
			? project.techStack
			: [];

	return (
		<AnimatePresence>
			{project && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto p-4"
					role="dialog"
					aria-modal="true"
					aria-label={`${project.name} details`}
				>
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 30, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
						className="relative bg-card border border-border w-full max-w-3xl mx-auto my-8 sm:my-16"
					>
						{/* Header */}
						<div className="flex items-center justify-between border-b border-border px-5 py-3">
							<div className="flex items-center gap-3">
								<span className="serial-number text-primary">
									TECHNICAL READOUT
								</span>
								<span className="serial-number text-muted-foreground hidden sm:inline">
									{project.category.name || "Web development"}
								</span>
							</div>
							<button
								ref={closeBtnRef}
								onClick={onClose}
								aria-label="Close modal"
								className="p-2 -mr-2 rounded-sm hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Thumbnail */}
						<div className="aspect-video bg-muted border-b border-border overflow-hidden">
							{project.thumbnailUrl ? (
								<img
									src={project.thumbnailUrl}
									alt={project.name}
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.onerror = null;
										e.target.style.display = "none";
										e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center">
                      <span class="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-primary/20">${project.name?.[0]?.toUpperCase() || "?"}</span>
                    </div>`;
									}}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<span className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-primary/20">
										{project.name?.[0]?.toUpperCase() ||
											"?"}
									</span>
								</div>
							)}
						</div>

						<div className="p-5 sm:p-8 md:p-10">
							<div className="flex items-center gap-2 mb-2 sm:hidden">
								<span className="serial-number text-muted-foreground">
									{project.category.name || "Web development"}
								</span>
							</div>
							<Heading className="uppercase">
								{project.name}
							</Heading>
							<Text className="mb-6">
								{project.description || "No description."}
							</Text>

							{/* Stats */}
							<FeatureGrid className="mb-8 !gap-2 !sm:gap-3">
								{[
									{
										label: "Stars",
										value: project.stars || 0,
										Icon: Star,
									},
									{
										label: "Forks",
										value: project.forks || 0,
										Icon: GitFork,
									},
									{
										label: "Language",
										value: project.primaryLanguage || "N/A",
										Icon: null,
									},
								].map(({ label, value, Icon }) => (
									<div
										key={label}
										className="border border-border p-3 sm:p-4"
									>
										<div className="serial-number text-muted-foreground mb-1 truncate">
											{label}
										</div>
										<div className="flex items-center gap-1.5 sm:gap-2 font-heading text-base sm:text-xl font-bold truncate">
											{Icon && (
												<Icon className="h-4 w-4 text-primary shrink-0" />
											)}
											{value}
										</div>
									</div>
								))}
							</FeatureGrid>

							{/* Tech stack */}
							<div className="mb-8">
								<div className="serial-number text-muted-foreground mb-3">
									TECH STACK
								</div>
								<div className="flex flex-wrap gap-2">
									{techStack.length > 0 ? (
										techStack.map((t) => (
											<span
												key={t}
												className="px-3 py-1 border border-border bg-background text-sm"
											>
												{t}
											</span>
										))
									) : (
										<span className="text-sm text-muted-foreground">
											—
										</span>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className="flex flex-col sm:flex-row flex-wrap gap-3">
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
									>
										<IoLogoGithub className="h-4 w-4" />
										View on GitHub
									</a>
								)}
								{project.liveUrl && (
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary active:scale-[0.98] px-5 py-3 font-medium transition-all"
									>
										<ExternalLink className="h-4 w-4" />
										Live Demo
									</a>
								)}
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
