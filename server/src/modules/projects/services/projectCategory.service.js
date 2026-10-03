import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	slugify,
} from "../../../shared/index.js";
import { projectCategoryPresenter } from "../presenters/index.js";
import {
	projectCategoryRepository,
	projectRepository,
} from "../repositories/index.js";

class ProjectCategoryService {
	async ensureCategoryNameIsUnique(name) {
		const exists = await projectCategoryRepository.existsByName(name);

		if (exists) {
			throw new AppError(
				`Category "${name}" already exists.`,
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	generateSlug(name) {
		return slugify(name);
	}

	async ensureSlugIsUnique(slug, currentId = null) {
		const existing = await projectCategoryRepository.findBySlug(slug);

		if (existing && existing._id.toString() !== currentId) {
			throw new AppError(
				"A project category with this slug already exists.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	async create(data) {
		await this.ensureCategoryNameIsUnique(data.name);

		const slug = this.generateSlug(data.name);

		await this.ensureSlugIsUnique(slug);

		const category = await projectCategoryRepository.create({
			...data,
			slug,
		});

		return projectCategoryPresenter.present(category);
	}

	async list(filters) {
		const categories = await projectCategoryRepository.findAll(filters);

		return projectCategoryPresenter.presentCollection(categories);
	}

	async getById(id) {
		const category = await projectCategoryRepository.findById(id);

		if (!category) {
			throw new AppError(
				"Project category not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return projectCategoryPresenter.present(category);
	}

	async update(id, data) {
		const existingCategory = await this.getById(id);

		let updates = {
			...data,
		};

		if (data.name && data.name !== existingCategory.name) {
			await this.ensureCategoryNameIsUnique(data.name);

			const slug = this.generateSlug(data.name);

			await this.ensureSlugIsUnique(slug, id);

			updates.slug = slug;
		}

		const category = await projectCategoryRepository.updateById(
			id,
			updates,
		);

		if (!category) {
			throw new AppError(
				"Project category not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return projectCategoryPresenter.present(category);
	}

	async remove(id) {
		const category = await this.getById(id);

		const projectCount =
			await projectRepository.countProjectsByCategory(id);

		if (projectCount > 0) {
			throw new AppError(
				"Project category cannot be deleted because projects are assigned to it.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		await projectCategoryRepository.deleteById(id);

		return projectCategoryPresenter.present(category);
	}
}

export default new ProjectCategoryService();
