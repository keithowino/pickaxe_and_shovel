// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/lib/AuthContext";
// import { base44 } from "@/api/base44Client";
// import { Loader2, LayoutDashboard } from "lucide-react";

import { LayoutDashboard } from "lucide-react";
import GitHubConnect from "../components/admin/GitHubConnect";
import RepoList from "../components/admin/RepoList";
import ProjectsTable from "../components/admin/ProjectsTable";

const Admin = () => {
	// const { user, isLoadingAuth } = useAuth();
	// const [profile, setProfile] = useState(null);
	// const [loadingProfile, setLoadingProfile] = useState(true);
	// const [refreshKey, setRefreshKey] = useState(0);

	// const loadProfile = async () => {
	// 	try {
	// 		const me = await base44.auth.me();
	// 		setProfile(me);
	// 	} catch {
	// 		setProfile(null);
	// 	} finally {
	// 		setLoadingProfile(false);
	// 	}
	// };

	// useEffect(() => {
	// 	loadProfile();
	// }, []);

	// if (isLoadingAuth || loadingProfile) {
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<Loader2 className="h-8 w-8 animate-spin text-primary" />
	// 		</div>
	// 	);
	// }

	// if (!user) {
	// 	base44.auth.redirectToLogin("/admin");
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<Loader2 className="h-8 w-8 animate-spin text-primary" />
	// 		</div>
	// 	);
	// }

	// const handleConnected = () => {
	// 	loadProfile();
	// 	setRefreshKey((k) => k + 1);
	// };

	// const handleImported = () => setRefreshKey((k) => k + 1);

	return (
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
					{/* Welcome, <strong>{user.full_name || user.email}</strong>. */}
					Welcome Name Manage your portfolio from here.
				</p>
			</div>

			<div className="space-y-6">
				{/* <GitHubConnect user={profile} onConnected={handleConnected} /> */}
				<GitHubConnect />
				{/* <RepoList user={profile} onImported={handleImported} /> */}
				<RepoList />
				{/* <ProjectsTable user={profile} refreshKey={refreshKey} /> */}
				<ProjectsTable />
			</div>
		</div>
	);
};

export default Admin;
