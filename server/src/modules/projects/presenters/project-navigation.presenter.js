import { getId } from "../../../shared/index.js";

/**
 * The full project presenter contains fields
 * we don't need for a previous/next card.
 */
class ProjectNavigationPresenter {
	presentCategory(category) {
		if (!category) {
			return null;
		}

		return {
			id: getId(category),
			name: category.name,
			slug: category.slug,
		};
	}

	/**
	 * Present the minimal project representation required by
	 * previous/next navigation and related-project cards.
	 */
	presentNavigation(project) {
		if (!project) {
			return null;
		}

		return {
			id: getId(project),
			name: project.name,
			slug: project.slug,
			thumbnailUrl: project.thumbnailUrl ?? "",
			category: this.presentCategory(project.category),
		};
	}

	presentCollection(projects) {
		return projects.map((project) => this.presentNavigation(project));
	}
}

export default new ProjectNavigationPresenter();
