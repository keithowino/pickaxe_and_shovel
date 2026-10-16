import mongoose from "mongoose";

import { blogCategoryRepository } from "../repositories/index.js";

import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	slugify,
} from "../../../shared/index.js";
import { blogPostCategoryPresenter } from "../presenters/index.js";

class BlogCategoryService {
	/**
	 * Helper functions
	 */
	throwValidation(message, details = null) {
		throw new AppError(
			message,
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.VALIDATION_ERROR,
			details,
		);
	}

	throwNotFound(message) {
		throw new AppError(
			message,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	throwConflict(message) {
		throw new AppError(message, HTTP_STATUS.CONFLICT, ErrorCodes.CONFLICT);
	}

	isDuplicateKeyError(error) {
		return error?.code === 11000;
	}

	assertValidId(id) {
		if (!mongoose.isValidObjectId(id)) {
			this.throwValidation("Invalid blog category ID.");
		}
	}

	normalizeCategoryInput(input) {
		const name = input.name.trim();
		const slug = slugify(name);

		if (!slug) {
			this.throwValidation(
				"The category name must contain letters or numbers.",
			);
		}

		return {
			...input,
			name,
			slug,
		};
	}

	/**
	 * Public functions
	 */
	async listBlogCategories({ includeInactive = false } = {}) {
		const result = await blogCategoryRepository.findBlogCategories({
			active: includeInactive ? undefined : true,
		});

		return blogPostCategoryPresenter.presentCollection(result);
	}

	async getBlogCategoryById(id) {
		this.assertValidId(id);

		const category = await blogCategoryRepository.findBlogCategoryById(id);

		if (!category) {
			this.throwNotFound("Blog category not found.");
		}

		return blogPostCategoryPresenter.present(category);
	}

	async createBlogCategory(input) {
		const data = this.normalizeCategoryInput(input);

		try {
			const existing =
				await blogCategoryRepository.findBlogCategoryBySlug(data.slug);

			if (existing) {
				this.throwConflict(
					"A blog category with this name already exists.",
				);
			}

			const result =
				await blogCategoryRepository.createBlogCategory(data);

			return blogPostCategoryPresenter.present(result);
		} catch (error) {
			if (this.isDuplicateKeyError(error)) {
				this.throwConflict(
					"A blog category with this name already exists.",
				);
			}

			throw error;
		}
	}

	async updateBlogCategory(id, input) {
		this.assertValidId(id);

		const existing = await blogCategoryRepository.findBlogCategoryById(id);

		if (!existing) {
			this.throwNotFound("Blog category not found.");
		}

		// Slugs are generated on creation and cannot be changed later.
		const { slug: _ignoredSlug, ...updates } = input;

		if (updates.name !== undefined) {
			updates.name = updates.name.trim();

			if (!updates.name) {
				this.throwValidation("Category name cannot be empty.");
			}
		}

		try {
			const result = await blogCategoryRepository.updateBlogCategoryById(
				id,
				updates,
			);

			return blogPostCategoryPresenter.present(result);
		} catch (error) {
			if (this.isDuplicateKeyError(error)) {
				this.throwConflict(
					"A blog category with this name already exists.",
				);
			}

			throw error;
		}
	}

	async setBlogCategoryActive(id, active) {
		this.assertValidId(id);

		const category = await blogCategoryRepository.updateBlogCategoryById(
			id,
			{
				active,
			},
		);

		if (!category) {
			this.throwNotFound("Blog category not found.");
		}

		return blogPostCategoryPresenter.present(category);
	}

	async deleteBlogCategory(id) {
		this.assertValidId(id);

		const category = await blogCategoryRepository.findBlogCategoryById(id);

		if (!category) {
			this.throwNotFound("Blog category not found.");
		}

		const postCount =
			await blogCategoryRepository.countBlogPostsByCategory(id);

		if (postCount > 0) {
			this.throwConflict(
				"This category is assigned to blog posts. Deactivate it instead.",
			);
		}

		// this.throwValidation(
		// 	"Category deletion is not enabled yet. Deactivate the category instead.",
		// );
		await blogCategoryRepository.deleteBlogCategoryById(id);
	}
}

export default new BlogCategoryService();
