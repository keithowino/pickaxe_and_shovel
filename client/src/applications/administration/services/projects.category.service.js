import { apiRequest } from "../../../lib/index.js";

export const fetchProjectCategories = async () => {
	const response = await apiRequest("/project-categories");

	return response.data;
};

export const createProjectCategory = async (categoryData) => {
	const response = await apiRequest("/project-categories", {
		method: "POST",
		body: categoryData,
	});

	return response.data;
};

export const updateProjectCategory = async (categoryId, updates) => {
	const response = await apiRequest(`/project-categories/${categoryId}`, {
		method: "PATCH",
		body: updates,
	});

	return response.data;
};

export const deleteProjectCategory = async (categoryId) => {
	const response = await apiRequest(`/project-categories/${categoryId}`, {
		method: "DELETE",
	});

	return response.data;
};
