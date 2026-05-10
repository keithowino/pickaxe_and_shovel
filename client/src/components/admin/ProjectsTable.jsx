import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2, Edit3, Loader2, Save, X } from "lucide-react";
import {
	getProjects,
	deleteProject,
	updateProject,
} from "../../lib/firebase.config";
import { getUserSettings, updateUserSettings } from "../../lib/firebase.config";
import { fetchRepoDetails, mapRepoToProject } from "../../lib/github";
import { useAuth } from "../../lib/context/AuthContext";

export default function ProjectsTable() {
	const { user } = useAuth();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState({});
	const [editing, setEditing] = useState(null);
	const [draft, setDraft] = useState({});
	const [githubSettings, setGithubSettings] = useState(null);

	// Load GitHub settings
	useEffect(() => {
		const loadSettings = async () => {
			if (!user?.uid) return;
			const settings = await getUserSettings(user.uid);
			setGithubSettings(settings?.github || null);
		};
		loadSettings();
	}, [user]);

	const loadProjects = async () => {
		setLoading(true);
		try {
			const data = await getProjects();
			// Sort by created date descending
			const sorted = data.sort((a, b) =>
				(b.createdAt || "").localeCompare(a.createdAt || ""),
			);
			setProjects(sorted);
		} catch (error) {
			console.error("Failed to load projects:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProjects();
	}, []);

	const refreshFromGitHub = async (project) => {
		if (!githubSettings?.pat || !project.github_url) return;
		setBusy((b) => ({ ...b, [project.id]: "refresh" }));
		try {
			// Parse owner/repo from URL
			const urlParts = project.github_url
				.replace("https://github.com/", "")
				.split("/");
			const owner = urlParts[0];
			const repo = urlParts[1];

			const details = await fetchRepoDetails(
				owner,
				repo,
				githubSettings.pat,
			);
			const payload = mapRepoToProject(details);

			// Preserve manual overrides
			await updateProject(project.id, {
				...payload,
				live_url: project.live_url || payload.live_url,
				thumbnail_url: project.thumbnail_url || payload.thumbnail_url,
				notes: project.notes || "",
				featured: project.featured || false,
			});
			await loadProjects();
		} catch (e) {
			alert("Refresh failed: " + e.message);
		} finally {
			setBusy((b) => ({ ...b, [project.id]: null }));
		}
	};

	const remove = async (project) => {
		if (!confirm(`Delete "${project.name}" from portfolio?`)) return;
		setBusy((b) => ({ ...b, [project.id]: "delete" }));
		try {
			await deleteProject(project.id);
			await loadProjects();
		} catch (error) {
			alert("Delete failed: " + error.message);
		} finally {
			setBusy((b) => ({ ...b, [project.id]: null }));
		}
	};

	const startEdit = (project) => {
		setEditing(project.id);
		setDraft({
			live_url: project.live_url || "",
			thumbnail_url: project.thumbnail_url || "",
			notes: project.notes || "",
			category: project.category || "Web",
			featured: project.featured || false,
		});
	};

	const saveEdit = async (project) => {
		setBusy((b) => ({ ...b, [project.id]: "save" }));
		try {
			await updateProject(project.id, draft);
			await loadProjects();
			setEditing(null);
		} catch (error) {
			alert("Save failed: " + error.message);
		} finally {
			setBusy((b) => ({ ...b, [project.id]: null }));
		}
	};

	return (
		<section className="border border-border bg-card/50 p-6 lg:p-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<div className="serial-number text-primary mb-2">
						MODULE // 03
					</div>
					<h2 className="font-heading text-2xl font-bold">
						Imported Projects
					</h2>
				</div>
				<span className="serial-number text-muted-foreground">
					{projects.length} IN DATABASE
				</span>
			</div>

			{loading ? (
				<div className="flex items-center justify-center gap-2 text-muted-foreground py-10">
					<Loader2 className="h-4 w-4 animate-spin" /> Loading…
				</div>
			) : projects.length === 0 ? (
				<div className="border border-dashed border-border p-10 text-center text-muted-foreground">
					No imported projects yet. Use Module 02 above to import from
					GitHub.
				</div>
			) : (
				<div className="space-y-3">
					{projects.map((p) => (
						<div key={p.id} className="border border-border">
							<div className="p-4 flex items-start justify-between gap-4 flex-wrap">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap">
										<span className="font-heading font-semibold">
											{p.name}
										</span>
										<span className="text-xs px-2 py-0.5 border border-border">
											{p.category || "Web"}
										</span>
										{p.featured && (
											<span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground">
												FEATURED
											</span>
										)}
									</div>
									<p className="text-xs text-muted-foreground line-clamp-1 mt-1">
										{p.description}
									</p>
								</div>
								<div className="flex items-center gap-2">
									{githubSettings?.pat && (
										<button
											onClick={() => refreshFromGitHub(p)}
											disabled={!!busy[p.id]}
											title="Refresh from GitHub"
											className="p-2 border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
										>
											{busy[p.id] === "refresh" ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<RefreshCw className="h-4 w-4" />
											)}
										</button>
									)}
									<button
										onClick={() =>
											editing === p.id
												? setEditing(null)
												: startEdit(p)
										}
										title="Edit overrides"
										className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
									>
										{editing === p.id ? (
											<X className="h-4 w-4" />
										) : (
											<Edit3 className="h-4 w-4" />
										)}
									</button>
									<button
										onClick={() => remove(p)}
										disabled={!!busy[p.id]}
										title="Delete project"
										className="p-2 border border-border hover:border-destructive hover:text-destructive transition-colors disabled:opacity-50"
									>
										{busy[p.id] === "delete" ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											<Trash2 className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							{editing === p.id && (
								<div className="px-4 pb-4 border-t border-border pt-4 grid md:grid-cols-2 gap-3">
									<div>
										<label className="serial-number text-muted-foreground block mb-1">
											LIVE URL
										</label>
										<input
											value={draft.live_url}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													live_url: e.target.value,
												}))
											}
											className="w-full bg-background border border-border px-3 py-2 text-sm focus:border-primary outline-none"
										/>
									</div>
									<div>
										<label className="serial-number text-muted-foreground block mb-1">
											THUMBNAIL URL
										</label>
										<input
											value={draft.thumbnail_url}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													thumbnail_url:
														e.target.value,
												}))
											}
											className="w-full bg-background border border-border px-3 py-2 text-sm focus:border-primary outline-none"
										/>
									</div>
									<div>
										<label className="serial-number text-muted-foreground block mb-1">
											CATEGORY
										</label>
										<select
											value={draft.category}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													category: e.target.value,
												}))
											}
											className="w-full bg-background border border-border px-3 py-2 text-sm focus:border-primary outline-none"
										>
											{[
												"Web",
												"Mechatronics",
												"IoT",
												"Robotics",
												"In Progress",
											].map((c) => (
												<option key={c}>{c}</option>
											))}
										</select>
									</div>
									<div>
										<label className="serial-number text-muted-foreground block mb-1">
											FEATURED
										</label>
										<select
											value={draft.featured}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													featured:
														e.target.value ===
														"true",
												}))
											}
											className="w-full bg-background border border-border px-3 py-2 text-sm focus:border-primary outline-none"
										>
											<option value="false">No</option>
											<option value="true">Yes</option>
										</select>
									</div>
									<div className="md:col-span-2">
										<label className="serial-number text-muted-foreground block mb-1">
											NOTES / OVERRIDE DESCRIPTION
										</label>
										<textarea
											rows={2}
											value={draft.notes}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													notes: e.target.value,
												}))
											}
											className="w-full bg-background border border-border px-3 py-2 text-sm focus:border-primary outline-none resize-none"
										/>
									</div>
									<div className="md:col-span-2 flex justify-end">
										<button
											onClick={() => saveEdit(p)}
											disabled={!!busy[p.id]}
											className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
										>
											{busy[p.id] === "save" ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<Save className="h-4 w-4" />
											)}
											Save Changes
										</button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</section>
	);
}
