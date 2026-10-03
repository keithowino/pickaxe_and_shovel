import { projectCategoryService } from "../services/index.js";

import {
	createProjectCategorySchema,
	updateProjectCategorySchema,
	projectCategoryIdSchema,
	projectCategoryQuerySchema,
} from "../validators/index.js";

import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../shared/index.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createProjectCategorySchema,
		},
		req,
	);

	const category = await projectCategoryService.create(body);

	return success(res, category, "Project category created successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: projectCategoryQuerySchema,
		},
		req,
	);

	const categories = await projectCategoryService.list(query);

	return success(
		res,
		categories,
		"Project categories retrieved successfully.",
	);
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: projectCategoryIdSchema,
		},
		req,
	);

	const category = await projectCategoryService.getById(params.id);

	return success(res, category, "Project category retrieved successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: projectCategoryIdSchema,
			body: updateProjectCategorySchema,
		},
		req,
	);

	const category = await projectCategoryService.update(params.id, body);

	return success(res, category, "Project category updated successfully.");
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: projectCategoryIdSchema,
		},
		req,
	);

	const category = await projectCategoryService.remove(params.id);

	return success(res, category, "Project category deleted successfully.");
});

export default {
	create,
	list,
	getById,
	update,
	remove,
};
