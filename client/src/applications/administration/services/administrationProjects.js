import { apiRequest } from "../../../lib/index.js";

export const getAdminProjects = async (params = {}) => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.set(key, value);
		}
	});

	const query = searchParams.toString();

	const response = await apiRequest(
		`/admin/projects${query ? `?${query}` : ""}`,
	);

	return response.data;
};

// export const getAdminProject = async (projectId) => {
// 	return apiRequest(`/admin/projects/${projectId}`);
// };

// export const createAdminProject = async (data) => {
// 	return apiRequest("/admin/projects", {
// 		method: "POST",
// 		body: data,
// 	});
// };

export const updateAdminProject = async (projectId, updates) => {
	const response = await apiRequest(`/admin/projects/${projectId}`, {
		method: "PATCH",
		body: updates,
	});

	return response.data;
};

export const deleteAdminProject = async (projectId) => {
	await apiRequest(`/admin/projects/${projectId}`, {
		method: "DELETE",
	});
};

// export const reorderAdminProjects = async (orderedProjectIds) => {
// 	return apiRequest("/admin/projects/order", {
// 		method: "PATCH",
// 		body: {
// 			orderedProjectIds,
// 		},
// 	});
// };

// export const getAdminProjectStats = async () => {
// 	return apiRequest("/admin/projects/stats");
// };

export const refreshAdminProject = async (projectId) => {
	const response = await apiRequest(
		`/admin/github/repositories/${projectId}/refresh`,
		{
			method: "POST",
		},
	);

	return response.data;
};
