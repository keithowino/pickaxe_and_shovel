import { apiRequest } from "../../../lib/index.js";

export const fetchPosts = async (params = {}) => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.set(key, value);
		}
	});

	const query = searchParams.toString();
	const response = await apiRequest(`/blog${query ? `?${query}` : ""}`);

	return response.data;
};

export const fetchPost = async (slug) => {
	const response = await apiRequest(`/blog/${slug}`);

	return response.data;
};

export const fetchLatestPosts = async (limit = 3) => {
	return fetchPosts({ limit });
};
