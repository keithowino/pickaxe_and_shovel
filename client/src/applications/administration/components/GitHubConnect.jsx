import { useState, useEffect } from "react";
import { CheckCircle2, Unlink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

import {
	Button,
	FormField,
	FormInput,
	FormLabel,
	Loader,
	SectionHeader,
	Text,
} from "../../../shared/index.js";

import {
	disconnectGitHub,
	getGitHubSettings,
	saveGitHubSettings,
} from "../services/index.js";

const MODULE_BOX = "border border-border bg-card/50 p-5 sm:p-6 md:p-8";

export default function GitHubConnect() {
	const [githubUsername, setGithubUsername] = useState("");
	const [githubPat, setGithubPat] = useState("");
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const loadSettings = async () => {
			try {
				const settings = await getGitHubSettings();

				setGithubUsername(settings?.username || "");
				setConnected(Boolean(settings?.connected));
			} catch (error) {
				console.error("Failed to load GitHub settings:", error);
			} finally {
				setLoading(false);
			}
		};

		loadSettings();
	}, []);

	const save = async () => {
		if (!githubPat) return;

		setSaving(true);

		try {
			const settings = await saveGitHubSettings(githubPat);

			setGithubUsername(settings?.username || "");
			setConnected(Boolean(settings?.connected));
			setGithubPat("");
		} catch (error) {
			console.error("Failed to save GitHub settings:", error);

			alert(
				"Failed to connect GitHub: " +
					(error.message || "Please check your token and try again."),
			);
		} finally {
			setSaving(false);
		}
	};

	const disconnect = async () => {
		setSaving(true);

		try {
			await disconnectGitHub();

			setGithubUsername("");
			setGithubPat("");
			setConnected(false);
		} catch (error) {
			console.error("Failed to disconnect GitHub:", error);

			alert(
				"Failed to disconnect GitHub: " +
					(error.message || "Please try again."),
			);
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
						. The token is validated and then encrypted by the
						server. It is never returned to the browser after it is
						saved.
					</Text>

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

					<Button
						onClick={save}
						disabled={saving || !githubPat}
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
