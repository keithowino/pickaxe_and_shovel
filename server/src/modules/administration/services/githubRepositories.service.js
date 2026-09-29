import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

import { projectRepository } from "../../projects/repositories/index.js";

import gitHubAPI from "./githubApi.service.js";
import gitHubSettings from "./githubSettings.service.js";

/**
 * #### Important limitation in this first version
 *
 * Your current GitHub API service fetches up to 100 repositories per request. Therefore, a repository outside the fetched page may appear in notFound, even if it exists in your GitHub account. We'll address pagination in a later step if needed.
 */

class GitHubRepositoriesService {
	/**
	 * Import selected GitHub repositories as Pickaxe projects.
	 */
	async importRepositories(userId, githubRepoIds) {
		// 1. Validate the submitted repository IDs.
		if (!Array.isArray(githubRepoIds) || githubRepoIds.length === 0) {
			throw new AppError(
				"A non-empty array of GitHub repository IDs is required.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		const hasInvalidIds = githubRepoIds.some(
			(id) => !Number.isSafeInteger(id) || id <= 0,
		);

		if (hasInvalidIds) {
			throw new AppError(
				"All GitHub repository IDs must be positive integers.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		// 2. Remove duplicate IDs from the request.
		const uniqueRepoIds = [...new Set(githubRepoIds)];

		// 3. Retrieve the connected GitHub token.
		const token = await gitHubSettings.getStoredGitHubToken(userId);

		// 4. Fetch repositories from GitHub.
		const repositories = await gitHubAPI.getGitHubRepositories(token);

		const requestedIds = new Set(uniqueRepoIds);

		const selectedRepositories = repositories.filter((repository) =>
			requestedIds.has(repository.githubRepoId),
		);

		// 5. Identify requested IDs that were not returned by GitHub.
		const foundIds = new Set(
			selectedRepositories.map((repository) => repository.githubRepoId),
		);

		const notFound = uniqueRepoIds.filter((id) => !foundIds.has(id));

		// 6. Import repositories individually.
		const imported = [];
		const skipped = [];

		for (const repository of selectedRepositories) {
			const existingProject =
				await projectRepository.findProjectByGithubRepoId(
					repository.githubRepoId,
				);

			if (existingProject) {
				skipped.push({
					githubRepoId: repository.githubRepoId,
					name: repository.name,
					reason: "Already imported.",
				});

				continue;
			}

			const project = await projectRepository.createProject({
				githubRepoId: repository.githubRepoId,
				name: repository.name,
				description: repository.description ?? "",
				githubUrl: repository.githubUrl,
				primaryLanguage: repository.primaryLanguage ?? "",
				techStack: repository.primaryLanguage
					? [repository.primaryLanguage]
					: [],
				topics: repository.topics ?? [],
				stars: repository.stars ?? 0,
				forks: repository.forks ?? 0,

				// Administrative defaults for newly imported projects.
				category: "Web",
				pinned: false,
				displayOrder: 0,
				featured: false,
				published: false,
			});

			imported.push(project);
		}

		return {
			summary: {
				requested: uniqueRepoIds.length,
				imported: imported.length,
				skipped: skipped.length,
				notFound: notFound.length,
			},
			imported,
			skipped,
			notFound,
		};
	}
}

export default new GitHubRepositoriesService();
