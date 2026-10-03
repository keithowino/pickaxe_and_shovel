import { getId } from "../../../shared/index.js";

class ProjectCategoryPresenter {
	present(category) {
		if (!category) {
			return null;
		}

		return {
			id: getId(category),
			name: category.name,
			slug: category.slug,
			description: category.description,
			displayOrder: category.displayOrder,
			active: category.active,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
		};
	}

	presentCollection(categories) {
		return categories.map((cat) => this.present(cat));
	}
}

export default new ProjectCategoryPresenter();
