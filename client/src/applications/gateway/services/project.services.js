import { apiRequest } from "../../../lib/index.js";

/**
 * Get published projects with optional filtering and pagination.
 *
 * The backend controls the actual sort order:
 * pinned -> displayOrder -> createdAt
 */
export const fetchProjects = async (options = {}) => {
	const { category, page = 1, limit = 100 } = options;

	const searchParams = new URLSearchParams();

	searchParams.set("page", page);
	searchParams.set("limit", limit);

	if (category && category !== "All") {
		searchParams.set("category", category);
	}

	try {
		const response = await apiRequest(
			`/projects?${searchParams.toString()}`,
		);

		return response.data.projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

/**
 * Get a single published project by its MongoDB ID.
 */
export const fetchProjectById = async (projectId) => {
	try {
		const response = await apiRequest(`/projects/${projectId}`);

		return response.data;
	} catch (error) {
		console.error("Error fetching project:", error);
		throw error;
	}
};

/**
 * Get featured published projects.
 */
export const fetchFeaturedProjects = async () => {
	try {
		const response = await apiRequest("/projects?featured=true&limit=100");

		return response.data.projects;
	} catch (error) {
		console.error("Error fetching featured projects:", error);
		return [];
	}
};

/**
 * Get published projects belonging to a category.
 */
export const fetchProjectsByCategory = async (category) => {
	try {
		const searchParams = new URLSearchParams({
			category,
			limit: "100",
		});

		const response = await apiRequest(
			`/projects?${searchParams.toString()}`,
		);

		return response.data.projects;
	} catch (error) {
		console.error(`Error fetching ${category} projects:`, error);
		return [];
	}
};

/**
 * Get public project statistics.
 */
export const getProjectStats = async () => {
	try {
		const response = await apiRequest("/projects/stats");

		const { totals, categories } = response.data;

		return {
			total: totals.totalProjects,
			categories: categories.reduce((result, item) => {
				result[item.category] = item.count;
				return result;
			}, {}),
			totalStars: totals.totalStars,
			totalForks: totals.totalForks,
		};
	} catch (error) {
		console.error("Error getting project stats:", error);

		return {
			total: 0,
			categories: {},
			totalStars: 0,
			totalForks: 0,
		};
	}
};
