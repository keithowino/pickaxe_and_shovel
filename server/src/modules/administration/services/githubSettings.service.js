import {
	decryptGitHubToken,
	encryptGitHubToken,
	User,
} from "../../identity/index.js";

import GitHubAPI from "./githubApi.service.js";

import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

class GitHubSettings {
	userNotFound() {
		throw new AppError(
			"User not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	/**
	 * Save a GitHub connection for an administrator.
	 *
	 * 1. Validate the token with GitHub.
	 * 2. Retrieve the authenticated GitHub username.
	 * 3. Encrypt the token.
	 * 4. Save the connection to the administrator's user record.
	 */
	async saveGitHubSettings(userId, token) {
		const githubUser = await GitHubAPI.getGitHubAuthenticatedUser(token);

		const encryptedToken = encryptGitHubToken(token);

		const user = await User.findById(userId);

		if (!user) {
			this.userNotFound();
		}

		user.github = {
			username: githubUser.username,
			encryptedToken,
		};

		await user.save();

		return {
			connected: true,
			username: githubUser.username,
		};
	}

	/**
	 * Retrieve the administrator's GitHub connection status.
	 *
	 * The encrypted token is not returned.
	 */
	async getGitHubSettings(userId) {
		const user = await User.findById(userId);

		if (!user) {
			this.userNotFound();
		}

		return {
			connected: Boolean(user.github?.username),
			username: user.github?.username ?? null,
		};
	}

	/**
	 * Retrieve and decrypt the stored GitHub token.
	 *
	 * This is intended for backend operations only.
	 * Never return this value to the frontend.
	 */
	async getStoredGitHubToken(userId) {
		const user = await User.findById(userId).select(
			"+github.encryptedToken",
		);

		if (!user) {
			this.userNotFound();
		}

		const encryptedToken = user.github?.encryptedToken;

		if (!encryptedToken) {
			throw new AppError(
				"GitHub is not connected.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		return decryptGitHubToken(encryptedToken);
	}

	/**
	 * Remove the administrator's GitHub connection.
	 */
	async disconnectGitHub(userId) {
		const result = await User.updateOne(
			{ _id: userId },
			{ $unset: { github: 1 } },
		);

		if (result.matchedCount === 0) {
			this.userNotFound();
		}

		return {
			connected: false,
			username: null,
		};
	}
}

export default new GitHubSettings();
