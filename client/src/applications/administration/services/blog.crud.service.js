import { apiRequest } from "../../../lib/index.js";

 */
export const createBlogPost = async (payload) => {
	const response = await apiRequest("/admin/blog", {
		method: "POST",
		body: {
			payload,
		},
	});

	return response.data;
};

export const fetchAdminBlogPosts = async (params = {}) => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.set(key, value);
		}
	});

	const query = searchParams.toString();

	const response = await apiRequest(
		`/admin/blog-posts${query ? `?${query}` : ""}`,
	);

	return response.data;
};
