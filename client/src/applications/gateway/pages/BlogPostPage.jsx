import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { base44 } from "@/api/base44Client";
import { ArrowLeft } from "lucide-react";
import {
	BlogPostBody,
	BlogPostHeader,
	RelatedPosts,
} from "../components/index.js";
import { isLive } from "../../../lib/blogUtils.js";
import { fetchPost, fetchPosts } from "../services/index.js";
import { Loader } from "../../../shared/index.js";
import { EmptyResponse, MetaDataInsert } from "../../../lib/index.js";

export default function BlogPostPage() {
	const { slug } = useParams();
	const [post, setPost] = useState(null);
	const [related, setRelated] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			setLoading(true);
			setPost(null);
			setRelated([]);
			setNotFound(false);

			try {
				const found = await fetchPost(slug);
				if (cancelled) return;

				if (!found) {
					setNotFound(true);
					return;
				}

				setPost(found);

				// Fetch related posts (same category), unless the post has no category.
				if (found.category?.id) {
					const rel = await fetchPosts({
						category: found.category.id,
						limit: 4,
					});
					if (cancelled) return;

					// Server may include the current post; filter it out and cap at 3.
					setRelated(
						(rel || [])
							.filter((p) => p.slug !== found.slug)
							.slice(0, 3),
					);
				}
			} catch (err) {
				if (cancelled) return;
				if (err?.status === 404) {
					setNotFound(true);
				} else {
					console.error("Failed to load post:", err);
					setNotFound(true);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [slug]);

	if (loading) return <Loader />;

	if (notFound || !post) {
		return (
			<>
				<MetaDataInsert title="Not Found" />
				<EmptyResponse
					load={{
						code: "// 404 — NOT FOUND",
						desc: "This field note doesn't exist.",
						ref: { to: "/blog", label: "← BACK TO ARCHIVE" },
					}}
				/>
			</>
		);
	}

	return (
		<>
			<MetaDataInsert title={`${post.title} // Field Notes`} />

			<article className="container mx-auto px-6 lg:px-10 py-12 max-w-3xl">
				<Link
					to="/blog"
					className="serial-number text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-8"
				>
					<ArrowLeft className="h-4 w-4" /> BACK TO ARCHIVE
				</Link>
				<BlogPostHeader post={post} />
				<BlogPostBody content={post.content} />
				<RelatedPosts posts={related} current={post} />
			</article>
		</>
	);
}
