import { useState } from "react";
import { LayoutDashboard } from "lucide-react";

import { MetaDataInsert, useAuth } from "../../../lib/index.js";
import {
	Button,
	Heading,
	Hero,
	Loader,
	LoadHeroTitle,
	PageSection,
	Text,
	FormField,
	FormInput,
	FormLabel,
} from "../../../shared/index.js";

import { GitHubConnect, ProjectsTable, RepoList } from "../components/index.js";
import { Link } from "react-router-dom";

const AdminGateway = () => {
	// const { user, isLoadingAuth, signInWithGoogle } = useAuth();
	const { user, isAdmin, isLoadingAuth, authError, login } = useAuth();

	/**
	 * #### Placeholders
	 *
	 * let isLoadingAuth = true;
	 * let user = false;
	 */

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loginError, setLoginError] = useState("");

	/**
	 * Shared refresh signal for admin data modules
	 */
	const [projectsRefreshKey, setProjectsRefreshKey] = useState(0);

	const handleLogin = async (event) => {
		event.preventDefault();

		setLoginError("");
		setIsSubmitting(true);

		try {
			await login(email.trim(), password);
		} catch (error) {
			setLoginError(error.message || "Unable to sign in.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoadingAuth) {
		return <Loader type="page" />;
	}

	if (!user) {
		return (
			<>
				<MetaDataInsert title={"Admin Login"} />

				<PageSection
					className="min-h-[75svh] sm:min-h-[80svh] flex items-center"
					containerClassName="flex items-center justify-center"
				>
					{/* <div className="max-w-md w-full border border-border bg-card/50 p-6 sm:p-8 text-center">
						<LayoutDashboard className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
						<Heading level={3}>Admin Access</Heading>
						<Text className="mb-6">
							Sign in with your Google account to manage your
							portfolio.
						</Text>
						<Button onClick={signInWithGoogle} fullWidthMobile>
							Sign in with Google
						</Button>
					</div> */}
					<div className="max-w-md w-full border border-border bg-card/50 p-6 sm:p-8">
						<LayoutDashboard className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
						<Heading level={3}>Admin Access</Heading>
						<Text className="mb-6">
							Sign in with your administrator credentials to
							manage your portfolio.
						</Text>

						<form onSubmit={handleLogin} className="space-y-4">
							<FormField>
								<FormLabel htmlFor="admin-email">
									EMAIL ADDRESS
								</FormLabel>
								<FormInput
									id="admin-email"
									name="email"
									type="email"
									autoComplete="username"
									value={email}
									onChange={(event) =>
										setEmail(event.target.value)
									}
									placeholder="you@example.com"
									required
								/>
							</FormField>

							<FormField>
								<FormLabel htmlFor="admin-password">
									PASSWORD
								</FormLabel>
								<FormInput
									id="admin-password"
									name="password"
									type="password"
									autoComplete="current-password"
									value={password}
									onChange={(event) =>
										setPassword(event.target.value)
									}
									placeholder="Enter your password"
									required
								/>
							</FormField>

							{(loginError || authError) && (
								<div
									role="alert"
									className="border border-destructive/50 bg-destructive/5 text-destructive p-3 text-sm"
								>
									{loginError || authError.message}
								</div>
							)}

							<Button
								onClick={handleLogin}
								disabled={
									isSubmitting || !email.trim() || !password
								}
								fullWidthMobile
							>
								{isSubmitting ? (
									<Loader type="inline" />
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</div>
				</PageSection>
			</>
		);
	}

	const Desc = () => (
		<>
			Welcome,{" "}
			<strong>{user.full_name || user.name || user.email}</strong>. Manage
			your portfolio from here.
		</>
	);

	return (
		<>
			<MetaDataInsert title={"Admin"} />

			<Hero
				metadata={{
					description: <Desc />,
					floatingTools: false,
					serial: "// COMMAND CENTER",
					showQuickStats: false,
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: "Admin Dashboard",
								icon: (
									<LayoutDashboard className="hidden sm:block h-10 w-10 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-primary shrink-0" />
								),
							}}
						/>
					),
				}}
			/>

			{/* <div className="flex justify-end">
				<Link
					to="/admin/categories"
					className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-medium hover:border-primary transition-colors"
				>
					Manage Project Categories →
				</Link>
			</div> */}

			<PageSection className="!pt-0 space-y-4 sm:space-y-6">
				<GitHubConnect />
				<RepoList
					onImported={() => setProjectsRefreshKey((k) => k + 1)}
					refreshKey={projectsRefreshKey}
				/>
				<ProjectsTable
					onDelete={() => setProjectsRefreshKey((k) => k + 1)}
					refreshKey={projectsRefreshKey}
				/>
			</PageSection>
		</>
	);
};

export default AdminGateway;
