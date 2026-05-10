import React, { useEffect, useMemo, useState } from "react";
import {
	Search,
	Download,
	Loader2,
	Star,
	AlertCircle,
	Check,
} from "lucide-react";
import {
	fetchUserRepos,
	fetchRepoDetails,
	mapRepoToProject,
} from "../../lib/github";
import {
	getUserSettings,
	getProjects,
	createProject,
	updateProject,
} from "../../lib/firebase.config";
import { useAuth } from "../../lib/context/AuthContext";

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
			<section className="border border-border bg-card/50 p-6 lg:p-8">
				<div className="flex items-center justify-center gap-2 text-muted-foreground py-10">
					<Loader2 className="h-4 w-4 animate-spin" /> Loading
					settings...
				</div>
			</section>
		);
	}

	// Not connected state
	if (!githubSettings?.username || !githubSettings?.pat) {
		return (
			<section className="border border-dashed border-border p-12 text-center">
				<AlertCircle className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
				<p className="text-muted-foreground">
					Connect your GitHub account above to browse repositories.
				</p>
			</section>
		);
	}

	return (
		<section className="border border-border bg-card/50 p-6 lg:p-8">
			<div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
				<div>
					<div className="serial-number text-primary mb-2">
						MODULE // 02
					</div>
					<h2 className="font-heading text-2xl font-bold">
						Your Repositories
					</h2>
				</div>
				<div className="relative flex-1 max-w-xs">
					<Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search repos…"
						className="w-full bg-background border border-border pl-10 pr-4 py-2 focus:border-primary outline-none text-sm transition-colors"
					/>
				</div>
			</div>

			{loading && (
				<div className="flex items-center justify-center gap-2 text-muted-foreground py-10">
					<Loader2 className="h-4 w-4 animate-spin" /> Fetching
					repositories from GitHub…
				</div>
			)}

			{error && (
				<div className="border border-destructive/50 bg-destructive/5 text-destructive p-4 mb-4 text-sm">
					{error}
				</div>
			)}

			{!loading && !error && (
				<div className="border border-border divide-y divide-border max-h-[600px] overflow-y-auto">
					{filtered.length === 0 ? (
						<div className="p-10 text-center text-muted-foreground">
							No repositories found.
						</div>
					) : (
						filtered.map((r) => (
							<div
								key={r.id}
								className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
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
									<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
										{r.description || "No description"}
									</p>
								</div>
								<button
									onClick={() => importRepo(r)}
									disabled={importing[r.id]}
									aria-label={`Import ${r.name} repository into portfolio`}
									className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors disabled:opacity-50 ${
										imported[r.id]
											? "bg-secondary text-secondary-foreground"
											: "bg-primary text-primary-foreground hover:bg-primary/90"
									}`}
								>
									{importing[r.id] ? (
										<Loader2 className="h-3 w-3 animate-spin" />
									) : imported[r.id] ? (
										<Check className="h-3 w-3" />
									) : (
										<Download className="h-3 w-3" />
									)}
									{imported[r.id] ? "Imported" : "Import"}
								</button>
							</div>
						))
					)}
				</div>
			)}
		</section>
	);
}
