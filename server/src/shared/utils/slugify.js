/**
 * Convert a human-readable value into a URL-safe slug.
 *
 * Examples:
 * "R4 Hub"            -> "r4-hub"
 * "FastMCP Course"    -> "fastmcp-course"
 * "Pickaxe & Shovel"  -> "pickaxe-shovel"
 */
export default function slugify(value) {
	return String(value ?? "")
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
