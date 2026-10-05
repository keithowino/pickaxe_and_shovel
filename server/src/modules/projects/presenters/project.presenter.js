import { getId } from "../../../shared/index.js";

class ProjectPresenter {
	present(project) {
		if (!project) {
			return null;
		}

		return {
			id: getId(project),
			githubRepoId: project.githubRepoId ?? null,
			name: project.name,
			slug: project.slug,
			description: project.description ?? "",
			githubUrl: project.githubUrl ?? "",
			liveUrl: project.liveUrl ?? "",
			thumbnailUrl: project.thumbnailUrl ?? "",
			primaryLanguage: project.primaryLanguage ?? "",
			techStack: project.techStack ?? [],
			topics: project.topics ?? [],
			category: project.category
				? {
						id: getId(project.category),
						name: project.category.name,
						slug: project.category.slug,
						description: project.category.description ?? "",
						displayOrder: project.category.displayOrder ?? 0,
						active: project.category.active ?? true,
					}
				: null,
			stars: project.stars ?? 0,
			forks: project.forks ?? 0,
			pinned: project.pinned ?? false,
			displayOrder: project.displayOrder ?? 0,
			featured: project.featured ?? false,
			published: project.published ?? false,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
		};
	}

	presentMany(projects) {
		return projects.map((project) => this.present(project));
	}
}

export default new ProjectPresenter();
