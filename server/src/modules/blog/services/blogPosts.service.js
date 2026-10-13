import { blogPostRepository } from "../repositories/index.js";
import { blogPostPresenter } from "../presenters/index.js";

class BlogPostsService {
	async list({ page, limit, category, tag, search } = {}) {
		const filter = {
			status: "PUBLISHED",
			publishedAt: { $lte: new Date() }, // lazy scheduled publishing
		};

		if (category) filter.category = category;
		if (tag) filter.tags = tag;
		if (search) filter.title = { $regex: search, $options: "i" };

		const posts = await blogPostRepository.findPosts({
			filter,
			page: Number(page) || 1,
			limit: Number(limit) || 9,
		});

		return blogPostPresenter.presentMany(posts);
	}

	async getBySlug(slug) {
		const post = await blogPostRepository.findPostBySlug(slug, {
			status: "PUBLISHED",
			publishedAt: { $lte: new Date() },
		});

		return blogPostPresenter.present(post);
	}
}

export default new BlogPostsService();
