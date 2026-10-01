import { useEffect, useMemo, useState } from "react";
import {
	Search,
	Download,
	Star,
	AlertCircle,
	Check,
	CheckSquare,
	Square,
} from "lucide-react";

import {
	Button,
	FormInput,
	Loader,
	SectionHeader,
	Text,
} from "../../../shared/index.js";

import { BiGitRepoForked } from "react-icons/bi";

import {
	getAdminProjects,
	getGitHubRepositories,
	getGitHubSettings,
	importGitHubRepositories,
} from "../services/index.js";

const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";

export default function RepoList() {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [query, setQuery] = useState("");

	const [selected, setSelected] = useState({});
	const [importing, setImporting] = useState(false);
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

	const loadData = async () => {
		try {
			const [settings, projectResponse] = await Promise.all([
				getGitHubSettings(),
				getAdminProjects({ limit: 100 }),
			]);

			setGithubSettings(settings);

			const importedMap = {};

			projectResponse.projects.forEach((project) => {
				if (project.githubRepoId) {
					importedMap[project.githubRepoId] = true;
				}
			});

			setImported(importedMap);
		} catch (error) {
			console.error("Failed to load GitHub administration data:", error);
		} finally {
			setLoadingSettings(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (!githubSettings?.connected) return;

		const loadRepos = async () => {
			setLoading(true);
			setError(null);

			try {
				const repositories = await getGitHubRepositories();

				setRepos(repositories);
			} catch (error) {
				console.error("Failed to load GitHub repositories:", error);

				setError(error.message);
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
			(repo) =>
				repo.name?.toLowerCase().includes(q) ||
				(repo.description || "").toLowerCase().includes(q),
		);
	}, [repos, query]);

	const selectedIds = useMemo(
		() =>
			Object.entries(selected)
				.filter(([, isSelected]) => isSelected)
				.map(([id]) => Number(id)),
		[selected],
	);

	const toggleSelection = (repoId) => {
		setSelected((current) => ({
			...current,
			[repoId]: !current[repoId],
		}));
	};

	const selectAllVisible = () => {
		setSelected((current) => {
			const next = { ...current };

			filtered.forEach((repo) => {
				if (!imported[repo.githubRepoId]) {
					next[repo.githubRepoId] = true;
				}
			});

			return next;
		});
	};

	const clearSelection = () => {
		setSelected({});
	};

	const importSelected = async () => {
		if (selectedIds.length === 0 || importing) return;

		setImporting(true);

		try {
			await importGitHubRepositories(selectedIds);

			setImported((current) => {
				const next = { ...current };

				selectedIds.forEach((id) => {
					next[id] = true;
				});

				return next;
			});

			setSelected({});
		} catch (error) {
			console.error("Failed to import GitHub repositories:", error);

			alert("Import failed: " + (error.message || "Please try again."));
		} finally {
			setImporting(false);
		}
	};

	if (loadingSettings) {
		return (
			<div className={MODULE_BOX}>
				<Loader msg="Loading GitHub settings..." />
			</div>
		);
	}

	if (!githubSettings?.connected) {
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

			<div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
				<Text>
					{selectedIds.length > 0
						? `${selectedIds.length === 1 ? "1 repository" : selectedIds.length + " repositories"} selected`
						: "Select repositories to import."}
				</Text>

				<div className="flex items-center gap-2 flex-wrap">
					<Button
						variant="outline"
						size="sm"
						onClick={selectAllVisible}
						disabled={
							importing ||
							filtered.every(
								(repo) => imported[repo.githubRepoId],
							)
						}
					>
						<CheckSquare className="h-4 w-4" />
						Select Visible
					</Button>

					<Button
						variant="outline"
						size="sm"
						onClick={clearSelection}
						disabled={importing || selectedIds.length === 0}
					>
						Clear
					</Button>

					<Button
						size="sm"
						onClick={importSelected}
						disabled={importing || selectedIds.length === 0}
					>
						{importing ? (
							<Loader type="inline" />
						) : (
							<Download className="h-4 w-4" />
						)}
						Import Selected
					</Button>
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
						filtered.map((repo) => {
							const isSelected = Boolean(
								selected[repo.githubRepoId],
							);
							const isImported = Boolean(
								imported[repo.githubRepoId],
							);

							return (
								<div
									key={repo.githubRepoId}
									className={`p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-muted/30 transition-colors ${
										isSelected ? "bg-muted/20" : ""
									}`}
								>
									<button
										type="button"
										onClick={() =>
											!isImported &&
											toggleSelection(repo.githubRepoId)
										}
										disabled={isImported || importing}
										className="shrink-0 text-muted-foreground disabled:opacity-50"
										aria-label={
											isSelected
												? `Deselect ${repo.name}`
												: `Select ${repo.name}`
										}
									>
										{isSelected ? (
											<CheckSquare className="h-5 w-5" />
										) : (
											<Square className="h-5 w-5" />
										)}
									</button>

									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 flex-wrap">
											<span className="font-heading font-semibold truncate">
												{repo.name}
											</span>

											{repo.primaryLanguage && (
												<span className="text-xs px-2 py-0.5 border border-border">
													{repo.primaryLanguage}
												</span>
											)}

											{repo.isPrivate && (
												<span className="text-xs px-2 py-0.5 border border-border text-muted-foreground">
													Private
												</span>
											)}

											{repo.stars > 0 && (
												<span className="text-xs flex items-center gap-1 text-muted-foreground">
													<Star className="h-3 w-3" />
													{repo.stars}
												</span>
											)}
										</div>

										<Text className="line-clamp-1 mt-0.5">
											{repo.description ||
												"No description"}
										</Text>
									</div>

									<div className="shrink-0">
										{isImported ? (
											<span className="inline-flex items-center gap-1 text-xs px-3 py-2 border border-border text-secondary">
												<Check className="h-3 w-3" />
												Imported
											</span>
										) : (
											<Button
												variant={
													isSelected
														? "secondary"
														: "outline"
												}
												size="sm"
												onClick={() =>
													toggleSelection(
														repo.githubRepoId,
													)
												}
												disabled={importing}
											>
												{isSelected ? (
													<Check className="h-3 w-3" />
												) : (
													<Download className="h-3 w-3" />
												)}
												{isSelected
													? "Selected"
													: "Select"}
											</Button>
										)}
									</div>
								</div>
							);
						})
					)}
				</div>
			)}
		</div>
	);
}
