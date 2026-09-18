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
import { useAuth } from "../../../lib/context/AuthContext";
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
