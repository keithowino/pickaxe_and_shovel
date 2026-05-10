// // import React, { useState } from "react";
// import { Key, CheckCircle2, Loader2, Unlink } from "lucide-react";
// import { useState } from "react";
// import { IoLogoGithub } from "react-icons/io5";
// // import { base44 } from "@/api/base44Client";

// // dummy user
// const user = {
// 	github_username: "Keith owino",
// 	github_pat: "gph_1112233445r55hhj77",
// };

// // const GitHubConnect = ({ user, onConnected }) => {
// const GitHubConnect = () => {
// 	const [username, setUsername] = useState(user?.github_username || "");
// 	const [token, setToken] = useState("");
// 	const [saving, setSaving] = useState(false);

// 	const connected = Boolean(user?.github_username && user?.github_pat);
// 	// const connected = false; // placeholder

// 	// const save = async () => {
// 	// 	if (!username || !token) return;
// 	// 	setSaving(true);
// 	// 	await base44.auth.updateMe({
// 	// 		github_username: username,
// 	// 		github_pat: token,
// 	// 	});
// 	// 	setSaving(false);
// 	// 	setToken("");
// 	// 	onConnected?.();
// 	// };

// 	// const disconnect = async () => {
// 	// 	setSaving(true);
// 	// 	await base44.auth.updateMe({ github_username: "", github_pat: "" });
// 	// 	setSaving(false);
// 	// 	onConnected?.();
// 	// };

// 	return (
// 		<section className="border border-border bg-card/50 p-6 lg:p-8">
// 			<div className="flex items-start justify-between mb-6 flex-wrap gap-4">
// 				<div>
// 					<div className="serial-number text-primary mb-2">
// 						MODULE // 01
// 					</div>
// 					<h2 className="font-heading text-2xl font-bold flex items-center gap-3">
// 						<IoLogoGithub className="h-6 w-6" /> GitHub Connection
// 					</h2>
// 				</div>
// 				{connected && (
// 					<span className="flex items-center gap-2 text-secondary text-sm font-medium">
// 						<CheckCircle2 className="h-4 w-4" /> Connected as{" "}
// 						<strong>{user.github_username}</strong>
// 					</span>
// 				)}
// 			</div>

// 			{connected ? (
// 				<div className="flex items-center justify-between gap-4 flex-wrap">
// 					<p className="text-sm text-muted-foreground">
// 						Your GitHub account is linked. Repositories appear in
// 						Module 02 below.
// 					</p>
// 					<button
// 						// onClick={disconnect}
// 						disabled={saving}
// 						className="inline-flex items-center gap-2 border border-border hover:border-destructive hover:text-destructive px-4 py-2 text-sm transition-colors disabled:opacity-50"
// 					>
// 						{saving ? (
// 							<Loader2 className="h-4 w-4 animate-spin" />
// 						) : (
// 							<Unlink className="h-4 w-4" />
// 						)}
// 						Disconnect
// 					</button>
// 				</div>
// 			) : (
// 				<div className="space-y-4">
// 					<p className="text-sm text-muted-foreground leading-relaxed">
// 						Generate a GitHub Personal Access Token (classic) with{" "}
// 						<code className="text-primary font-mono">repo</code>{" "}
// 						scope at{" "}
// 						<a
// 							href="https://github.com/settings/tokens"
// 							target="_blank"
// 							rel="noreferrer"
// 							className="text-primary underline"
// 						>
// 							github.com/settings/tokens
// 						</a>
// 						{/* . The token is stored securely on your Base44 profile —
// 						only you can see it. */}
// 						. The token is stored securely on your profile — only
// 						you can see it.
// 					</p>
// 					<div className="grid md:grid-cols-2 gap-4">
// 						<div>
// 							<label className="serial-number text-muted-foreground block mb-2">
// 								GITHUB USERNAME
// 							</label>
// 							<input
// 								value={username}
// 								onChange={(e) => setUsername(e.target.value)}
// 								placeholder="keithowino"
// 								className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none transition-colors"
// 							/>
// 						</div>
// 						<div>
// 							<label className="serial-number text-muted-foreground block mb-2">
// 								PERSONAL ACCESS TOKEN
// 							</label>
// 							<div className="relative">
// 								<Key className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
// 								<input
// 									type="password"
// 									value={token}
// 									onChange={(e) => setToken(e.target.value)}
// 									placeholder="ghp_xxxxxxxxxxxx"
// 									className="w-full bg-background border border-border pl-10 pr-4 py-3 focus:border-primary outline-none transition-colors"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 					<button
// 						// onClick={save}
// 						disabled={saving || !username || !token}
// 						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
// 					>
// 						{saving ? (
// 							<Loader2 className="h-4 w-4 animate-spin" />
// 						) : (
// 							<IoLogoGithub className="h-4 w-4" />
// 						)}
// 						Connect GitHub
// 					</button>
// 				</div>
// 			)}
// 		</section>
// 	);
// };

// export default GitHubConnect;

import React, { useState, useEffect } from "react";
import { Key, CheckCircle2, Loader2, Unlink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import { getUserSettings, updateUserSettings } from "../../lib/firebase.config";
import { useAuth } from "../../lib/context/AuthContext";

export default function GitHubConnect() {
	const { user } = useAuth();
	const [githubUsername, setGithubUsername] = useState("");
	const [githubPat, setGithubPat] = useState("");
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true);
	const [connected, setConnected] = useState(false);

	// Load user's GitHub settings from Firestore
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
			setGithubPat(""); // Clear token from input after saving
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
			<section className="border border-border bg-card/50 p-6 lg:p-8">
				<div className="flex items-center justify-center gap-2 text-muted-foreground py-10">
					<Loader2 className="h-4 w-4 animate-spin" /> Loading
					settings...
				</div>
			</section>
		);
	}

	return (
		<section className="border border-border bg-card/50 p-6 lg:p-8">
			<div className="flex items-start justify-between mb-6 flex-wrap gap-4">
				<div>
					<div className="serial-number text-primary mb-2">
						MODULE // 01
					</div>
					<h2 className="font-heading text-2xl font-bold flex items-center gap-3">
						<IoLogoGithub className="h-6 w-6" /> GitHub Connection
					</h2>
				</div>
				{connected && (
					<span className="flex items-center gap-2 text-secondary text-sm font-medium">
						<CheckCircle2 className="h-4 w-4" /> Connected as{" "}
						<strong>{githubUsername}</strong>
					</span>
				)}
			</div>

			{connected ? (
				<div className="flex items-center justify-between gap-4 flex-wrap">
					<p className="text-sm text-muted-foreground">
						Your GitHub account is linked. Repositories appear in
						Module 02 below.
					</p>
					<button
						onClick={disconnect}
						disabled={saving}
						className="inline-flex items-center gap-2 border border-border hover:border-destructive hover:text-destructive px-4 py-2 text-sm transition-colors disabled:opacity-50"
					>
						{saving ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Unlink className="h-4 w-4" />
						)}
						Disconnect
					</button>
				</div>
			) : (
				<div className="space-y-4">
					<p className="text-sm text-muted-foreground leading-relaxed">
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
					</p>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="serial-number text-muted-foreground block mb-2">
								GITHUB USERNAME
							</label>
							<input
								value={githubUsername}
								onChange={(e) =>
									setGithubUsername(e.target.value)
								}
								placeholder="yourusername"
								className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none transition-colors"
							/>
						</div>
						<div>
							<label className="serial-number text-muted-foreground block mb-2">
								PERSONAL ACCESS TOKEN
							</label>
							<div className="relative">
								<Key className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<input
									type="password"
									value={githubPat}
									onChange={(e) =>
										setGithubPat(e.target.value)
									}
									placeholder="ghp_xxxxxxxxxxxx"
									className="w-full bg-background border border-border pl-10 pr-4 py-3 focus:border-primary outline-none transition-colors"
								/>
							</div>
						</div>
					</div>
					<button
						onClick={save}
						disabled={saving || !githubUsername || !githubPat}
						className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
					>
						{saving ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<IoLogoGithub className="h-4 w-4" />
						)}
						Connect GitHub
					</button>
				</div>
			)}
		</section>
	);
}
