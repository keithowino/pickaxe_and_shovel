import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MetaDataInsert } from "../../../lib/index.js";
import {
	FeatureGrid,
	Heading,
	Hero,
	LoadHeroTitle,
	PageSection,
	Text,
} from "../../../shared/index.js";
import { fetchProjects } from "../services/index.js";
import { ProjectCard } from "../components/index.js";
import { fetchProjectCategories } from "../../administration/index.js";

const ALL_CATEGORY = {
	slug: "all",
	name: "All",
};

const heroTitle = () => {
	return (
		<>
			The <span className="text-primary">Portfolio</span>.
		</>
	);
};

const PortfolioPage = () => {
	const [projects, setProjects] = useState([]);
	const [categories, setCategories] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [category, setCategory] = useState(ALL_CATEGORY.slug);

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		setLoading(true);
		setError(null);
		try {
			const [projectsData, categoriesData] = await Promise.all([
				fetchProjects(),
				fetchProjectCategories({ active: true }),
			]);

			setProjects(projectsData);
			setCategories(categoriesData);
		} catch (err) {
			console.error("Failed to load projects:", err);
			setError("Failed to load projects. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const filtered = useMemo(() => {
		if (category === ALL_CATEGORY.slug) {
			return projects;
		}

		return projects.filter(
			(project) => project.category?.slug === category,
		);
	}, [projects, category]);

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
				<PageSection className="!pt-0 sm:!pt-0">
					<div className="border-b border-border pb-4">
						<div className="flex gap-2 overflow-x-auto scrollbar-hide fade-edges-x snap-x snap-mandatory -mx-1 px-1">
							{[ALL_CATEGORY, ...categories].map((item) => {
								const count =
									item.slug === ALL_CATEGORY.slug
										? projects.length
										: projects.filter(
												(project) =>
													project.category?.slug ===
													item.slug,
											).length;

								const isActive = category === item.slug;
								const isEmptyCategory =
									count === 0 &&
									item.slug !== ALL_CATEGORY.slug;

								return (
									<button
										key={item.slug}
										onClick={() => setCategory(item.slug)}
										aria-pressed={isActive}
										className={`shrink-0 snap-start whitespace-nowrap px-4 py-2.5 text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
											isActive
												? "bg-primary text-primary-foreground border-primary"
												: isEmptyCategory
													? "border-border text-muted-foreground/50 hover:border-primary/50"
													: "border-border hover:border-primary"
										}`}
									>
										{item.name}
										<span className="ml-2 text-xs opacity-70">
											({count})
										</span>
									</button>
								);
							})}
						</div>
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
								className="border border-border h-72 sm:h-80 lg:h-96 animate-pulse bg-muted"
								style={{ animationDelay: `${(i % 3) * 150}ms` }}
							/>
						))}
					</FeatureGrid>
				) : error ? (
					<div className="border border-destructive/50 bg-destructive/5 p-8 sm:p-16  text-center">
						<div className="serial-number text-destructive mb-4">
							ERROR // CONNECTION FAILED
						</div>

						<Heading level={3}>Unable to load projects</Heading>

						<Text className="mb-6">{error}</Text>

						<button
							onClick={handleRetry}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
						>
							Retry
						</button>
					</div>
				) : filtered.length === 0 ? (
					<div className="border border-dashed border-border p-8 sm:p-16 text-center">
						<div className="serial-number text-muted-foreground mb-4">
							NO RECORDS FOUND
						</div>
						<Heading level={3}>The workshop is quiet.</Heading>

						<Text className="mb-6">
							{category === ALL_CATEGORY.slug
								? "No projects have been imported yet."
								: `No projects found in the "${category}" category.`}
						</Text>

						<Link
							to="/admin"
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
						>
							Go to Admin → Import from GitHub
						</Link>
					</div>
				) : (
					<FeatureGrid>
						{filtered.map((project, index) => (
							<ProjectCard
								key={project.id}
								project={project}
								index={index}
							/>
						))}
					</FeatureGrid>
				)}
			</PageSection>
		</div>
	);
};

export default PortfolioPage;
