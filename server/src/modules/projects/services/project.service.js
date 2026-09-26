import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";
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
	 * Reorder projects after validating the supplied IDs.
	 *
	 * @param {string[]} orderedProjectIds
	 * @returns {Promise<object>}
	 *
	 * This implementation performs one lookup per project ID.
	 * That is acceptable for an initial small-scale
	 * implementation, but a single bulk existence query would
	 * be more efficient for larger lists.
	 */
	async reorderProjects(orderedProjectIds) {
		// 1. Validate the input structure.
		if (
			!Array.isArray(orderedProjectIds) ||
			orderedProjectIds.length === 0
		) {
			throw new AppError(
				"A non-empty array of project IDs is required.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		// 2. Prevent duplicate project IDs.
		const uniqueIds = new Set(orderedProjectIds);

		if (uniqueIds.size !== orderedProjectIds.length) {
			throw new AppError(
				"Duplicate project IDs are not allowed.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		// 3. Verify that every project exists.
		const projects = await Promise.all(
			orderedProjectIds.map((projectId) =>
				projectRepository.findProjectById(projectId),
			),
		);

		const missingProjects = projects.some((project) => project === null);

		if (missingProjects) {
			throw new AppError(
				"One or more projects could not be found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		// 4. Perform the ordering operation.
		return projectRepository.reorderProjects(orderedProjectIds);
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
