import { Image, formatDate } from "../../../lib/index.js";
import { Heading } from "../../../shared/index.js";

export default function BlogPostHeader({ post }) {
	return (
		<header className="border-b border-border pb-8 mb-10">
			<div className="aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden bg-muted border border-border mb-8">
				<Image
					src={post.coverImageUrl}
					alt={post.title}
					fittingType="cover"
					className="w-full h-full"
				/>
			</div>

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
			<Heading level={1}>{post.title}</Heading>
			<div className="flex items-center gap-4 flex-wrap serial-number text-muted-foreground">
				<span>{formatDate(post.publishedAt)}</span>
				<span className="h-3 w-px bg-border" />
				<span>{post.readingTimeMinutes ?? 1} MIN READ</span>
				{post.tags?.length > 0 && (
					<>
						<span className="h-3 w-px bg-border" />
						<span className="flex gap-2 flex-wrap">
							{post.tags.map((t) => (
								<span
									key={t}
									className="serial-number border border-border px-3 py-2 bg-card/50"
								>
									#{t}
								</span>
							))}
						</span>
					</>
				)}
			</div>
		</header>
	);
}
