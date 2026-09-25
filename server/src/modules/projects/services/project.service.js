// import {
// 	findProjects,
// 	countProjects,
// 	findProjectById,
// 	createProject as createProjectRecord,
// 	updateProjectById,
// 	deleteProjectById,
// 	aggregateProjectStats,
// } from "../repositories/index.js";
import { projectRepository } from "../repositories/index.js";

class ProjectService {
	/**
	 * Normalize pagination inputs.
	 */
	normalizePagination(page = 1, limit = 10) {
		const normalizedPage = Math.max(1, Number.parseInt(page, 10) || 1);
		const normalizedLimit = Math.min(
			100,
			Math.max(1, Number.parseInt(limit, 10) || 10),
		);

		return {
			page: normalizedPage,
			limit: normalizedLimit,
		};
	}

	/**
	 * Build filters for project queries.
	 */
	buildProjectFilter({
		category,
		featured,
		includeUnpublished = false,
	} = {}) {
		const filter = {};

		if (!includeUnpublished) {
			filter.published = true;
		}

		if (category) {
			filter.category = category;
		}

		if (featured !== undefined) {
			filter.featured = featured === true || featured === "true";
		}

		return filter;
	}

	/**
	 * List projects with filtering and pagination.
	 * Public listings exclude unpublished projects.
	 */
	async listProjects(options = {}) {
		const { page, limit } = this.normalizePagination(
			options.page,
			options.limit,
		);

		const filter = this.buildProjectFilter(options);

		const [projects, total] = await Promise.all([
			projectRepository.findProjects({ filter, page, limit }),
			projectRepository.countProjects(filter),
		]);

		return {
			projects,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
				hasNextPage: page * limit < total,
				hasPreviousPage: page > 1,
			},
		};
	}

	/**
	 * List all projects for administrative use.
	 * Includes unpublished projects.
	 */
	async listAdminProjects(options = {}) {
		return this.listProjects({
			...options,
			includeUnpublished: true,
		});
	}

	/**
	 * Retrieve a project by ID.
	 * Unpublished projects are hidden from public requests.
	 */
	async getProjectById(projectId, { includeUnpublished = false } = {}) {
		const project = await projectRepository.findProjectById(projectId);

		if (!project) {
			return null;
		}

		if (!includeUnpublished && !project.published) {
			return null;
		}

		return project;
	}

	/**
	 * Create a project.
	 */
	async createProject(projectData) {
		return projectRepository.createProject(projectData);
	}

	/**
	 * Update a project.
	 */
	async updateProject(projectId, updates) {
		return projectRepository.updateProjectById(projectId, updates);
	}

	/**
	 * Delete a project.
	 */
	async deleteProject(projectId) {
		return projectRepository.deleteProjectById(projectId);
	}

	/**
	 * Get project statistics.
	 * Public statistics include published projects only.
	 */
	async getProjectStats({ includeUnpublished = false } = {}) {
		const filter = includeUnpublished ? {} : { published: true };

		return projectRepository.aggregateProjectStats(filter);
	}
}

export default new ProjectService();
