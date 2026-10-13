import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BlogCard, fetchLatestPosts } from "../../applications/index.js";
import {
	Button,
	Heading,
	Loader,
	PageSection,
	SectionHeader,
	Text,
} from "../../shared/index.js";

const MAX_POSTS = 3;

export default function LoadFeaturedBlogPosts() {
	const [posts, setPosts] = useState(null); // null = loading

	useEffect(() => {
		let cancelled = false;

		(async () => {
			try {
				const res = await fetchLatestPosts(MAX_POSTS);
				if (!cancelled) setPosts(res || []);
			} catch (err) {
				if (!cancelled) setPosts([]);
				console.error("Failed to load latest blog posts:", err);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<>
			<PageSection className="flex flex-col items-center justify-center text-center">
				<Heading>
					Engineering field notes from the seam between software and
					mechatronics.
				</Heading>
				<Text>
					A working archive of build logs, hardware experiments, and
					engineering judgment — written for recruiters, clients, and
					curious learners who want to see how the thinking actually
					happens.
				</Text>
				<Button as={Link} to="/blog" variant="link">
					Read the archive <ArrowRight className="h-4 w-4" />
				</Button>
			</PageSection>
			<PageSection>
				{/* <div className="flex items-end justify-between mb-10 sm:mb-12 flex-wrap gap-4">
					<SectionHeader
						serial="// SELECTED ENTRIES"
						title="Recent Posts"
						align="left"
					/>
					<Link
						to="/blog"
						className="group inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
					>
						View all{" "}
						<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div> */}

				{posts === null ? (
					<div className="flex justify-center py-20">
						<Loader type="inline" />
					</div>
				) : posts.length === 0 ? (
					<p className="serial-number text-muted-foreground">
						No posts yet. Check back soon.
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{posts.slice(0, MAX_POSTS).map((post) => (
							<BlogCard key={post.id} post={post} />
						))}
					</div>
				)}
			</PageSection>
		</>
	);
}
