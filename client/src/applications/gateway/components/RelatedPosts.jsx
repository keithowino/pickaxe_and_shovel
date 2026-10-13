import { FeatureGrid, PageSection } from "../../../shared/index.js";
import BlogCard from "./BlogCard";

export default function RelatedPosts({ posts, current }) {
	const related = (posts || [])
		.filter((p) => p.slug !== current.slug)
		.slice(0, 3);

	if (related.length === 0) return null;

	return (
		<PageSection className="mt-16 pt-8 border-t border-border !pb-0">
			<div className="flex items-center gap-3 mb-8">
				<div className="h-px w-12 bg-primary" />
				<span className="serial-number text-primary">
					// RELATED FIELD NOTES
				</span>
			</div>
			<FeatureGrid>
				{related.map((p) => (
					<BlogCard key={p.id} post={p} />
				))}
			</FeatureGrid>
		</PageSection>
	);
}
