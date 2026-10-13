import {
	blogPostIdParamSchema,
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";
import { blogPostService } from "../services/index.js";
import {
	createBlogPostBodySchema,
	updateBlogPostBodySchema,
} from "../validators/index.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createBlogPostBodySchema,
		},
		req,
	);

	const result = await blogPostService.create(body);

	return success(
		res,
		result,
		"Blog post created successfully.",
		HTTP_STATUS.CREATED,
	);
});

const list = asyncHandler(async (req, res) => {
	// const { query } = validateRequest({ query: listBlogPostQuerySchema }, req);

	const result = await blogPostService.listPosts(req.query);

	return success(
		res,
		result,
		"Administrative blog posts retrieved successfully.",
	);
});

const update = asyncHandler(async (req, res) => {
	const { body, params } = validateRequest(
		{
			body: updateBlogPostBodySchema,
			params: blogPostIdParamSchema,
		},
		req,
	);

	const result = await blogPostService.update(params.id, body);

	return success(res, result, "Blog post updated successfully.");
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: blogPostIdParamSchema,
		},
		req,
	);

	const result = await blogPostService.remove(params.id);

	return success(res, result, "Blog post deleted successfully.");
});

export default {
	create,
	list,
	update,
	remove,
};
