import { blogPostPresenter, blogPostRepository } from "../../blog/index.js";

class BlogPostService {
	async create(payload) {
		const post = await blogPostRepository.createBlogPost(payload);

		return blogPostPresenter.present(post);
	}
}

export default new BlogPostService();
