import { blogPostPresenter, blogPostRepository } from "../../blog/index.js";
import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

class BlogPostService {
	async create(payload) {
		const post = await blogPostRepository.createBlogPost(payload);
		return blogPostPresenter.present(post);
	}

	async listPosts({ page, limit, status, category, tag, search } = {}) {
		const filter = {};
		if (status) filter.status = status;
		if (category) filter.category = category;
		if (tag) filter.tags = tag;
		if (search) filter.title = { $regex: search, $options: "i" };

		const posts = await blogPostRepository.findPosts({
			filter,
			page: Number(page) || 1,
			limit: Number(limit) || 10,
		});

		return blogPostPresenter.presentMany(posts);
	}

	async update(id, updates) {
		// Exclude fields the client shouldn't be able to change.
		const { slug, ...rest } = updates; // or keep slug if you want it editable

		const updated = await blogPostRepository.updateBlogPost(id, {
			...rest,
			...(slug !== undefined ? { slug } : {}),
		});

		if (!updated) {
			throw new AppError(
				"Blog post not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return blogPostPresenter.present(updated);
	}

	async remove(id) {
		const deleted = await blogPostRepository.deleteBlogPost(id);

		if (!deleted) {
			throw new AppError(
				"Blog post not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return blogPostPresenter.present(deleted);
	}
}

export default new BlogPostService();
