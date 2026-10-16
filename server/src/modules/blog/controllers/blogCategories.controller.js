import { asyncHandler, success } from "../../../shared/index.js";

import { blogCategoryService } from "../services/index.js";

const list = asyncHandler(async (req, res) => {
	const result = await blogCategoryService.listBlogCategories();

	return success(res, result, "Blog categories retrieved successfully.");
});

export default {
	list,
};
