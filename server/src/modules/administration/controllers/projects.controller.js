import {
	asyncHandler,
	error,
	HTTP_STATUS,
	projectIdParamsSchema,
	success,
	validateRequest,
} from "../../../shared/index.js";

import {
	createProjectBodySchema,
	listProjectsQuerySchema,
	reorderProjectsBodySchema,
	updateProjectBodySchema,
} from "../validators/index.js";

import { administrationProjectsService } from "../services/index.js";

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest({ query: listProjectsQuerySchema }, req);

	const result = await administrationProjectsService.listProjects(query);

	return success(
		res,
		result,
		"Administrative projects retrieved successfully.",
	);
});

const getStats = asyncHandler(async (req, res) => {
	const stats = await administrationProjectsService.getProjectStats();

	return success(
		res,
		stats,
		"Administrative project statistics retrieved successfully.",
	);
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await administrationProjectsService.getProjectById(
		params.projectId,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(
		res,
		project,
		"Administrative project retrieved successfully.",
	);
});

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest({ body: createProjectBodySchema }, req);

	const project = await administrationProjectsService.createProject(body);

	return success(
		res,
		project,
		"Project created successfully.",
		HTTP_STATUS.CREATED,
	);
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: projectIdParamsSchema,
			body: updateProjectBodySchema,
		},
		req,
	);

	const project = await administrationProjectsService.updateProject(
		params.projectId,
		body,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project updated successfully.");
});

const reorder = asyncHandler(async (req, res) => {
	const { body } = validateRequest({ body: reorderProjectsBodySchema }, req);

	const result = await administrationProjectsService.reorderProjects(
		body.orderedProjectIds,
	);

	return success(res, result, "Projects reordered successfully.");
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await administrationProjectsService.deleteProject(
		params.projectId,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project deleted successfully.");
});

export default {
	list,
	getStats,
	getById,
	create,
	update,
	reorder,
	remove,
};
