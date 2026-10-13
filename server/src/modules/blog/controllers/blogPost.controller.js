import {
	asyncHandler,
	success,
	AppError,
	HTTP_STATUS,
	ErrorCodes,
} from "../../../shared/index.js";
import { blogPostsService } from "../services/index.js";

const list = asyncHandler(async (req, res) => {
	const result = await blogPostsService.list(req.query);
	return success(res, result, "Blog posts retrieved successfully.");
});

const getBySlug = asyncHandler(async (req, res) => {
	const result = await blogPostsService.getBySlug(req.params.slug);

	if (!result) {
		throw new AppError(
			"Blog post not found.",
			ErrorCodes.NOT_FOUND,
			HTTP_STATUS.NOT_FOUND,
		);
	}

	return success(res, result, "Blog post retrieved successfully.");
});

export default { list, getBySlug };
