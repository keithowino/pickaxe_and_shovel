import { asyncHandler, HTTP_STATUS, success } from "../../../shared/index.js";

import {
	gitHubAPI,
	gitHubRepositoriesService,
	gitHubSettings,
} from "../services/index.js";

class GitHubRepositoriesController {
	/**
	 * Fetch repositories from the connected GitHub account.
	 */
	list = asyncHandler(async (req, res) => {
		// 1. Retrieve the decrypted GitHub token.
		const token = await gitHubSettings.getStoredGitHubToken(req.user._id);

		// 2. Fetch repositories from GitHub.
		const repositories = await gitHubAPI.getGitHubRepositories(token);

		// 3. Return the repository list.
		return success(
			res,
			repositories,
			"GitHub repositories retrieved successfully.",
		);
	});

	/**
	 * Import selected GitHub repositories into Pickaxe.
	 */
	importSelected = asyncHandler(async (req, res) => {
		const { githubRepoIds } = req.body;

		const result = await gitHubRepositoriesService.importRepositories(
			req.user._id,
			githubRepoIds,
		);

		return success(
			res,
			result,
			"GitHub repository import completed.",
			HTTP_STATUS.OK,
		);
	});
}

export default new GitHubRepositoriesController();
