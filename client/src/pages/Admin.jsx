import { LayoutDashboard, Loader2 } from "lucide-react";
import MetaDataInsert from "../lib/MetaDataInsert";
import { useAuth } from "../lib/context/AuthContext";
import GitHubConnect from "../components/admin/GitHubConnect";
import RepoList from "../components/admin/RepoList";
import ProjectsTable from "../components/admin/ProjectsTable";

const Admin = () => {
	const { user, isLoadingAuth, signInWithGoogle } = useAuth();

	// Show loading state
	if (isLoadingAuth) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// Show login screen if not authenticated
	if (!user) {
		return (
			<>
				<MetaDataInsert title={"Admin Login"} />
				<div className="min-h-screen flex items-center justify-center px-6">
					<div className="max-w-md w-full border border-border bg-card/50 p-8 text-center">
						<LayoutDashboard className="h-12 w-12 text-primary mx-auto mb-4" />
						<h1 className="font-heading text-2xl font-bold mb-2">
							Admin Access
						</h1>
						<p className="text-muted-foreground mb-6">
							Sign in with your Google account to manage your
							portfolio.
						</p>
						<button
							onClick={signInWithGoogle}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Sign in with Google
						</button>
					</div>
				</div>
			</>
		);
	}

	// Show admin dashboard when authenticated
	return (
		<>
			<MetaDataInsert title={"Admin"} />
			<div className="max-w-5xl mx-auto px-6 lg:px-10 pt-20 pb-24">
				<div className="mb-10">
					<div className="serial-number text-primary mb-3">
						// COMMAND CENTER
					</div>
					<h1 className="font-heading text-4xl md:text-5xl font-bold flex items-center gap-3">
						<LayoutDashboard className="h-8 w-8 text-primary" />
						Admin Dashboard
					</h1>
					<p className="mt-2 text-muted-foreground">
						Welcome, <strong>{user.full_name || user.email}</strong>
						. Manage your portfolio from here.
					</p>
				</div>

				<div className="space-y-6">
					<GitHubConnect />
					<RepoList />
					<ProjectsTable />
				</div>
			</div>
		</>
	);
};

export default Admin;
