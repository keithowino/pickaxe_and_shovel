import { SELECT_CLASS } from "../../../lib/index.js";
import { FormLabel } from "../../../shared/index.js";

export default function BlogFilters({
	categories,
	tags,
	category,
	tag,
	onCategoryChange,
	onTagChange,
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
			<div className="flex flex-col gap-1.5 flex-1">
				<FormLabel htmlFor="postCategory">CATEGORY</FormLabel>
				<select
					value={category}
					id="postCategory"
					onChange={(e) => onCategoryChange(e.target.value)}
					className={SELECT_CLASS}
				>
					<option value="">All Categories</option>
					{categories.map((c) => (
						<option key={c.slug} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-col gap-1.5 flex-1">
				<FormLabel htmlFor="postTags">TAG</FormLabel>
				<select
					value={tag}
					id="postTags"
					onChange={(e) => onTagChange(e.target.value)}
					className={SELECT_CLASS}
				>
					<option value="">All Tags</option>
					{tags.map((t) => (
						<option key={t} value={t}>
							#{t}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
