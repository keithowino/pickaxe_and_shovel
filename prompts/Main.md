We can freely say `~\client\src\applications\administration\components\ProjectsTable.jsx` has been fully migrated, no longer depending on Firebase. the next logical migration was GitHubConnect and RepoList. Here their current frontend implementations:

```jsx
`~\client\src\applications\administration\components\GitHubConnect.jsx`;

import { useState, useEffect } from "react";
import { CheckCircle2, Unlink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import {
	getUserSettings,
	updateUserSettings,
} from "../../../lib/firebase.config.js";
import { useAuth } from "../../../lib/index.js";
import {
	Button,
	FeatureGrid,
	FormField,
	FormInput,
	FormLabel,
	Loader,
	SectionHeader,
	Text,
} from "../../../shared/index.js";

const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";

export default function GitHubConnect() {
	const { user } = useAuth();
	const [githubUsername, setGithubUsername] = useState("");
	const [githubPat, setGithubPat] = useState("");
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true);
	const [connected, setConnected] = useState(false);

	/**
	 * #### Placeholder
	 *
	 * let connected = false;
	 * let loading = true;
	 */

	useEffect(() => {
		const loadSettings = async () => {
			if (!user?.uid) {
				setLoading(false);
				return;
			}

			try {
				const settings = await getUserSettings(user.uid);
				if (settings?.github) {
					setGithubUsername(settings.github.username || "");
					setConnected(
						!!settings.github.username && !!settings.github.pat,
					);
				}
			} catch (error) {
				console.error("Failed to load GitHub settings:", error);
			} finally {
				setLoading(false);
			}
		};

		loadSettings();
	}, [user]);

	const save = async () => {
		if (!githubUsername || !githubPat || !user?.uid) return;
		setSaving(true);
		try {
			await updateUserSettings(user.uid, {
				github: {
					username: githubUsername,
					pat: githubPat,
				},
			});
			setConnected(true);
			setGithubPat("");
		} catch (error) {
			console.error("Failed to save GitHub settings:", error);
			alert("Failed to save GitHub connection. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	const disconnect = async () => {
		if (!user?.uid) return;
		setSaving(true);
		try {
			await updateUserSettings(user.uid, {
				github: {
					username: "",
					pat: "",
				},
			});
			setGithubUsername("");
			setConnected(false);
		} catch (error) {
			console.error("Failed to disconnect GitHub:", error);
			alert("Failed to disconnect GitHub. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className={MODULE_BOX}>
				<Loader msg="Loading settings..." />
			</div>
		);
	}

	return (
		<div className={MODULE_BOX}>
			<div className="flex items-start justify-between mb-6 flex-wrap gap-4">
				<div>
					<SectionHeader
						serial="MODULE // 01"
						title={{
							icon: <IoLogoGithub className="h-6 w-6" />,
							msg: "GitHub Connection",
						}}
						header={3}
						align="left"
						spacing="mb-0"
					/>
				</div>
				{connected && (
					<span className="flex items-center gap-2 text-secondary text-sm font-medium">
						<CheckCircle2 className="h-4 w-4 shrink-0" />
						<span className="truncate max-w-[14rem]">
							Connected as <strong>{githubUsername}</strong>
						</span>
					</span>
				)}
			</div>

			{connected ? (
				<div className="flex items-center justify-between gap-4 flex-wrap">
					<Text>
						Your GitHub account is linked. Repositories appear in
						Module 02 below.
					</Text>

					<Button
						size="sm"
						variant="destructive"
						onClick={disconnect}
						disabled={saving}
						fullWidthMobile
					>
						{saving ? (
							<Loader type="inline" />
						) : (
							<Unlink className="h-4 w-4" />
						)}
						Disconnect
					</Button>
				</div>
			) : (
				<div className="space-y-4">
					<Text>
						Generate a GitHub Personal Access Token (classic) with{" "}
						<code className="text-primary font-mono">repo</code>{" "}
						scope at{" "}
						<a
							href="https://github.com/settings/tokens"
							target="_blank"
							rel="noreferrer"
							className="text-primary underline"
						>
							github.com/settings/tokens
						</a>
						. The token is stored securely in Firestore — only you
						can access it.
					</Text>

					<FeatureGrid columns={2}>
						<FormField>
							<FormLabel
								htmlFor="username"
								required={{ isRequired: true }}
							>
								GITHUB USERNAME
							</FormLabel>
							<FormInput
								name="username"
								id="username"
								value={githubUsername}
								onChange={(e) =>
									setGithubUsername(e.target.value)
								}
								placeholder="yourusername"
							/>
						</FormField>
						<FormField>
							<FormLabel
								htmlFor="githubPat"
								required={{ isRequired: true }}
							>
								PERSONAL ACCESS TOKEN
							</FormLabel>
							<FormInput
								name="githubPat"
								id="githubPat"
								type="password"
								value={githubPat}
								onChange={(e) => setGithubPat(e.target.value)}
								placeholder="ghp_xxxxxxxxxxxx"
								autoComplete="off"
							/>
						</FormField>
					</FeatureGrid>
					<Button
						onClick={save}
						disabled={saving || !githubUsername || !githubPat}
						fullWidthMobile
					>
						{saving ? (
							<Loader type="inline" />
						) : (
							<IoLogoGithub className="h-4 w-4" />
						)}
						Connect GitHub
					</Button>
				</div>
			)}
		</div>
	);
}
```

```jsx
`~\client\src\applications\administration\components\RepoList.jsx`;

import { useEffect, useMemo, useState } from "react";
import { Search, Download, Star, AlertCircle, Check } from "lucide-react";
import {
	fetchUserRepos,
	fetchRepoDetails,
	mapRepoToProject,
} from "../../../lib/github";
import {
	getUserSettings,
	getProjects,
	createProject,
	updateProject,
} from "../../../lib/firebase.config";
import { useAuth } from "../../../lib/index.js";
import {
	Button,
	FormInput,
	Loader,
	SectionHeader,
	Text,
} from "../../../shared/index.js";
import { BiGitRepoForked } from "react-icons/bi";

const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";

export default function RepoList() {
	const { user } = useAuth();
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState("");
	const [importing, setImporting] = useState({});
	const [imported, setImported] = useState({});
	const [githubSettings, setGithubSettings] = useState(null);
	const [loadingSettings, setLoadingSettings] = useState(true);

	/**
	 * #### Placeholders
	 *
	 * let githubSettings = false;
	 * let loadingSettings = true;
	 * let loading = true;
	 */

	// Load GitHub settings and existing projects
	useEffect(() => {
		const loadData = async () => {
			if (!user?.uid) {
				setLoadingSettings(false);
				return;
			}

			try {
				const settings = await getUserSettings(user.uid);
				setGithubSettings(settings?.github || null);

				// Load existing projects to mark imported repos
				const existingProjects = await getProjects();
				const map = {};
				existingProjects.forEach((p) => {
					if (p.github_repo_id) map[p.github_repo_id] = true;
				});
				setImported(map);
			} catch (error) {
				console.error("Failed to load data:", error);
			} finally {
				setLoadingSettings(false);
			}
		};

		loadData();
	}, [user]);

	// Load repositories when GitHub settings are available
	useEffect(() => {
		if (!githubSettings?.username || !githubSettings?.pat) return;

		const loadRepos = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await fetchUserRepos(
					githubSettings.username,
					githubSettings.pat,
				);
				setRepos(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		loadRepos();
	}, [githubSettings]);

	const filtered = useMemo(() => {
		if (!query) return repos;
		const q = query.toLowerCase();
		return repos.filter(
			(r) =>
				r.name.toLowerCase().includes(q) ||
				(r.description || "").toLowerCase().includes(q),
		);
	}, [repos, query]);

	const importRepo = async (repo) => {
		if (!githubSettings?.pat) return;

		setImporting((s) => ({ ...s, [repo.id]: true }));
		try {
			const details = await fetchRepoDetails(
				githubSettings.username,
				repo.name,
				githubSettings.pat,
			);
			const payload = mapRepoToProject(details);

			// Check if already imported
			if (imported[repo.id]) {
				// Update existing project
				const existingProjects = await getProjects();
				const existing = existingProjects.find(
					(p) => p.github_repo_id === repo.id,
				);
				if (existing) {
					await updateProject(existing.id, payload);
				}
			} else {
				// Create new project
				await createProject(payload);
			}

			setImported((s) => ({ ...s, [repo.id]: true }));
		} catch (e) {
			alert("Import failed: " + e.message);
		} finally {
			setImporting((s) => ({ ...s, [repo.id]: false }));
		}
	};

	// Loading state
	if (loadingSettings) {
		return (
			<div className={MODULE_BOX}>
				<Loader msg="Loading settings..." />
			</div>
		);
	}

	// Not connected state
	if (!githubSettings?.username || !githubSettings?.pat) {
		return (
			<div className="border border-dashed border-border p-8 sm:p-12 text-center">
				<AlertCircle className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
				<Text>
					Connect your GitHub account above to browse repositories.
				</Text>
			</div>
		);
	}

	return (
		<div className={MODULE_BOX}>
			<div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
				<SectionHeader
					serial="MODULE // 02"
					title={{
						icon: <BiGitRepoForked className="h-6 w-6" />,
						msg: "Your Repositories",
					}}
					header={3}
					align="left"
				/>
				<div className="relative flex-1 min-w-[10rem] max-w-xs">
					<Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
					<FormInput
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search repos…"
						aria-label="Search repositories"
						className="pl-10"
					/>
				</div>
			</div>

			{loading && <Loader msg="Fetching repositories from GitHub…" />}

			{error && (
				<div className="border border-destructive/50 bg-destructive/5 text-destructive p-4 mb-4 text-sm">
					{error}
				</div>
			)}

			{!loading && !error && (
				<div className="border border-border divide-y divide-border max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
					{filtered.length === 0 ? (
						<div className="p-10 text-center text-muted-foreground">
							No repositories found.
						</div>
					) : (
						filtered.map((r) => (
							<div
								key={r.id}
								className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-muted/30 transition-colors"
							>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap">
										<span className="font-heading font-semibold truncate">
											{r.name}
										</span>
										{r.language && (
											<span className="text-xs px-2 py-0.5 border border-border">
												{r.language}
											</span>
										)}
										{r.private && (
											<span className="text-xs px-2 py-0.5 border border-border text-muted-foreground">
												Private
											</span>
										)}
										{r.stargazers_count > 0 && (
											<span className="text-xs flex items-center gap-1 text-muted-foreground">
												<Star className="h-3 w-3" />
												{r.stargazers_count}
											</span>
										)}
									</div>

									<Text className="line-clamp-1 mt-0.5">
										{r.description || "No description"}
									</Text>
								</div>

								<Button
									onClick={() => importRepo(r)}
									disabled={importing[r.id]}
									variant={
										imported[r.id] ? "secondary" : "primary"
									}
									aria-label={`Import ${r.name} repository into portfolio`}
									fullWidthMobile
									className="shrink-0"
								>
									{importing[r.id] ? (
										<Loader type="inline" />
									) : imported[r.id] ? (
										<Check className="h-3 w-3" />
									) : (
										<Download className="h-3 w-3" />
									)}
									{imported[r.id] ? "Imported" : "Import"}
								</Button>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
```

Backend implementation:

```js
`~\server\src\modules\administration\routes\githubSettings.routes.js`;

import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { gitHubSettingsController } from "../controllers/index.js";

const router = Router();

// All routes require an authenticated administrator.
router.use(authenticate, requireAdmin);

// GET /api/v1/admin/github/settings
router.get("/settings", gitHubSettingsController.getSettings);

// PUT /api/v1/admin/github/settings
router.put("/settings", gitHubSettingsController.saveSettings);

// DELETE /api/v1/admin/github/settings
router.delete("/settings", gitHubSettingsController.disconnect);

export default router;
```

```js
`~\server\src\modules\administration\controllers\githubSettings.controller.js`;

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
```

```js
`~\server\src\modules\administration\services\githubSettings.service.js`;

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
```

```js
`~\server\src\modules\administration\routes\githubRepositories.routes.js`;

import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { gitHubRepositoriesController } from "../controllers/index.js";

const router = Router();

// All repository endpoints require an authenticated administrator.
router.use(authenticate, requireAdmin);

// GET /repositories
router.get("/", gitHubRepositoriesController.list);

// POST /repositories/import
router.post("/import", gitHubRepositoriesController.importSelected);

// POST /repositories/:projectId/refresh
router.post("/:projectId/refresh", gitHubRepositoriesController.refresh);

export default router;
```

```js
`~\server\src\modules\administration\controllers\githubRepositories.controller.js`;

import {
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";

import {
	gitHubAPI,
	gitHubRepositoriesService,
	gitHubSettings,
} from "../services/index.js";

import {
	importRepositoriesBodySchema,
	projectIdParamsSchema,
} from "../validators/index.js";

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
		const { body } = validateRequest(
			{
				body: importRepositoriesBodySchema,
			},
			req,
		);

		const result = await gitHubRepositoriesService.importRepositories(
			req.user._id,
			body.githubRepoIds,
		);

		return success(
			res,
			result,
			"GitHub repository import completed.",
			HTTP_STATUS.OK,
		);
	});

	refresh = asyncHandler(async (req, res) => {
		const { params } = validateRequest(
			{
				params: projectIdParamsSchema,
			},
			req,
		);

		const project = await gitHubRepositoriesService.refreshRepository(
			req.user._id,
			params.projectId,
		);

		return success(
			res,
			project,
			"GitHub repository metadata refreshed successfully.",
		);
	});
}

export default new GitHubRepositoriesController();
```

As we built the backend we made it possible to import multiple projects at once, let's not forget to implement this capability in the frontend whereby the admin could select multiple projects.

Here is the current state of the folder structure:

```text
├── client/
│   ├── public/
│   │   ├── bait_fusion.jfif
│   │   ├── code_generator.jfif
│   │   ├── favicon.svg
│   │   ├── keith_owino_resume.pdf
│   │   ├── metadata.json
│   │   └── my_portfolio.png
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/
│   │   │   │   ├── env.js
│   │   │   │   └── index.js
│   │   │   ├── providers/
│   │   │   │   ├── AppProviders.jsx
│   │   │   │   └── index.js
│   │   │   ├── router/
│   │   │   │   ├── AppRouter.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── RouteConfiguration.jsx
│   │   │   └── index.js
│   │   ├── applications/
│   │   │   ├── administration/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AdministrationHeader.jsx
│   │   │   │   │   ├── GitHubConnect.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── ProjectsTable.jsx
│   │   │   │   │   └── RepoList.jsx
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── AdministrationLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AdminGateway.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── administration.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── administrationProjects.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── gateway/
│   │   │   │   ├── components/
│   │   │   │   │   ├── GatewayFooter.jsx
│   │   │   │   │   ├── GatewayHeader.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── ProjectCard.jsx
│   │   │   │   │   ├── ProjectModal.jsx
│   │   │   │   │   └── Timeline.jsx
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── GatewayLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AboutPage.jsx
│   │   │   │   │   ├── ContactPage.jsx
│   │   │   │   │   ├── HomePage.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── PortfolioPage.jsx
│   │   │   │   │   └── ServicePage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── gateway.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── platform/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── PageNotFound.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── platform.routes.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── lib/
│   │   │   ├── context/
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── ThemeContext.jsx
│   │   │   ├── pages/
│   │   │   │   └── TestFirebase.jsx
│   │   │   ├── apiClient.js
│   │   │   ├── firebase.config.js
│   │   │   ├── github.js
│   │   │   ├── index.js
│   │   │   ├── MetaDataInsert.jsx
│   │   │   └── supabase.js
│   │   ├── platform/
│   │   │   ├── routing/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthenticatedRoute.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── projectServices.js
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── marquee/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── skills.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── LoadFeaturedProjects.jsx
│   │   │   │   ├── LoadHeroCTA.jsx
│   │   │   │   ├── LoadHeroTitle.jsx
│   │   │   │   ├── LoadLogo.jsx
│   │   │   │   ├── LoadSerialMsg.jsx
│   │   │   │   ├── LoadSkillsGrid.jsx
│   │   │   │   └── LoadStats.jsx
│   │   │   ├── config/
│   │   │   │   ├── index.js
│   │   │   │   └── platform.config.js
│   │   │   ├── layout/
│   │   │   │   ├── appShell/
│   │   │   │   │   ├── AppShell.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── featureGrid/
│   │   │   │   │   ├── FeatureGrid.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── hero/
│   │   │   │   │   ├── Hero.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pageSection/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── PageSection.jsx
│   │   │   │   ├── sectionHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SectionHeader.jsx
│   │   │   │   ├── siteFooter/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SiteFooter.jsx
│   │   │   │   ├── siteHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── SiteHeader.jsx
│   │   │   │   │   └── ThemeToggle.jsx
│   │   │   │   └── index.js
│   │   │   ├── ui/
│   │   │   │   ├── button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── button.styles.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── container/
│   │   │   │   │   ├── Container.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── form/
│   │   │   │   │   ├── Form.jsx
│   │   │   │   │   ├── FormField.jsx
│   │   │   │   │   ├── FormInput.jsx
│   │   │   │   │   ├── FormLabel.jsx
│   │   │   │   │   ├── FormReaction.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── input/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── TextInput.jsx
│   │   │   │   ├── paper/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Paper.jsx
│   │   │   │   ├── section/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Section.jsx
│   │   │   │   ├── typography/
│   │   │   │   │   ├── Heading.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Text.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── scripts/
│   └── generate-structure.js
├── server/
│   ├── rest_tests/
│   │   ├── admin/
│   │   │   ├── github-settings.http
│   │   │   ├── project-settings.http
│   │   │   └── system.http
│   │   ├── auth/
│   │   │   └── identity.http
│   │   └── public/
│   │       └── projects.http
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
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.controller.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── githubRepositories.routes.js
│   │   │   │   │   ├── githubSettings.routes.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── githubApi.service.js
│   │   │   │   │   ├── githubRepositories.service.js
│   │   │   │   │   ├── githubSettings.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── githubRepositories.validators.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.validators.js
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
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.presenter.js
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
