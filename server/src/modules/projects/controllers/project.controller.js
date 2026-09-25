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
	createProjectBodySchema,
	updateProjectBodySchema,
} from "../validators/index.js";

// GET /api/v1/projects
const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest({ query: listProjectsQuerySchema }, req);

	const result = await projectService.listProjects(query);

	return success(res, result, "Projects retrieved successfully.");
});

// GET /api/v1/projects/stats
const getStats = asyncHandler(async (req, res) => {
	const stats = await projectService.getProjectStats();

	return success(res, stats, "Project statistics retrieved successfully.");
});

// GET /api/v1/projects/:projectId
const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await projectService.getProjectById(params.projectId);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project retrieved successfully.");
});

// GET /api/v1/projects/admin
const listAdmin = asyncHandler(async (req, res) => {
	const { query } = validateRequest({ query: listProjectsQuerySchema }, req);

	const result = await projectService.listAdminProjects(query);

	return success(
		res,
		result,
		"Administrative projects retrieved successfully.",
	);
});

// GET /api/v1/projects/admin/stats
const getAdminStats = asyncHandler(async (req, res) => {
	const stats = await projectService.getProjectStats({
		includeUnpublished: true,
	});

	return success(
		res,
		stats,
		"Administrative project statistics retrieved successfully.",
	);
});

// GET /api/v1/projects/admin/:projectId
const getAdminById = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await projectService.getProjectById(params.projectId, {
		includeUnpublished: true,
	});

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(
		res,
		project,
		"Administrative project retrieved successfully.",
	);
});

// POST /api/v1/projects/admin
const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest({ body: createProjectBodySchema }, req);

	const project = await projectService.createProject(body);

	return success(
		res,
		project,
		"Project created successfully.",
		HTTP_STATUS.CREATED,
	);
});

// PATCH /api/v1/projects/admin/:projectId
const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: projectIdParamsSchema,
			body: updateProjectBodySchema,
		},
		req,
	);

	const project = await projectService.updateProject(params.projectId, body);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project updated successfully.");
});

// DELETE /api/v1/projects/admin/:projectId
const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await projectService.deleteProject(params.projectId);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project deleted successfully.");
});

export default {
	list,
	getStats,
	getById,
	listAdmin,
	getAdminStats,
	getAdminById,
	create,
	update,
	remove,
};
