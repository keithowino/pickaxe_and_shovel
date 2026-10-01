import {
	asyncHandler,
	success,
	error,
	validateRequest,
	HTTP_STATUS,
} from "../../../shared/index.js";

import { projectService } from "../services/index.js";

import {
	projectIdParamsSchema,
	listProjectsQuerySchema,
} from "../validators/index.js";

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest({ query: listProjectsQuerySchema }, req);

	const result = await projectService.listProjects(query);

	return success(res, result, "Projects retrieved successfully.");
});

const getStats = asyncHandler(async (req, res) => {
	const stats = await projectService.getProjectStats();

	return success(res, stats, "Project statistics retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await projectService.getProjectById(params.projectId);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project retrieved successfully.");
});

export default {
	list,
	getStats,
	getById,
};
