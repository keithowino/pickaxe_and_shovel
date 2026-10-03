import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";
import {
	projectCategoryRepository,
	projectPresenter,
	projectRepository,
} from "../../projects/index.js";

import gitHubAPI from "./githubApi.service.js";
import gitHubSettings from "./githubSettings.service.js";

/**
 * #### Important limitation in this first version
 *
 * Your current GitHub API service fetches up to 100 repositories per request. Therefore, a repository outside the fetched page may appear in notFound, even if it exists in your GitHub account. We'll address pagination in a later step if needed.
 *
 * importRepositories() and refreshRepository()
 * could letter become syncRepository()
 */

class GitHubRepositoriesService {
	/**
	 * Import selected GitHub repositories as Pickaxe projects.
	 */
	async importRepositories(userId, githubRepoIds) {
		// 1. Remove duplicate IDs from the request.
		const uniqueRepoIds = [...new Set(githubRepoIds)];

		// 2. Retrieve the connected GitHub token.
		const token = await gitHubSettings.getStoredGitHubToken(userId);

		// 3. Fetch repositories from GitHub.
		const repositories = await gitHubAPI.getGitHubRepositories(token);

		const requestedIds = new Set(uniqueRepoIds);

		const selectedRepositories = repositories.filter((repository) =>
			requestedIds.has(repository.githubRepoId),
		);

		// 4. Identify requested IDs that were not returned by GitHub.
		const foundIds = new Set(
			selectedRepositories.map((repository) => repository.githubRepoId),
		);

		const notFound = uniqueRepoIds.filter((id) => !foundIds.has(id));

		// 5. Import repositories individually.
		const imported = [];
		const skipped = [];

		const defaultCategory =
			await projectCategoryRepository.findBySlug("web-development");

		if (!defaultCategory) {
			throw new AppError(
				'The default project category "web-development" does not exist.',
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		if (!defaultCategory.active) {
			throw new AppError(
				'The default project category "web-development" is inactive.',
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

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
				liveUrl: repository.liveUrl ?? "",
				primaryLanguage: repository.primaryLanguage ?? "",
				techStack: repository.primaryLanguage
					? [repository.primaryLanguage]
					: [],
				topics: repository.topics ?? [],
				stars: repository.stars ?? 0,
				forks: repository.forks ?? 0,

				// Administrative defaults for newly imported projects.
				category: defaultCategory._id,
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

	/**
	 * Refreshes GitHub-sourced metadata for an existing project.
	 */
	async refreshRepository(userId, projectId) {
		// 1. Find the existing project in MongoDB.
		const project = await projectRepository.findProjectById(projectId);

		if (!project) {
			throw new AppError(
				"Project not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		// 2. Ensure the project is linked to a GitHub repository.
		if (!project.githubRepoId) {
			throw new AppError(
				"This project is not linked to a GitHub repository.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		// 3. Retrieve the stored GitHub token.
		const token = await gitHubSettings.getStoredGitHubToken(userId);

		// 4. Fetch the latest metadata from GitHub.
		const repository = await gitHubAPI.getGitHubRepositoryById(
			token,
			project.githubRepoId,
		);

		// 5. Update GitHub-sourced fields only.
		/**
		 * #### The following were removed
		 *
		 * name: repository.name,
		 * description: repository.description ?? "",
		 * githubUrl: repository.githubUrl,
		 * primaryLanguage: repository.primaryLanguage ??
		 * topics: repository.topics ?? [],
		 */
		const updatedProject = await projectRepository.updateProjectById(
			projectId,
			{
				stars: repository.stars ?? 0,
				forks: repository.forks ?? 0,
			},
		);

		return projectPresenter.present(updatedProject);
	}
}

export default new GitHubRepositoriesService();
