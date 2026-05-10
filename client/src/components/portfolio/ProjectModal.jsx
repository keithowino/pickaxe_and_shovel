// import React, { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Star, GitFork, ExternalLink } from "lucide-react";
// import { IoLogoGithub } from "react-icons/io5";

// const ProjectModal = ({ project, onClose }) => {
//   useEffect(() => {
//     if (!project) return;
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [project, onClose]);

//   return (
//     <AnimatePresence>
//       {project && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
//           role="dialog"
//           aria-modal="true"
//           aria-label={`${project.name} details`}
//         >
//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 30, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             className="relative bg-card border border-border w-full max-w-3xl my-4"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between border-b border-border px-5 py-3">
//               <div className="flex items-center gap-3">
//                 <span className="serial-number text-primary">
//                   TECHNICAL READOUT
//                 </span>
//                 <span className="serial-number text-muted-foreground">
//                   {project.category || "Web"}
//                 </span>
//               </div>
//               <button
//                 onClick={onClose}
//                 aria-label="Close modal"
//                 className="p-1 hover:text-primary transition-colors"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Thumbnail */}
//             <div className="aspect-video bg-muted border-b border-border overflow-hidden">
//               {project.thumbnail_url ? (
//                 <img
//                   src={project.thumbnail_url}
//                   alt={project.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <span className="font-heading text-8xl font-bold text-primary/20">
//                     {project.name?.[0]?.toUpperCase()}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="p-6 md:p-10">
//               <h2 className="font-heading text-3xl font-bold mb-3">
//                 {project.name}
//               </h2>
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 {project.description || "No description."}
//               </p>

//               {project.notes && (
//                 <div className="mb-6 border-l-2 border-primary pl-4 py-1">
//                   <p className="text-sm text-muted-foreground italic">
//                     {project.notes}
//                   </p>
//                 </div>
//               )}

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4 mb-8">
//                 {[
//                   { label: "Stars", value: project.stars || 0, Icon: Star },
//                   { label: "Forks", value: project.forks || 0, Icon: GitFork },
//                   {
//                     label: "Language",
//                     value: project.primary_language || "N/A",
//                     Icon: null,
//                   },
//                 ].map(({ label, value, Icon }) => (
//                   <div key={label} className="border border-border p-4">
//                     <div className="serial-number text-muted-foreground mb-1">
//                       {label}
//                     </div>
//                     <div className="flex items-center gap-2 font-heading text-xl font-bold">
//                       {Icon && <Icon className="h-4 w-4 text-primary" />}
//                       {value}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Tech stack */}
//               <div className="mb-8">
//                 <div className="serial-number text-muted-foreground mb-3">
//                   TECH STACK
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {(project.tech_stack || []).length > 0 ? (
//                     project.tech_stack.map((t) => (
//                       <span
//                         key={t}
//                         className="px-3 py-1 border border-border bg-background text-sm"
//                       >
//                         {t}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-sm text-muted-foreground">—</span>
//                   )}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-wrap gap-3">
//                 {project.github_url && (
//                   <a
//                     href={project.github_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
//                   >
//                     <IoLogoGithub className="h-4 w-4" /> View on GitHub
//                   </a>
//                 )}
//                 {project.live_url && (
//                   <a
//                     href={project.live_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-2 border border-border hover:border-primary px-5 py-3 font-medium transition-colors"
//                   >
//                     <ExternalLink className="h-4 w-4" /> Live Demo
//                   </a>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProjectModal;

// import React, { useEffect, useState } from "react";
// import { X, ExternalLink, Star, GitFork, Calendar, Tag } from "lucide-react";
// import { IoLogoGithub } from "react-icons/io5";

// const ProjectModal = ({ project, onClose }) => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	useEffect(() => {
// 		setIsOpen(!!project);

// 		// Prevent body scroll when modal is open
// 		if (project) {
// 			document.body.style.overflow = "hidden";
// 		} else {
// 			document.body.style.overflow = "unset";
// 		}

// 		return () => {
// 			document.body.style.overflow = "unset";
// 		};
// 	}, [project]);

// 	// Handle escape key
// 	useEffect(() => {
// 		const handleEscape = (e) => {
// 			if (e.key === "Escape" && isOpen) {
// 				onClose();
// 			}
// 		};

// 		window.addEventListener("keydown", handleEscape);
// 		return () => window.removeEventListener("keydown", handleEscape);
// 	}, [isOpen, onClose]);

// 	if (!project) return null;

// 	const thumbnailUrl =
// 		project.thumbnail_url ||
// 		(project.github_url ? `${project.github_url}/social_preview` : null) ||
// 		"https://placehold.co/1200x600/1a1a1a/ffffff?text=No+Preview";

// 	return (
// 		<div
// 			className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
// 				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
// 			}`}
// 			onClick={onClose}
// 		>
// 			{/* Backdrop */}
// 			<div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

// 			{/* Modal */}
// 			<div
// 				className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border border-border shadow-2xl"
// 				onClick={(e) => e.stopPropagation()}
// 			>
// 				{/* Close button */}
// 				<button
// 					onClick={onClose}
// 					className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-destructive/20 rounded-full transition-colors"
// 				>
// 					<X className="h-5 w-5" />
// 				</button>

// 				{/* Thumbnail */}
// 				<div className="relative aspect-video bg-muted">
// 					<img
// 						src={thumbnailUrl}
// 						alt={project.name}
// 						className="w-full h-full object-cover"
// 						onError={(e) => {
// 							e.target.src =
// 								"https://placehold.co/1200x600/1a1a1a/ffffff?text=Preview+Unavailable";
// 						}}
// 					/>

// 					{/* Featured badge */}
// 					{project.featured && (
// 						<div className="absolute top-4 left-4">
// 							<span className="text-xs px-3 py-1.5 bg-primary text-primary-foreground font-mono">
// 								FEATURED PROJECT
// 							</span>
// 						</div>
// 					)}
// 				</div>

// 				{/* Content */}
// 				<div className="p-6 lg:p-8">
// 					{/* Title and category */}
// 					<div className="mb-6">
// 						<div className="flex items-center gap-2 mb-3 flex-wrap">
// 							<span className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 font-mono">
// 								{project.category || "Web"}
// 							</span>
// 							{project.createdAt && (
// 								<span className="text-xs px-2 py-1 border border-border font-mono flex items-center gap-1">
// 									<Calendar className="h-3 w-3" />
// 									{new Date(
// 										project.createdAt,
// 									).toLocaleDateString()}
// 								</span>
// 							)}
// 						</div>
// 						<h2 className="font-heading text-3xl md:text-4xl font-bold">
// 							{project.name}
// 						</h2>
// 					</div>

// 					{/* Stats row */}
// 					<div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
// 						{project.stars > 0 && (
// 							<div className="flex items-center gap-2">
// 								<Star className="h-5 w-5 text-muted-foreground" />
// 								<span className="font-mono text-lg">
// 									{project.stars}
// 								</span>
// 								<span className="text-muted-foreground text-sm">
// 									stars
// 								</span>
// 							</div>
// 						)}
// 						{project.forks > 0 && (
// 							<div className="flex items-center gap-2">
// 								<GitFork className="h-5 w-5 text-muted-foreground" />
// 								<span className="font-mono text-lg">
// 									{project.forks}
// 								</span>
// 								<span className="text-muted-foreground text-sm">
// 									forks
// 								</span>
// 							</div>
// 						)}
// 						{project.primary_language && (
// 							<div className="flex items-center gap-2">
// 								<Tag className="h-5 w-5 text-muted-foreground" />
// 								<span className="text-sm">
// 									{project.primary_language}
// 								</span>
// 							</div>
// 						)}
// 					</div>

// 					{/* Description */}
// 					<div className="mb-8">
// 						<h3 className="font-heading font-semibold text-lg mb-3">
// 							Description
// 						</h3>
// 						<p className="text-muted-foreground leading-relaxed">
// 							{project.description || "No description available."}
// 						</p>
// 						{project.notes && (
// 							<div className="mt-4 p-4 bg-muted/30 border-l-2 border-primary">
// 								<p className="text-sm italic text-muted-foreground">
// 									{project.notes}
// 								</p>
// 							</div>
// 						)}
// 					</div>

// 					{/* Tech stack */}
// 					{project.tech_stack && project.tech_stack.length > 0 && (
// 						<div className="mb-8">
// 							<h3 className="font-heading font-semibold text-lg mb-3">
// 								Technologies
// 							</h3>
// 							<div className="flex flex-wrap gap-2">
// 								{project.tech_stack.map((tech, i) => (
// 									<span
// 										key={i}
// 										className="px-3 py-1.5 bg-muted border border-border text-sm font-mono"
// 									>
// 										{tech}
// 									</span>
// 								))}
// 							</div>
// 						</div>
// 					)}

// 					{/* Topics */}
// 					{project.topics && project.topics.length > 0 && (
// 						<div className="mb-8">
// 							<h3 className="font-heading font-semibold text-lg mb-3">
// 								Topics
// 							</h3>
// 							<div className="flex flex-wrap gap-2">
// 								{project.topics.map((topic, i) => (
// 									<span
// 										key={i}
// 										className="px-3 py-1.5 bg-primary/5 border border-primary/20 text-sm"
// 									>
// 										#{topic}
// 									</span>
// 								))}
// 							</div>
// 						</div>
// 					)}

// 					{/* Action buttons */}
// 					<div className="flex flex-wrap gap-4 pt-6 border-t border-border">
// 						{project.github_url && (
// 							<a
// 								href={project.github_url}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
// 							>
// 								<IoLogoGithub className="h-5 w-5" />
// 								View Repository
// 							</a>
// 						)}
// 						{project.live_url && (
// 							<a
// 								href={project.live_url}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 font-medium hover:bg-primary/10 transition-colors"
// 							>
// 								<ExternalLink className="h-5 w-5" />
// 								Live Demo
// 							</a>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProjectModal;

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

export default function ProjectModal({ project, onClose }) {
	useEffect(() => {
		if (!project) return;
		const handler = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [project, onClose]);

	// Ensure tech_stack is an array
	const techStack =
		project?.tech_stack && Array.isArray(project.tech_stack)
			? project.tech_stack
			: [];

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
									onError={(e) => {
										e.target.onerror = null;
										e.target.style.display = "none";
										e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center">
                      <span class="font-heading text-8xl font-bold text-primary/20">${project.name?.[0]?.toUpperCase() || "?"}</span>
                    </div>`;
									}}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<span className="font-heading text-8xl font-bold text-primary/20">
										{project.name?.[0]?.toUpperCase() ||
											"?"}
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
										value:
											project.primary_language || "N/A",
										Icon: null,
									},
								].map(({ label, value, Icon }) => (
									<div
										key={label}
										className="border border-border p-4"
									>
										<div className="serial-number text-muted-foreground mb-1">
											{label}
										</div>
										<div className="flex items-center gap-2 font-heading text-xl font-bold">
											{Icon && (
												<Icon className="h-4 w-4 text-primary" />
											)}
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
							<div className="flex flex-wrap gap-3">
								{project.github_url && (
									<a
										href={project.github_url}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
									>
										<IoLogoGithub className="h-4 w-4" />{" "}
										View on GitHub
									</a>
								)}
								{project.live_url && (
									<a
										href={project.live_url}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center gap-2 border border-border hover:border-primary px-5 py-3 font-medium transition-colors"
									>
										<ExternalLink className="h-4 w-4" />{" "}
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
