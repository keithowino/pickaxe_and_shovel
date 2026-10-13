import { useEffect, useMemo, useState } from "react";
// import { base44 } from "@/api/base44Client";
import { EmptyResponse, MetaDataInsert, isLive } from "../../../lib/index.js";
import {
	FeatureGrid,
	Hero,
	LoadHeroTitle,
	Loader,
} from "../../../shared/index.js";
import { BlogCard, BlogFilters, BlogPagination } from "../components/index.js";
import { fetchPosts } from "../services/index.js";

const PAGE_SIZE = 9;

const heroTitle = () => {
	return (
		<>
			<span className="text-secondary">The</span> Archive.
		</>
	);
};

/**
 * Fetching all posts (limit 200) then filtering client-side
 * is fine at your current scale but doesn't scale. When you
 * have 50+ posts, move filtering to the server
 * (?category=&tag=&page=) and stop fetching everything. The
 * server already supports it — you just chose the client-side
 * path for v1. That's a reasonable choice; just flag it.
 */
export default function BlogPage() {
	const [all, setAll] = useState([]);
	const [category, setCategory] = useState("");
	const [tag, setTag] = useState("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			setLoading(true);
			try {
				// Server filters published + live; client just paginates.
				const res = await fetchPosts({ limit: 200 });
				if (!cancelled) setAll(res || []);
			} catch (err) {
				if (!cancelled) setAll([]);
				console.error("Failed to load blog posts:", err);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	const categories = useMemo(() => {
		const seen = new Map();
		(all || []).forEach((p) => {
			if (p.category?.id) seen.set(p.category.id, p.category);
		});
		return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
	}, [all]);

	const tags = useMemo(() => {
		const set = new Set();
		(all || []).forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
		return [...set].sort();
	}, [all]);

	const filtered = useMemo(
		() =>
			(all || []).filter((p) => {
				if (category && p.category?.id !== category) return false;
				if (tag && !(p.tags || []).includes(tag)) return false;
				return true;
			}),
		[all, category, tag],
	);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pageItems = filtered.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	useEffect(() => {
		setPage(1);
	}, [category, tag]);

	return (
		<>
			<MetaDataInsert title="Blog" />

			<Hero
				metadata={{
					floatingTools: false,
					serial: "// SPEC SHEET · 02",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"Build logs, hardware experiments, and engineering judgment — catalogued for the record.",
				}}
			/>

			<section className="container mx-auto px-6 lg:px-10 py-12">
				<BlogFilters
					categories={categories}
					tags={tags}
					category={category}
					tag={tag}
					onCategoryChange={setCategory}
					onTagChange={setTag}
				/>

				{/* {all === null ? ( */}
				{loading ? (
					<Loader />
				) : pageItems.length === 0 ? (
					<EmptyResponse
						load={{ desc: "No posts yet. Check back soon." }}
					/>
				) : (
					<>
						<FeatureGrid>
							{pageItems.map((p) => (
								<BlogCard key={p.id} post={p} />
							))}
						</FeatureGrid>
						<BlogPagination
							page={currentPage}
							totalPages={totalPages}
							onChange={setPage}
						/>
					</>
				)}
			</section>
		</>
	);
}
