import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	slugify,
} from "../../../shared/index.js";
import {
	projectNavigationPresenter,
	projectPresenter,
} from "../presenters/index.js";
import {
	projectCategoryRepository,
	projectRepository,
} from "../repositories/index.js";

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

	async validateProjectCategory(categoryId) {
		if (!categoryId) {
			return;
		}

		const category = await projectCategoryRepository.findById(categoryId);

		if (!category) {
			throw new AppError(
				"Project category not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!category.active) {
			throw new AppError(
				"Project category is inactive.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}
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
			projects: projectPresenter.presentMany(projects),
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

		return projectPresenter.present(project);
	}

	async getProjectBySlug(slug, { includeUnpublished = false } = {}) {
		const project = await projectRepository.findProjectBySlug(slug);

		if (!project) {
			return null;
		}

		if (!includeUnpublished && !project.published) {
			return null;
		}

		return projectPresenter.present(project);
	}

	/**
	 * Get the complete public context for a project detail page.
	 *
	 * The project itself is identified by its stable slug.
	 * Previous/next navigation follows the canonical portfolio ordering.
	 * Related projects are published projects from the same category,
	 * excluding the current project and limited to three.
	 */
	async getProjectDetailBySlug(slug) {
		const project = await projectRepository.findProjectBySlug(slug);

		if (!project || !project.published) {
			return null;
		}

		const orderedProjects =
			await projectRepository.findPublishedProjectsForNavigation();

		const currentIndex = orderedProjects.findIndex(
			(item) => item._id.toString() === project._id.toString(),
		);

		const previousProject =
			currentIndex > 0 ? orderedProjects[currentIndex - 1] : null;

		const nextProject =
			currentIndex >= 0 && currentIndex < orderedProjects.length - 1
				? orderedProjects[currentIndex + 1]
				: null;

		const relatedProjects = orderedProjects
			.filter(
				(item) =>
					item._id.toString() !== project._id.toString() &&
					item.category?._id?.toString() ===
						project.category?._id?.toString(),
			)
			.slice(0, 3);

		return {
			project: projectPresenter.present(project),

			navigation: {
				previous:
					projectNavigationPresenter.presentNavigation(
						previousProject,
					),
				next: projectNavigationPresenter.presentNavigation(nextProject),
			},

			relatedProjects:
				projectNavigationPresenter.presentCollection(relatedProjects),
		};
	}

	/**
	 * Create a project.
	 */
	async createProject(projectData) {
		await this.validateProjectCategory(projectData.category);

		const slug = slugify(projectData.name);

		if (!slug) {
			throw new AppError(
				"A valid project name is required to generate a slug.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		const project = await projectRepository.createProject({
			...projectData,
			slug,
		});

		return projectPresenter.present(project);
	}

	/**
	 * Update a project.
	 */
	async updateProject(projectId, updates) {
		const project = await projectRepository.findProjectById(projectId);

		if (!project) {
			throw new AppError(
				"Project not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		await this.validateProjectCategory(updates.category);

		const updatedProject = await projectRepository.updateProjectById(
			projectId,
			updates,
		);

		return projectPresenter.present(updatedProject);
	}

	/**
	 * Delete a project.
	 */
	async deleteProject(projectId) {
		const project = await projectRepository.findProjectById(projectId);

		if (!project) {
			throw new AppError(
				"Project not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return projectRepository.deleteProjectById(projectId);
	}

	/**
	 * Reorder projects after validating the supplied IDs.
	 *
	 * The request must contain every project ID in the database.
	 *
	 * @param {string[]} orderedProjectIds
	 * @returns {Promise<object>}
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

		// 3. Retrieve every project ID from the database.
		const existingProjectIds = await projectRepository.findAllProjectIds();

		const existingIdsSet = new Set(existingProjectIds);

		// 4. Check whether any submitted IDs do not exist.
		const hasUnknownIds = orderedProjectIds.some(
			(projectId) => !existingIdsSet.has(projectId),
		);

		if (hasUnknownIds) {
			throw new AppError(
				"One or more projects could not be found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		// 5. Check whether any existing projects were omitted.
		const hasOmittedProjects =
			orderedProjectIds.length !== existingProjectIds.length;

		if (hasOmittedProjects) {
			throw new AppError(
				"All project IDs must be included when reordering projects.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		// 6. Perform the ordering operation.
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
