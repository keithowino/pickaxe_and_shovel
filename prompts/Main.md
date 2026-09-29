# Refresh GitHub repository metadata

The current task in our roadmap is this endpoint `POST /api/v1/admin/github/repositories/:projectId/refresh`.

## What it will do

When an administrator refreshes a project, the backend will:

1. Find the project in MongoDB using its project ID.
2. Retrieve its associated GitHub repository ID.
3. Fetch the latest repository metadata from GitHub.
4. Update GitHub-sourced fields in the existing project record.

with that said before implementation, you requested to verify the following file so we can add a method for fetching a repository by its GitHub ID without duplicating existing request or response-mapping logic:

```js
`~\server\src\modules\administration\services\githubApi.service.js`;

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

		return repositories.map((repo) => ({
			githubRepoId: repo.id,
			name: repo.name,
			fullName: repo.full_name,
			description: repo.description,
			githubUrl: repo.html_url,
			primaryLanguage: repo.language,
			topics: repo.topics ?? [],
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			isPrivate: repo.private,
			defaultBranch: repo.default_branch,
			updatedAt: repo.updated_at,
		}));
	}
}

export default new GitHubAPI();
```

The following is the current state of the server structure:

# Pickaxe & Shovel Folder Structure

Generated on: 2026-09-29

```text
├── server/
│   ├── rest_tests/
│   │   ├── auth/
│   │   │   └── identity.http
│   │   ├── projects/
│   │   │   ├── github-settings.http
│   │   │   ├── ordering.http
│   │   │   └── projects.http
│   │   └── system.http
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   │   ├── database.js
│   │   │   │   └── index.js
│   │   │   ├── config/
│   │   │   │   ├── cloudinary.js
│   │   │   │   ├── cors.js
│   │   │   │   ├── env.js
│   │   │   │   └── index.js
│   │   │   ├── routes/
│   │   │   │   ├── api.js
│   │   │   │   └── index.js
│   │   │   ├── app.js
│   │   │   ├── index.js
│   │   │   └── server.js
│   │   ├── modules/
│   │   │   ├── administration/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── githubRepositories.controller.js
│   │   │   │   │   ├── githubSettings.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── githubRepositories.routes.js
│   │   │   │   │   ├── githubSettings.routes.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── githubApi.service.js
│   │   │   │   │   ├── githubRepositories.service.js
│   │   │   │   │   ├── githubSettings.service.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── identity/
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── roles.js
│   │   │   │   │   └── session.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── auth.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── authenticate.js
│   │   │   │   │   ├── authorize.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Session.js
│   │   │   │   │   └── User.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── user.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── session.repository.js
│   │   │   │   │   └── user.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── auth.routes.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── security/
│   │   │   │   │   ├── accessToken.service.js
│   │   │   │   │   ├── authCookies.js
│   │   │   │   │   ├── githubTokenEncryption.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── password.service.js
│   │   │   │   │   ├── refreshToken.service.js
│   │   │   │   │   └── tokenHasher.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── session.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── auth.validators.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── projects/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Project.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.validators.js
│   │   │   │   ├── index.js
│   │   │   │   └── README.md
│   │   │   └── index.js
│   │   ├── scripts/
│   │   │   └── seedUsers.js
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   │   ├── httpStatus.js
│   │   │   │   └── index.js
│   │   │   ├── errors/
│   │   │   │   ├── appError.js
│   │   │   │   ├── errorCodes.js
│   │   │   │   ├── errorHandler.js
│   │   │   │   ├── index.js
│   │   │   │   └── notFound.js
│   │   │   ├── http/
│   │   │   │   ├── index.js
│   │   │   │   └── requestMetadata.js
│   │   │   ├── utils/
│   │   │   │   ├── apiResponse.js
│   │   │   │   ├── asyncHandler.js
│   │   │   │   ├── index.js
│   │   │   │   ├── presenter.js
│   │   │   │   └── slugify.js
│   │   │   ├── validation/
│   │   │   │   ├── email.schema.js
│   │   │   │   ├── index.js
│   │   │   │   ├── password.schema.js
│   │   │   │   └── validateRequest.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── .env.development
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   └── package.json
├── supabase/
│   ├── .temp/
│   │   ├── cli-latest
│   │   ├── gotrue-version
│   │   ├── linked-project.json
│   │   ├── pooler-url
│   │   ├── postgres-version
│   │   ├── project-ref
│   │   ├── rest-version
│   │   ├── storage-migration
│   │   └── storage-version
│   ├── functions/
│   │   └── notify-contact/
│   │       ├── .npmrc
│   │       ├── deno.json
│   │       └── index.ts
│   ├── .gitignore
│   └── config.toml
├── .gitignore
├── package.json
└── README.md
```
