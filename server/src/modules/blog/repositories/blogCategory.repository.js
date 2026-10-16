import { BlogCategory } from "../models/index.js";

export async function findBlogCategories({ active } = {}) {
	const filter = {};

	if (typeof active === "boolean") {
		filter.active = active;
	}

	return BlogCategory.find(filter)
		.sort({
			displayOrder: 1,
			name: 1,
		})
		.lean();
}

export async function findBlogCategoryById(id) {
	return BlogCategory.findById(id).lean();
}

export async function findBlogCategoryBySlug(slug) {
	return BlogCategory.findOne({ slug }).lean();
}

export async function createBlogCategory(data) {
	const category = await BlogCategory.create(data);

	return category.toObject();
}

export async function updateBlogCategoryById(id, updates) {
	return BlogCategory.findByIdAndUpdate(id, updates, {
		returnDocument: "after",
		runValidators: true,
	}).lean();
}

export async function countBlogPostsByCategory(categoryId) {
	// Importing the model here keeps the dependency explicit.
	const { default: Post } = await import("../models/Post.js");

	return Post.countDocuments({
		category: categoryId,
	});
}

export async function deleteBlogCategoryById(categoryId) {
	return BlogCategory.findByIdAndDelete(categoryId).exec();
}

const blogCategoryRepository = {
	findBlogCategories,
	findBlogCategoryById,
	findBlogCategoryBySlug,
	createBlogCategory,
	updateBlogCategoryById,
	countBlogPostsByCategory,
	deleteBlogCategoryById,
};

export default blogCategoryRepository;
