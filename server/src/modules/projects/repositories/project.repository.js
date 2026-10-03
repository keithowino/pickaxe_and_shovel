import { Project } from "../models/index.js";

export const CATEGORY_POPULATE = {
	path: "category",
	select: "name slug description displayOrder active",
};

/**
 * Find projects using filters, sorting, and pagination.
 *
 * Pinned projects appear first, followed by display order,
 * then creation date as a tie-breaker.
 */
export const findProjects = async ({
	filter = {},
	page = 1,
	limit = 10,
} = {}) => {
	const skip = (page - 1) * limit;

	return Project.find(filter)
		.populate(CATEGORY_POPULATE)
		.sort({
			pinned: -1,
			displayOrder: 1,
			createdAt: -1,
		})
		.skip(skip)
		.limit(limit)
		.lean();
};

/**
 * Count projects matching the supplied filter.
 */
export const countProjects = async (filter = {}) => {
	return Project.countDocuments(filter);
};

export const countProjectsByCategory = async (categoryId) => {
	return Project.countDocuments({
		category: categoryId,
	});
};

/**
 * Find a project by its MongoDB document ID.
 */
export const findProjectById = async (projectId) => {
	return Project.findById(projectId).populate(CATEGORY_POPULATE).lean();
};

/**
 * Find a project using its GitHub repository ID.
 */
export const findProjectByGithubRepoId = async (githubRepoId) => {
	return Project.findOne({ githubRepoId }).lean();
};

/**
 * Create a new project.
 */
export const createProject = async (projectData) => {
	const project = await Project.create(projectData);

	return Project.findById(project._id).populate(CATEGORY_POPULATE).lean();
};

/**
 * Update a project by its MongoDB document ID.
 */
export const updateProjectById = async (projectId, updates) => {
	return Project.findByIdAndUpdate(projectId, updates, {
		returnDocument: "after",
		runValidators: true,
	})
		.populate(CATEGORY_POPULATE)
		.lean();
};

/**
 * Retrieve the IDs of all projects.
 *
 * Used to validate that a reorder request includes
 * every project in the database.
 *
 * @returns {Promise<string[]>}
 */
export const findAllProjectIds = async () => {
	const projects = await Project.find().select("_id").lean();

	return projects.map((project) => project._id.toString());
};

/**
 * Reorder projects by assigning displayOrder values
 * based on their positions in the supplied ID list.
 *
 * Lower displayOrder values appear first.
 */
export const reorderProjects = async (orderedProjectIds) => {
	if (orderedProjectIds.length === 0) {
		return { modifiedCount: 0 };
	}

	const operations = orderedProjectIds.map((projectId, index) => ({
		updateOne: {
			filter: { _id: projectId },
			update: {
				$set: { displayOrder: index },
			},
		},
	}));

	return Project.bulkWrite(operations);
};

/**
 * Delete a project by its MongoDB document ID.
 */
export const deleteProjectById = async (projectId) => {
	return Project.findByIdAndDelete(projectId).lean();
};

/**
 * Aggregate project statistics.
 */
export const aggregateProjectStats = async (filter = {}) => {
	const [stats] = await Project.aggregate([
		{ $match: filter },
		{
			$facet: {
				totals: [
					{
						$group: {
							_id: null,
							totalProjects: { $sum: 1 },
							totalStars: { $sum: "$stars" },
							totalForks: { $sum: "$forks" },
						},
					},
				],
				categories: [
					{
						$group: {
							_id: "$category",
							count: { $sum: 1 },
						},
					},
					{ $sort: { _id: 1 } },
				],
			},
		},
	]);

	return {
		totals: stats?.totals?.[0] ?? {
			totalProjects: 0,
			totalStars: 0,
			totalForks: 0,
		},
		categories: (stats?.categories ?? []).map((item) => ({
			category: item._id,
			count: item.count,
		})),
	};
};
