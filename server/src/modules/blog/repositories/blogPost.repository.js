import { Post } from "../models/index.js";

export const CATEGORY_POPULATE = {
	path: "category",
	select: "name slug description displayOrder active",
};

/**
 * Create a new project.
 */
const createBlogPost = async (postData) => {
	const post = await Post.create(postData);

	return Post.findById(post._id).populate(CATEGORY_POPULATE).lean();
};

export default { createBlogPost };
