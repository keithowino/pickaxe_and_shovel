import { getId } from "../../../shared/index.js";

class BlogPostPresenter {
	present(post) {
		if (!post) {
			return null;
		}

		return {
			id: getId(post),
			slug: post.slug,
			title: post.title,
			excerpt: post.excerpt,
			content: post.content,
			coverImageUrl: post.coverImageUrl ?? "",
			category: post.category
				? {
						id: getId(post.category),
						name: post.category.name,
						slug: post.category.slug,
						description: post.category.description ?? "",
						displayOrder: post.category.displayOrder ?? 0,
						active: post.category.active ?? true,
					}
				: null,
			tags: post.tags ?? [],
			type: post.type ?? "",
			status: post.status ?? "",
			publishedAt: post.publishedAt ?? null,
			readingTimeMinutes: post.readingTimeMinutes ?? null,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
		};
	}

	presentMany(posts) {
		return posts.map((post) => this.present(post));
	}
}

export default new BlogPostPresenter();
