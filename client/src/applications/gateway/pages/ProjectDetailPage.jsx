import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MetaDataInsert } from "../../../lib/index.js";
import { BadProjectRequest, Loader } from "../../../shared/index.js";

import { fetchProjectBySlug } from "../services/index.js";
import {
	ProjectHero,
	ProjectNavigation,
	ProjectOverview,
	ProjectStats,
	ProjectTechnology,
	RelatedProjects,
} from "../components/index.js";

/**
 * The next media evolution should happen only when we
 * have a real requirement for multiple assets:
 * - heroMedia
 * - screenshots[]
 * - videos[]
 */
export default function ProjectDetailPage() {
	const { slug } = useParams();

	const [detail, setDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	/**
	 *  I don't understand what is going on in this effect
	 */
	useEffect(() => {
		let cancelled = false;

		const loadProject = async () => {
			setLoading(true);
			setError(null);

			try {
				const projectDetail = await fetchProjectBySlug(slug);

				if (!cancelled) {
					setDetail(projectDetail);
				}
			} catch (err) {
				console.error("Failed to load project:", err);

				if (!cancelled) {
					setError(
						"Unable to load this project. It may no longer be available.",
					);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		loadProject();

		/**
		 * Flabbergasted i am???
		 */
		return () => {
			cancelled = true;
		};
	}, [slug]);

	if (loading) {
		return (
			<div>
				<MetaDataInsert title="Loading Project" />

				<Loader />
			</div>
		);
	}

	if (error || !detail?.project) {
		return (
			<>
				<MetaDataInsert title="Project Not Found" />

				<BadProjectRequest
					redirect={{
						to: "/portfolio",
						label: "← Back to Portfolio",
					}}
				/>
			</>
		);
	}

	const { project, navigation, relatedProjects } = detail;

	return (
		<>
			<MetaDataInsert title={project.name} />

			<ProjectHero project={project} />

			<ProjectOverview project={project} />

			<ProjectStats project={project} />

			<ProjectTechnology project={project} />

			<RelatedProjects projects={relatedProjects} />

			<ProjectNavigation navigation={navigation} />
		</>
	);
}
