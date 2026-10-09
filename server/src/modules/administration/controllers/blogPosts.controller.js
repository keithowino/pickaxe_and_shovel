import {
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";
import { blogPostService } from "../services/index.js";
import { createBlogPostBodySchema } from "../validators/index.js";

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

export default {
	create,
};
