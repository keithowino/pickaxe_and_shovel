import { asyncHandler, success } from "../../../shared/index.js";
import { gitHubSettings } from "../services/index.js";

class GitHubSettingsController {
	/**
	 * Get the authenticated administrator's GitHub connection status.
	 */
	getSettings = asyncHandler(async (req, res) => {
		const settings = await gitHubSettings.getGitHubSettings(req.user._id);

		return success(
			res,
			settings,
			"GitHub settings retrieved successfully.",
		);
	});

	/**
	 * Connect GitHub using a personal access token.
	 */
	saveSettings = asyncHandler(async (req, res) => {
		const { token } = req.body;

		const settings = await gitHubSettings.saveGitHubSettings(
			req.user._id,
			token,
		);

		return success(res, settings, "GitHub account connected successfully.");
	});

	/**
	 * Disconnect the GitHub account.
	 */
	disconnect = asyncHandler(async (req, res) => {
		await gitHubSettings.disconnectGitHub(req.user._id);

		return success(res, null, "GitHub account disconnected successfully.");
	});
}

export default new GitHubSettingsController();
