import { apiRequest } from "../../../lib/index.js";

export const createBlogPost = async (payload) => {
	const response = await apiRequest("/admin/blog/create", {
		method: "POST",
		body: payload,
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

	const response = await apiRequest(`/admin/blog${query ? `?${query}` : ""}`);

	return response.data;
};

export const updateBlogPost = async (id, payload) => {
	const response = await apiRequest(`/admin/blog/${id}`, {
		method: "PATCH",
		body: payload,
	});

	return response.data;
};

export const deleteBlogPost = async (id) => {
	const response = await apiRequest(`/admin/blog/${id}`, {
		method: "DELETE",
	});

	return response.data;
};
