import {
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";

import { blogCategoryService } from "../../blog/services/index.js";

import {
	blogCategoryIdParamsSchema,
	createBlogCategoryBodySchema,
	listBlogCategoriesQuerySchema,
	setBlogCategoryActiveBodySchema,
	updateBlogCategoryBodySchema,
} from "../validators/index.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createBlogCategoryBodySchema,
		},
		req,
	);

	const result = await blogCategoryService.createBlogCategory(body);

	return success(
		res,
		result,
		"Blog category created successfully.",
		HTTP_STATUS.CREATED,
	);
});

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: listBlogCategoriesQuerySchema,
		},
		req,
	);

	const result = await blogCategoryService.listBlogCategories(query);

	return success(res, result, "Blog categories retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: blogCategoryIdParamsSchema,
		},
		req,
	);

	const result = await blogCategoryService.getBlogCategoryById(params.id);

	return success(res, result, "Blog category retrieved successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { body, params } = validateRequest(
		{
			body: updateBlogCategoryBodySchema,
			params: blogCategoryIdParamsSchema,
		},
		req,
	);

	const result = await blogCategoryService.updateBlogCategory(
		params.id,
		body,
	);

	return success(res, result, "Blog category updated successfully.");
});

const setActive = asyncHandler(async (req, res) => {
	const { body, params } = validateRequest(
		{
			body: setBlogCategoryActiveBodySchema,
			params: blogCategoryIdParamsSchema,
		},
		req,
	);

	const result = await blogCategoryService.setBlogCategoryActive(
		params.id,
		body.active,
	);

	return success(
		res,
		result,
		`Blog category ${body.active ? "activated" : "deactivated"} successfully.`,
	);
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: blogCategoryIdParamsSchema,
		},
		req,
	);

	const result = await blogCategoryService.deleteBlogCategory(params.id);

	return success(res, result, "Blog post category deleted successfully.");
});

export default {
	create,
	list,
	getById,
	update,
	setActive,
	remove,
};
