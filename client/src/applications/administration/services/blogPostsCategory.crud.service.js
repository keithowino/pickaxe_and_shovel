import { apiRequest } from "../../../lib/index.js";

export const fetchBlogPostCategories = async () => {
	const response = await apiRequest(
		"/admin/blog/categories?includeInactive=true",
	);

	return response.data;
};

export const updateBlogPostCategory = async (categoryId, updates) => {
	const response = await apiRequest(`/admin/blog/categories/${categoryId}`, {
		method: "PATCH",
		body: updates,
	});

	return response.data;
};

export const createBlogPostCategory = async (categoryData) => {
	const response = await apiRequest("/admin/blog/categories", {
		method: "POST",
		body: categoryData,
	});

	return response.data;
};

export const deactivateBlogPostCategory = async (categoryId, updates) => {
	const response = await apiRequest(
		`/admin/blog/categories/${categoryId}/active`,
		{
			method: "PATCH",
			body: updates,
		},
	);

	return response.data;
};

export const deleteBlogPostCategory = async (categoryId) => {
	const response = await apiRequest(`/admin/blog/categories/${categoryId}`, {
		method: "DELETE",
	});

	return response.data;
};
