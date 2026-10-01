/**
 * GitHub REST API service.
 *
 * Responsibilities:
 * - Retrieve the authenticated GitHub user's profile.
 * - Retrieve repositories accessible to the authenticated user.
 * - Handle GitHub API errors.
 *
 * This service does not manage token storage or encryption.
 */

import { GitHubApiError, HTTP_STATUS } from "../../../shared/index.js";

const GITHUB_API_BASE_URL = "https://api.github.com";

const GITHUB_API_VERSION = "2022-11-28";

class GitHubAPI {
	/**
	 * Builds the headers required for authenticated GitHub requests.
	 */
	getGitHubHeaders(token) {
		if (typeof token !== "string" || !token.trim()) {
			throw new GitHubApiError(
				"A valid GitHub token is required.",
				HTTP_STATUS.BAD_REQUEST,
				"GITHUB_TOKEN_REQUIRED",
			);
		}

		return {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${token}`,
			"X-GitHub-Api-Version": GITHUB_API_VERSION,
			"User-Agent": "Pickaxe-and-Shovel",
		};
	}

	/**
	 * Sends an authenticated request to the GitHub REST API.
	 */
	async requestGitHubApi(endpoint, token) {
		let response;

		try {
			response = await fetch(`${GITHUB_API_BASE_URL}${endpoint}`, {
				method: "GET",
				headers: this.getGitHubHeaders(token),
			});
		} catch {
			throw new GitHubApiError(
				"Unable to connect to GitHub.",
				502,
				"GITHUB_CONNECTION_ERROR",
			);
		}

		if (!response.ok) {
			if (response.status === 401) {
				throw new GitHubApiError(
					"The GitHub token is invalid or has expired.",
					HTTP_STATUS.UNAUTHORIZED,
					"GITHUB_TOKEN_INVALID",
				);
			}

			if (response.status === 403 || response.status === 429) {
				throw new GitHubApiError(
					"GitHub has restricted this request. Check token permissions or rate limits.",
					502,
					"GITHUB_REQUEST_RESTRICTED",
				);
			}

			throw new GitHubApiError(
				"The GitHub API request failed.",
				502,
				"GITHUB_API_ERROR",
			);
		}

		try {
			return await response.json();
		} catch {
			throw new GitHubApiError(
				"GitHub returned an invalid response.",
				502,
				"GITHUB_INVALID_RESPONSE",
			);
		}
	}

	/**
	 * Maps a GitHub repository response to the application's
	 * standard repository structure.
	 */
	mapGitHubRepository(repo) {
		return {
			githubRepoId: repo.id,
			name: repo.name,
			fullName: repo.full_name,
			description: repo.description,
			githubUrl: repo.html_url,
			liveUrl: repo.homepage,
			primaryLanguage: repo.language,
			topics: repo.topics ?? [],
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			isPrivate: repo.private,
			defaultBranch: repo.default_branch,
			updatedAt: repo.updated_at,
		};
	}

	/**
	 * Retrieves the authenticated GitHub user's profile.
	 *
	 * Used to validate a token and obtain the account username.
	 */
	async getGitHubAuthenticatedUser(token) {
		const user = await this.requestGitHubApi("/user", token);

		return {
			id: user.id,
			username: user.login,
			name: user.name,
			avatarUrl: user.avatar_url,
			profileUrl: user.html_url,
		};
	}

	/**
	 * Retrieves a single repository using its numeric GitHub ID.
	 */
	async getGitHubRepositoryById(token, githubRepoId) {
		if (!Number.isInteger(githubRepoId) || githubRepoId < 1) {
			throw new GitHubApiError(
				"A valid GitHub repository ID is required.",
				HTTP_STATUS.BAD_REQUEST,
				"GITHUB_INVALID_REPOSITORY_ID",
			);
		}

		const repo = await this.requestGitHubApi(
			`/repositories/${githubRepoId}`,
			token,
		);

		return this.mapGitHubRepository(repo);
	}

	/**
	 * Retrieves repositories accessible to the authenticated user.
	 *
	 * Pagination:
	 * - page: page number to retrieve.
	 * - perPage: number of repositories per page (maximum 100).
	 */
	async getGitHubRepositories(token, { page = 1, perPage = 100 } = {}) {
		if (
			!Number.isInteger(page) ||
			page < 1 ||
			!Number.isInteger(perPage) ||
			perPage < 1 ||
			perPage > 100
		) {
			throw new GitHubApiError(
				"Invalid repository pagination parameters.",
				HTTP_STATUS.CONFLICT,
				"GITHUB_INVALID_PAGINATION",
			);
		}

		const query = new URLSearchParams({
			sort: "updated",
			direction: "desc",
			per_page: String(perPage),
			page: String(page),
		});

		const repositories = await this.requestGitHubApi(
			`/user/repos?${query.toString()}`,
			token,
		);

		return repositories.map((repo) => this.mapGitHubRepository(repo));
	}
}

export default new GitHubAPI();
