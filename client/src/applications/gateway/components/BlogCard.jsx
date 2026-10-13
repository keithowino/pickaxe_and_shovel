import { Link } from "react-router-dom";
import { Image, formatDate } from "../../../lib/index.js";
import { Heading, Text } from "../../../shared/index.js";

export default function BlogCard({ post }) {
	return (
		<Link
			to={`/blog/${post.slug}`}
			className="group block border border-border bg-card hover:border-primary transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<div className="aspect-video overflow-hidden bg-muted">
				<Image
					src={post.coverImageUrl}
					alt={post.title}
					fittingType="cover"
					className="w-full h-full grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
				/>
			</div>
			<div className="p-5 sm:p-6">
				<div className="flex items-center gap-2 mb-4 flex-wrap">
					{post.category?.name && (
						<span className="serial-number text-primary bg-primary/5 px-2 py-1">
							{post.category.name}
						</span>
					)}
					{post.type === "NOTE" && (
						<span className="serial-number text-secondary border border-secondary/30 px-2 py-1">
							FIELD NOTE
						</span>
					)}
				</div>
				<Heading
					level={4}
					className="group-hover:text-primary transition-colors line-clamp-2"
				>
					{post.title}
				</Heading>
				<Text className="line-clamp-2">{post.excerpt}</Text>
				<div className="flex items-center justify-between pt-4 border-t border-border">
					<span className="serial-number text-muted-foreground">
						{formatDate(post.publishedAt)}
					</span>
					<span className="serial-number text-muted-foreground">
						{post.readingTimeMinutes ?? 1} MIN
					</span>
				</div>
			</div>
		</Link>
	);
}
