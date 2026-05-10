// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import MetaDataInsert from "../lib/MetaDataInsert";
// import { fetchProjects } from "../services/projectServices";
// import ProjectCard from "../components/portfolio/ProjectCard";
// import ProjectModal from "../components/portfolio/ProjectModal";

// const CATEGORIES = [
// 	"All",
// 	"Web",
// 	"Mechatronics",
// 	"IoT",
// 	"Robotics",
// 	"In Progress",
// ];

// const Portfolio = () => {
// 	const [projects, setProjects] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const [category, setCategory] = useState("All");
// 	const [selected, setSelected] = useState(null);

// 	useEffect(() => {
// 		loadProjects();
// 	}, []);

// 	const loadProjects = async () => {
// 		setLoading(true);
// 		setError(null);
// 		try {
// 			const data = await fetchProjects({
// 				sortBy: "createdAt",
// 				sortOrder: "desc",
// 			});
// 			setProjects(data);
// 		} catch (err) {
// 			console.error("Failed to load projects:", err);
// 			setError("Failed to load projects. Please try again later.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const filtered = useMemo(
// 		() =>
// 			category === "All"
// 				? projects
// 				: projects.filter((p) => (p.category || "Web") === category),
// 		[projects, category],
// 	);

// 	// Get category counts for display
// 	const getCategoryCount = (cat) => {
// 		if (cat === "All") return projects.length;
// 		return projects.filter((p) => (p.category || "Web") === cat).length;
// 	};

// 	return (
// 		<div>
// 			<MetaDataInsert title={"Portfolio"} />

// 			{/* Hero Section */}
// 			<section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
// 				<motion.div
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.5 }}
// 				>
// 					<div className="serial-number text-primary mb-4">
// 						// SPEC GALLERY · 03
// 					</div>
// 					<h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
// 						The <span className="text-primary">Portfolio</span>.
// 					</h1>
// 					<p className="max-w-2xl text-lg text-muted-foreground">
// 						Live-synced from GitHub. Every build, logged and
// 						labelled like a production run.
// 					</p>
// 				</motion.div>
// 			</section>

// 			{/* Filter bar */}
// 			{!loading && projects.length > 0 && (
// 				<section className="max-w-7xl mx-auto px-6 lg:px-10 pb-6">
// 					<div className="flex flex-wrap gap-2 border-b border-border pb-4">
// 						{CATEGORIES.map((c) => {
// 							const count = getCategoryCount(c);
// 							// Only show categories that have projects (except "All")
// 							if (c !== "All" && count === 0) return null;

// 							return (
// 								<button
// 									key={c}
// 									onClick={() => setCategory(c)}
// 									className={`px-4 py-2 text-sm font-medium border transition-all ${
// 										category === c
// 											? "bg-primary text-primary-foreground border-primary"
// 											: "border-border hover:border-primary"
// 									}`}
// 								>
// 									{c}
// 									<span className="ml-2 text-xs opacity-70">
// 										({count})
// 									</span>
// 								</button>
// 							);
// 						})}
// 					</div>
// 				</section>
// 			)}

// 			{/* Projects Grid */}
// 			<section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
// 				{loading ? (
// 					// Loading skeletons with animation
// 					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
// 						{[1, 2, 3, 4, 5, 6].map((i) => (
// 							<motion.div
// 								key={i}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ delay: i * 0.05 }}
// 								className="border border-border h-96 animate-pulse bg-muted"
// 							/>
// 						))}
// 					</div>
// 				) : error ? (
// 					// Error state
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						className="border border-destructive/50 bg-destructive/5 p-16 text-center"
// 					>
// 						<div className="serial-number text-destructive mb-4">
// 							ERROR // CONNECTION FAILED
// 						</div>
// 						<h3 className="font-heading text-2xl font-bold mb-3">
// 							Unable to load projects
// 						</h3>
// 						<p className="text-muted-foreground mb-6">{error}</p>
// 						<button
// 							onClick={loadProjects}
// 							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
// 						>
// 							Retry
// 						</button>
// 					</motion.div>
// 				) : filtered.length === 0 ? (
// 					// Empty state
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						className="border border-dashed border-border p-16 text-center"
// 					>
// 						<div className="serial-number text-muted-foreground mb-4">
// 							NO RECORDS FOUND
// 						</div>
// 						<h3 className="font-heading text-2xl font-bold mb-3">
// 							The workshop is quiet.
// 						</h3>
// 						<p className="text-muted-foreground mb-6">
// 							{category === "All"
// 								? "No projects have been imported yet."
// 								: `No projects found in the "${category}" category.`}
// 						</p>
// 						<Link
// 							to="/admin"
// 							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
// 						>
// 							Go to Admin → Import from GitHub
// 						</Link>
// 					</motion.div>
// 				) : (
// 					// Projects grid
// 					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
// 						{filtered.map((p, i) => (
// 							<ProjectCard
// 								key={p.id}
// 								project={p}
// 								index={i}
// 								onClick={() => setSelected(p)}
// 							/>
// 						))}
// 					</div>
// 				)}
// 			</section>

// 			{/* Project Modal */}
// 			<ProjectModal
// 				project={selected}
// 				onClose={() => setSelected(null)}
// 			/>
// 		</div>
// 	);
// };

// export default Portfolio;

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MetaDataInsert from "../lib/MetaDataInsert";
import { fetchProjects } from "../services/projectServices";
import ProjectCard from "../components/portfolio/ProjectCard";
import ProjectModal from "../components/portfolio/ProjectModal";

const CATEGORIES = [
	"All",
	"Web",
	"Mechatronics",
	"IoT",
	"Robotics",
	"In Progress",
];

const Portfolio = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [category, setCategory] = useState("All");
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await fetchProjects({
				sortBy: "createdAt",
				sortOrder: "desc",
			});
			setProjects(data);
		} catch (err) {
			console.error("Failed to load projects:", err);
			setError("Failed to load projects. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const filtered = useMemo(
		() =>
			category === "All"
				? projects
				: projects.filter((p) => (p.category || "Web") === category),
		[projects, category],
	);

	// Retry button handler
	const handleRetry = () => {
		loadProjects();
	};

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
						Live-synced from GitHub. Every build, logged and
						labelled like a production run.
					</p>
				</div>
			</section>

			{/* Filter bar - only show if we have projects or not loading */}
			{!loading && projects.length > 0 && (
				<section className="max-w-7xl mx-auto px-6 lg:px-10 pb-6">
					<div className="flex flex-wrap gap-2 border-b border-border pb-4">
						{CATEGORIES.map((c) => {
							// Count projects in each category for visual feedback
							const count =
								c === "All"
									? projects.length
									: projects.filter(
											(p) => (p.category || "Web") === c,
										).length;

							return (
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
									<span className="ml-2 text-xs opacity-70">
										({count})
									</span>
								</button>
							);
						})}
					</div>
				</section>
			)}

			<section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
				{loading ? (
					// Loading skeletons
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className="border border-border h-96 animate-pulse bg-muted"
							/>
						))}
					</div>
				) : error ? (
					// Error state
					<div className="border border-destructive/50 bg-destructive/5 p-16 text-center">
						<div className="serial-number text-destructive mb-4">
							ERROR // CONNECTION FAILED
						</div>
						<h3 className="font-heading text-2xl font-bold mb-3">
							Unable to load projects
						</h3>
						<p className="text-muted-foreground mb-6">{error}</p>
						<button
							onClick={handleRetry}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Retry
						</button>
					</div>
				) : filtered.length === 0 ? (
					// Empty state
					<div className="border border-dashed border-border p-16 text-center">
						<div className="serial-number text-muted-foreground mb-4">
							NO RECORDS FOUND
						</div>
						<h3 className="font-heading text-2xl font-bold mb-3">
							The workshop is quiet.
						</h3>
						<p className="text-muted-foreground mb-6">
							{category === "All"
								? "No projects have been imported yet."
								: `No projects found in the "${category}" category.`}
						</p>
						<Link
							to="/admin"
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Go to Admin → Import from GitHub
						</Link>
					</div>
				) : (
					// Projects grid
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
			</section>

			<ProjectModal
				project={selected}
				onClose={() => setSelected(null)}
			/>
		</div>
	);
};

export default Portfolio;
