import { Post } from "../models/index.js";

export const CATEGORY_POPULATE = {
	path: "category",
	select: "name slug description displayOrder active",
};

const createBlogPost = async (postData) => {
	const post = await Post.create(postData);
	return Post.findById(post._id).populate(CATEGORY_POPULATE).lean();
};

export const findPosts = async ({ filter = {}, page = 1, limit = 10 } = {}) => {
	const skip = (page - 1) * limit;

	return Post.find(filter)
		.populate(CATEGORY_POPULATE)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean();
};

const findPostById = async (id) => {
	return Post.findById(id).populate(CATEGORY_POPULATE).lean();
};

const updateBlogPost = async (id, updates) => {
	return Post.findByIdAndUpdate(id, updates, {
		returnDocument: "after", // return the updated document
		runValidators: true, // run the schema's validators on the update
	})
		.populate(CATEGORY_POPULATE)
		.lean();
};

const deleteBlogPost = async (id) => {
	return Post.findByIdAndDelete(id).lean();
};

export default {
	createBlogPost,
	findPosts,
	findPostById,
	updateBlogPost,
	deleteBlogPost,
};
