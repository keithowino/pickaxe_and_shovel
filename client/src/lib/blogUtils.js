export function slugify(value) {
	return String(value ?? "")
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

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
		post?.status === "published" &&
		!!post?.publishedAt &&
		new Date(post.publishedAt) > new Date()
	);
}

export function isLive(post) {
	return (
		post?.status === "published" &&
		(!post?.publishedAt || new Date(post.publishedAt) <= new Date())
	);
}
