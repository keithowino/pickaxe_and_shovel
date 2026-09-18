import { useEffect, useState } from "react";
import { RefreshCw, Trash2, Edit3, Save, X } from "lucide-react";
import {
	getProjects,
	deleteProject,
	updateProject,
	getUserSettings,
} from "../../../lib/firebase.config";
import { fetchRepoDetails, mapRepoToProject } from "../../../lib/github";
import { useAuth } from "../../../lib/context/AuthContext";
import {
	Button,
	FormField,
	FormInput,
	FormLabel,
	Loader,
	SectionHeader,
	Text,
} from "../../../shared/index.js";
import { BiImport } from "react-icons/bi";

const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";
const SELECT_CLASS =
	"w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary focus-visible:outline-none transition-colors disabled:opacity-50";

export default function ProjectsTable() {
	const { user } = useAuth();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState({});
	const [editing, setEditing] = useState(null);
	const [draft, setDraft] = useState({});
	const [githubSettings, setGithubSettings] = useState(null);

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
		<div className={MODULE_BOX}>
			<div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
				<SectionHeader
					serial="MODULE // 03"
					title={{
						icon: <BiImport className="h-6 w-6" />,
						msg: "Imported Projects",
					}}
					header={3}
					align="left"
					spacing="mb-0"
				/>
				<span className="serial-number text-muted-foreground">
					{projects.length} IN DATABASE
				</span>
			</div>

			{loading ? (
				<Loader type="inline" msg="Loading…" />
			) : projects.length === 0 ? (
				<div className="border border-dashed border-border p-8 sm:p-10 text-center">
					<Text>
						No imported projects yet. Use Module 02 above to import
						from GitHub.
					</Text>
				</div>
			) : (
				<div className="space-y-3">
					{projects.map((p) => (
						<div key={p.id} className="border border-border">
							<div className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
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
									<Text className="line-clamp-1 mt-1">
										{p.description}
									</Text>
								</div>

								<div className="flex items-center gap-2 shrink-0">
									{githubSettings?.pat && (
										<Button
											variant="outline"
											size="sm"
											onClick={() => refreshFromGitHub(p)}
											disabled={!!busy[p.id]}
											aria-label={`Refresh ${p.name} from GitHub`}
											title="Refresh from GitHub"
										>
											{busy[p.id] === "refresh" ? (
												<Loader type="inline" />
											) : (
												<RefreshCw className="h-4 w-4" />
											)}
										</Button>
									)}

									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											editing === p.id
												? setEditing(null)
												: startEdit(p)
										}
										aria-label={
											editing === p.id
												? `Cancel editing ${p.name}`
												: `Edit overrides for ${p.name}`
										}
										title="Edit overrides"
									>
										{editing === p.id ? (
											<X className="h-4 w-4" />
										) : (
											<Edit3 className="h-4 w-4" />
										)}
									</Button>

									<Button
										variant="destructive"
										size="sm"
										onClick={() => remove(p)}
										disabled={!!busy[p.id]}
										aria-label={`Delete ${p.name}`}
										title="Delete project"
									>
										{busy[p.id] === "delete" ? (
											<Loader type="inline" />
										) : (
											<Trash2 className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							{editing === p.id && (
								<div className="px-4 pb-4 border-t border-border pt-4 grid sm:grid-cols-2 gap-3">
									<FormField>
										<FormLabel htmlFor="liveUrl">
											LIVE URL
										</FormLabel>
										<FormInput
											name="live-url"
											id="liveUrl"
											value={draft.live_url}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													live_url: e.target.value,
												}))
											}
										/>
									</FormField>

									<FormField>
										<FormLabel htmlFor="thumbnailUrl">
											THUMBNAIL URL
										</FormLabel>
										<FormInput
											name="thumbnail-url"
											id="thumbnailUrl"
											value={draft.thumbnail_url}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													thumbnail_url:
														e.target.value,
												}))
											}
										/>
									</FormField>

									<FormField>
										<FormLabel htmlFor="projectCategory">
											CATEGORY
										</FormLabel>
										<select
											name="project-category"
											id="projectCategory"
											value={draft.category}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													category: e.target.value,
												}))
											}
											className={SELECT_CLASS}
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
									</FormField>

									<FormField>
										<FormLabel htmlFor="featuredProjects">
											FEATURED
										</FormLabel>
										<select
											name="featured-projects"
											id="featuredProjects"
											value={draft.featured}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													featured:
														e.target.value ===
														"true",
												}))
											}
											className={SELECT_CLASS}
										>
											<option value="false">No</option>
											<option value="true">Yes</option>
										</select>
									</FormField>

									<FormField className="sm:col-span-2">
										<FormLabel htmlFor="projectNotes">
											NOTES / OVERRIDE DESCRIPTION
										</FormLabel>
										<FormInput
											as="textarea"
											name="project-notes"
											id="projectNotes"
											rows={2}
											value={draft.notes}
											onChange={(e) =>
												setDraft((d) => ({
													...d,
													notes: e.target.value,
												}))
											}
										/>
									</FormField>

									<div className="sm:col-span-2 flex justify-end">
										<Button
											onClick={() => saveEdit(p)}
											disabled={!!busy[p.id]}
											fullWidthMobile
										>
											{busy[p.id] === "save" ? (
												<Loader type="inline" />
											) : (
												<Save className="h-4 w-4" />
											)}
											Save Changes
										</Button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
