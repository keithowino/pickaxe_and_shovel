import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, GitFork, ArrowUpRight } from "lucide-react";

import { FeatureGrid, PageSection, SectionHeader } from "../layout/index.js";
import { Text } from "../ui/index.js";
import {
	fetchFeaturedProjects,
	fetchProjects,
} from "../../applications/index.js";

export default function LoadFeaturedProjects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadFeaturedProjects();
	}, []);

	const loadFeaturedProjects = async () => {
		try {
			// First try to get featured projects
			let featured = await fetchFeaturedProjects();

			// If no featured projects, get the 3 most recent projects
			if (featured.length === 0) {
				const allProjects = await fetchProjects();
				featured = allProjects.slice(0, 3);
			} else {
				// Limit to 3 featured projects
				featured = featured.slice(0, 3);
			}

			setProjects(featured);
		} catch (error) {
			console.error("Failed to load featured projects:", error);
			setProjects([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageSection>
			<div className="flex items-end justify-between mb-10 sm:mb-12 flex-wrap gap-4">
				<SectionHeader
					serial="// SELECTED WORKS"
					title="Recent Builds"
					align="left"
				/>
				<Link
					to="/portfolio"
					className="group inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
				>
					View all{" "}
					<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				</Link>
			</div>

			{loading ? (
				<FeatureGrid>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className="border border-border h-64 animate-pulse bg-muted"
							style={{ animationDelay: `${i * 150}ms` }}
						/>
					))}
				</FeatureGrid>
			) : projects.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="border border-dashed border-border p-10 sm:p-16 text-center"
				>
					<Text>
						No projects yet.{" "}
						<Link to="/admin" className="text-primary underline">
							Import from GitHub →
						</Link>
					</Text>
				</motion.div>
			) : (
				<FeatureGrid>
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
								{p.thumbnailUrl ? (
									<img
										src={p.thumbnailUrl}
										alt={p.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										onError={(e) => {
											e.target.onerror = null;
											e.target.style.display = "none";
											e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center font-heading text-6xl font-bold text-primary/20">${p.name?.[0]?.toUpperCase() || "?"}</div>`;
										}}
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center font-heading text-6xl font-bold text-primary/20">
										{p.name?.[0]?.toUpperCase() || "?"}
									</div>
								)}
								<div className="absolute top-3 left-3 serial-number bg-background/80 backdrop-blur px-2 py-1">
									{p.category.name || "Web development"}
								</div>

								<div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
									<div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
										<ArrowUpRight className="h-4 w-4" />
									</div>
								</div>
							</div>

							<div className="p-5">
								<h3 className="font-heading text-lg font-bold mb-2 line-clamp-1">
									{p.name}
								</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 mb-4">
									{p.description ||
										"No description available."}
								</p>
								<div className="flex items-center gap-3 text-xs text-muted-foreground">
									{p.primaryLanguage && (
										<span className="flex items-center gap-1">
											<span className="h-2 w-2 rounded-full bg-primary" />
											{p.primaryLanguage}
										</span>
									)}
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
				</FeatureGrid>
			)}
		</PageSection>
	);
}
