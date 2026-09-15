Likewise as the other pages, let's proceed to improve the User Experience of the following page:

```jsx
`~\client\src\applications\gateway\pages\PortfolioPage.jsx`;

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MetaDataInsert from "../../../lib/MetaDataInsert";
import {
	FeatureGrid,
	Heading,
	Hero,
	LoadHeroTitle,
	PageSection,
	Text,
} from "../../../shared/index.js";
import { fetchProjects } from "../../../services/projectServices.js";
import { ProjectCard, ProjectModal } from "../components/index.js";

const CATEGORIES = [
	"All",
	"Web",
	"Mechatronics",
	"IoT",
	"Robotics",
	"In Progress",
];

const heroTitle = () => {
	return (
		<>
			The <span className="text-primary">Portfolio</span>.
		</>
	);
};

const PortfolioPage = () => {
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

			<Hero
				metadata={{
					floatingTools: false,
					serial: "// SPEC SHEET · 03",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"Live-synced from GitHub. Every build, logged and labelled like a production run.",
				}}
			/>

			{/**
			 * Filter bar - only show if we have projects or not loading
			 */}
			{!loading && projects.length > 0 && (
				<PageSection>
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
				</PageSection>
			)}

			<PageSection>
				{loading ? (
					/**
					 * Loading skeletons
					 */
					<FeatureGrid>
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className="border border-border h-96 animate-pulse bg-muted"
							/>
						))}
					</FeatureGrid>
				) : error ? (
					// Error state
					<div className="border border-destructive/50 bg-destructive/5 p-16 text-center">
						<div className="serial-number text-destructive mb-4">
							ERROR // CONNECTION FAILED
						</div>
						<Heading level={3}>Unable to load projects</Heading>
						<Text className="mb-6">{error}</Text>
						<button
							onClick={handleRetry}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Retry
						</button>
					</div>
				) : filtered.length === 0 ? (
					/**
					 * Empty state
					 */
					<div className="border border-dashed border-border p-16 text-center">
						<div className="serial-number text-muted-foreground mb-4">
							NO RECORDS FOUND
						</div>
						<Heading level={3}>The workshop is quiet.</Heading>
						<Text className="mb-6">
							{category === "All"
								? "No projects have been imported yet."
								: `No projects found in the "${category}" category.`}
						</Text>
						<Link
							to="/admin"
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Go to Admin → Import from GitHub
						</Link>
					</div>
				) : (
					<FeatureGrid>
						{filtered.map((p, i) => (
							<ProjectCard
								key={p.id}
								project={p}
								index={i}
								onClick={() => setSelected(p)}
							/>
						))}
					</FeatureGrid>
				)}
			</PageSection>

			<ProjectModal
				project={selected}
				onClose={() => setSelected(null)}
			/>
		</div>
	);
};

export default PortfolioPage;
```

As before the goal in question is to address how various components behave from the mobile first aspect in terms of responsiveness scaling up to the wider views. in addition the UI needs some work it feels plain.

and the components connected to it:

```jsx
`~\client\src\shared\ui\typography\Text.jsx`;

import { motion } from "framer-motion";

export default function Text({ children, className = "", visuals = false }) {
	const sharedClassName =
		"text-sm sm:text-base text-muted-foreground leading-relaxed";

	if (visuals) {
		return (
			<>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className={[
						"mt-5 sm:mt-6 sm:text-lg lg:text-xl max-w-2xl",
						sharedClassName,
						className,
					].join(" ")}
				>
					{children}
				</motion.p>
			</>
		);
	}

	return <p className={[sharedClassName, className].join(" ")}>{children}</p>;
}
```

```jsx
`~\client\src\applications\gateway\components\ProjectCard.jsx`;

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { Heading, Text } from "../../../shared/index.js";

export default function ProjectCard({ project, onClick, index }) {
	/**
	 * Ensure tech_stack is an array
	 */
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
```

```jsx
`~\client\src\applications\gateway\components\ProjectModal.jsx`;

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, GitFork, ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { FeatureGrid, Heading, Text } from "../../../shared/index.js";

export default function ProjectModal({ project, onClose }) {
	useEffect(() => {
		if (!project) return;
		const handler = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [project, onClose]);

	/**
	 * Ensure tech_stack is an array
	 */
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
							<Heading className="uppercase">
								{project.name}
							</Heading>
							<Text className="mb-6">
								{project.description || "No description."}
							</Text>

							{project.notes && (
								<div className="mb-6 border-l-2 border-primary pl-4 py-1">
									<Text className="italic">
										{project.notes}
									</Text>
								</div>
							)}

							{/* Stats */}
							<FeatureGrid className="mb-8">
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
```

While on it you are allowed to fix and or modify the code especially what i have implemented that would not work as expected.
