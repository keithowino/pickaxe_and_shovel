export function slugify(value) {
	return String(value ?? "")
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * #### .split(/\s+/)
 *
 * - Converts the string into an array.
 * - "Hello   world\nJS" > ["Hello", "world", "JS"]
 * - \s = any whitespace character
 * 		- spaces
 * 		- tabs
 * 		- new lines
 * - + = one or more
 *
 * #### .filter(Boolean)
 *
 * - Remove empty(falsy values)
 * - ["Hello", "", "world"] > ["Hello", "world"]
 *
 * #### 200
 *
 * - Assuming an average reading speed of 200 words per minute
 */
export function computeReadingTime(content) {
	const words = String(content || "")
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(value) {
	if (!value) return "";
	const d = new Date(value);
	if (isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function isScheduled(post) {
	return (
		post?.status === "PUBLISHED" &&
		!!post?.publishedAt &&
		new Date(post.publishedAt) > new Date()
	);
}

export function isLive(post) {
	return (
		post?.status === "PUBLISHED" &&
		(!post?.publishedAt || new Date(post.publishedAt) <= new Date())
	);
}
