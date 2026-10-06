/**
 * Escape user-provided content before placing it into HTML.
 *
 * @param {string} value
 * @returns {string}
 */
export const escapeHtml = (value) => {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
};
