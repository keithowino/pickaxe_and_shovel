import { apiRequest } from "../../../lib/index.js";

/**
 * Retrieve the authenticated administrator's GitHub connection status.
 *
 * The GitHub token is never returned by the API.
 */
export const getGitHubSettings = async () => {
	const response = await apiRequest("/admin/github/settings");

	return response.data;
};

/**
 * Connect GitHub using a personal access token.
 *
 * The backend validates the token, determines the GitHub username,
 * encrypts the token, and stores it.
 */
export const saveGitHubSettings = async (token) => {
	const response = await apiRequest("/admin/github/settings", {
		method: "PUT",
		body: {
			token,
		},
	});

	return response.data;
};

/**
 * Disconnect the authenticated administrator's GitHub account.
 */
export const disconnectGitHub = async () => {
	const response = await apiRequest("/admin/github/settings", {
		method: "DELETE",
	});

	return response.data;
};

/**
 * Retrieve repositories belonging to the connected GitHub account.
 *
 * The backend uses the securely stored GitHub token.
 */
export const getGitHubRepositories = async () => {
	const response = await apiRequest("/admin/github/repositories");

	return response.data;
};

/**
 * Import or update multiple GitHub repositories.
 *
 * @param {number[]} githubRepoIds
 */
export const importGitHubRepositories = async (githubRepoIds) => {
	const response = await apiRequest("/admin/github/repositories/import", {
		method: "POST",
		body: {
			githubRepoIds,
		},
	});

	return response.data;
};
