// import React from "react";
// import { motion } from "framer-motion";
// import { Star, GitFork, ExternalLink } from "lucide-react";
// import { IoLogoGithub } from "react-icons/io5";

// const ProjectCard = ({ project, onClick, index }) => {
//   return (
//     <motion.article
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.05 }}
//       onClick={onClick}
//       className="border border-border bg-card/60 hover:border-primary transition-all cursor-pointer group flex flex-col"
//     >
//       {/* System label header */}
//       <div className="flex items-center justify-between border-b border-border px-4 py-2">
//         <span className="serial-number text-muted-foreground">
//           SN/{String(index + 1).padStart(3, "0")}
//         </span>
//         <span className="serial-number text-primary">
//           {project.category || "Web"}
//         </span>
//       </div>

//       {/* Thumbnail */}
//       <div className="aspect-video bg-muted relative overflow-hidden border-b border-border">
//         {project.thumbnail_url ? (
//           <img
//             src={project.thumbnail_url}
//             alt={project.name}
//             loading="lazy"
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
//             <span className="font-heading text-7xl font-bold text-primary/20">
//               {project.name?.[0]?.toUpperCase()}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="p-5 flex-1 flex flex-col">
//         <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
//           {project.name}
//         </h3>
//         <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
//           {project.description || "No description."}
//         </p>

//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {(project.tech_stack || []).slice(0, 4).map((t) => (
//             <span
//               key={t}
//               className="text-xs px-2 py-0.5 border border-border bg-background/60"
//             >
//               {t}
//             </span>
//           ))}
//         </div>

//         <div className="flex items-center justify-between pt-3 border-t border-border">
//           <div className="flex items-center gap-3 text-xs text-muted-foreground">
//             <span className="flex items-center gap-1">
//               <Star className="h-3 w-3" />
//               {project.stars || 0}
//             </span>
//             <span className="flex items-center gap-1">
//               <GitFork className="h-3 w-3" />
//               {project.forks || 0}
//             </span>
//             {project.primary_language && (
//               <span className="flex items-center gap-1">
//                 <span className="h-2 w-2 rounded-full bg-primary" />
//                 {project.primary_language}
//               </span>
//             )}
//           </div>
//           <div className="flex gap-2">
//             {project.github_url && (
//               <a
//                 href={project.github_url}
//                 target="_blank"
//                 rel="noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 aria-label={`${project.name} on GitHub`}
//                 className="p-1 hover:text-primary transition-colors"
//               >
//                 <IoLogoGithub className="h-4 w-4" />
//               </a>
//             )}
//             {project.live_url && (
//               <a
//                 href={project.live_url}
//                 target="_blank"
//                 rel="noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 aria-label={`${project.name} live demo`}
//                 className="p-1 hover:text-primary transition-colors"
//               >
//                 <ExternalLink className="h-4 w-4" />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// };

// export default ProjectCard;

// import React from "react";
// import { ExternalLink, Star, GitFork } from "lucide-react";
// import { IoLogoGithub } from "react-icons/io5";

// const ProjectCard = ({ project, index, onClick }) => {
// 	// Determine thumbnail URL (priority: thumbnail_url > GitHub social preview > default)
// 	const thumbnailUrl =
// 		project.thumbnail_url ||
// 		(project.github_url ? `${project.github_url}/social_preview` : null) ||
// 		"https://placehold.co/600x400/1a1a1a/ffffff?text=No+Preview";

// 	return (
// 		<div
// 			className="group border border-border bg-card/30 hover:bg-card/60 transition-all cursor-pointer overflow-hidden"
// 			onClick={onClick}
// 		>
// 			{/* Thumbnail */}
// 			<div className="relative aspect-video overflow-hidden bg-muted">
// 				<img
// 					src={thumbnailUrl}
// 					alt={project.name}
// 					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// 					onError={(e) => {
// 						e.target.src =
// 							"https://placehold.co/600x400/1a1a1a/ffffff?text=Preview+Unavailable";
// 					}}
// 				/>

// 				{/* Category badge */}
// 				<div className="absolute top-3 left-3">
// 					<span className="text-xs px-2 py-1 bg-background/90 backdrop-blur-sm border border-border font-mono">
// 						{project.category || "Web"}
// 					</span>
// 				</div>

// 				{/* Featured badge */}
// 				{project.featured && (
// 					<div className="absolute top-3 right-3">
// 						<span className="text-xs px-2 py-1 bg-primary text-primary-foreground font-mono">
// 							FEATURED
// 						</span>
// 					</div>
// 				)}
// 			</div>

// 			{/* Content */}
// 			<div className="p-5">
// 				<h3 className="font-heading font-bold text-xl mb-2 line-clamp-1">
// 					{project.name}
// 				</h3>

// 				<p className="text-muted-foreground text-sm line-clamp-2 mb-4">
// 					{project.description || "No description available."}
// 				</p>

// 				{/* Tech stack */}
// 				{project.tech_stack && project.tech_stack.length > 0 && (
// 					<div className="flex flex-wrap gap-2 mb-4">
// 						{project.tech_stack.slice(0, 3).map((tech, i) => (
// 							<span
// 								key={i}
// 								className="text-xs px-2 py-0.5 border border-border font-mono"
// 							>
// 								{tech}
// 							</span>
// 						))}
// 						{project.tech_stack.length > 3 && (
// 							<span className="text-xs px-2 py-0.5 border border-border font-mono">
// 								+{project.tech_stack.length - 3}
// 							</span>
// 						)}
// 					</div>
// 				)}

// 				{/* Stats and links */}
// 				<div className="flex items-center justify-between pt-3 border-t border-border">
// 					<div className="flex items-center gap-3 text-xs text-muted-foreground">
// 						{project.stars > 0 && (
// 							<span className="flex items-center gap-1">
// 								<Star className="h-3 w-3" /> {project.stars}
// 							</span>
// 						)}
// 						{project.forks > 0 && (
// 							<span className="flex items-center gap-1">
// 								<GitFork className="h-3 w-3" /> {project.forks}
// 							</span>
// 						)}
// 					</div>

// 					<div className="flex items-center gap-2">
// 						{project.github_url && (
// 							<a
// 								href={project.github_url}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="p-1.5 hover:text-primary transition-colors"
// 								onClick={(e) => e.stopPropagation()}
// 							>
// 								<IoLogoGithub className="h-4 w-4" />
// 							</a>
// 						)}
// 						{project.live_url && (
// 							<a
// 								href={project.live_url}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="p-1.5 hover:text-primary transition-colors"
// 								onClick={(e) => e.stopPropagation()}
// 							>
// 								<ExternalLink className="h-4 w-4" />
// 							</a>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProjectCard;

import React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

export default function ProjectCard({ project, onClick, index }) {
	// Ensure tech_stack is an array
	const techStack = Array.isArray(project.tech_stack)
		? project.tech_stack
		: [];

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
						onError={(e) => {
							e.target.onerror = null;
							e.target.style.display = "none";
							e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                <span class="font-heading text-7xl font-bold text-primary/20">${project.name?.[0]?.toUpperCase() || "?"}</span>
              </div>`;
						}}
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
						<span className="font-heading text-7xl font-bold text-primary/20">
							{project.name?.[0]?.toUpperCase() || "?"}
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
					{techStack.slice(0, 4).map((t) => (
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
}
