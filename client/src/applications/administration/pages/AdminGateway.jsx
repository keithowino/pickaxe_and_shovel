import { LayoutDashboard } from "lucide-react";
import { useAuth } from "../../../lib/context/AuthContext";
import MetaDataInsert from "../../../lib/MetaDataInsert.jsx";
import {
	Button,
	Heading,
	Hero,
	Loader,
	LoadHeroTitle,
	PageSection,
	Text,
} from "../../../shared/index.js";
import { GitHubConnect, ProjectsTable, RepoList } from "../components/index.js";

const AdminGateway = () => {
	const { user, isLoadingAuth, signInWithGoogle } = useAuth();

	/**
	 * #### Placeholders
	 *
	 * let isLoadingAuth = true;
	 * let user = false;
	 */

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
					<div className="max-w-md w-full border border-border bg-card/50 p-6 sm:p-8 text-center">
						<LayoutDashboard className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
						<Heading level={3}>Admin Access</Heading>
						<Text className="mb-6">
							Sign in with your Google account to manage your
							portfolio.
						</Text>
						<Button onClick={signInWithGoogle} fullWidthMobile>
							Sign in with Google
						</Button>
					</div>
				</PageSection>
			</>
		);
	}

	const Desc = () => {
		return (
			<>
				Welcome, <strong>{user.full_name || user.email}</strong>. Manage
				your portfolio from here.
			</>
		);
	};

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

			<PageSection className="!pt-0 space-y-4 sm:space-y-6">
				<GitHubConnect />
				<RepoList />
				<ProjectsTable />
			</PageSection>
		</>
	);
};

export default AdminGateway;
