import React, { useState } from "react";
import { useAuth } from "../lib/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";

export default function SetupAdmin() {
	const { user, signInWithGoogle, isLoadingAuth } = useAuth();
	const [status, setStatus] = useState("");
	const [loading, setLoading] = useState(false);

	const setupAdmin = async () => {
		if (!user) {
			setStatus("❌ Please sign in first");
			return;
		}

		setLoading(true);
		setStatus("⏳ Granting admin access...");

		try {
			await setDoc(doc(db, "adminUsers", user.uid), {
				email: user.email,
				isAdmin: true,
				addedAt: new Date().toISOString(),
				displayName: user.full_name || user.displayName || "",
			});
			setStatus(
				"✅ SUCCESS! You now have admin access. You can now visit /admin",
			);
		} catch (error) {
			setStatus(`❌ Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	if (isLoadingAuth) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-6 bg-background">
			<div className="max-w-md w-full border border-border bg-card/50 p-8">
				<div className="text-center mb-6">
					<div className="serial-number text-primary mb-2">
						// SYSTEM SETUP
					</div>
					<h1 className="font-heading text-3xl font-bold">
						Admin Setup
					</h1>
					<p className="text-muted-foreground mt-2 text-sm">
						Grant admin access to your account
					</p>
				</div>

				{user ? (
					<div>
						<div className="border border-border p-4 mb-6">
							<div className="text-xs text-muted-foreground mb-1">
								SIGNED IN AS
							</div>
							<div className="font-medium">{user.email}</div>
							<div className="text-xs text-muted-foreground mt-1">
								UID: {user.uid}
							</div>
						</div>

						<button
							onClick={setupAdmin}
							disabled={loading}
							className="w-full bg-primary text-primary-foreground px-4 py-3 font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
						>
							{loading
								? "Granting Access..."
								: "Grant Admin Access"}
						</button>
					</div>
				) : (
					<div>
						<p className="text-muted-foreground text-sm mb-6 text-center">
							Sign in with your Google account to grant yourself
							admin access.
						</p>
						<button
							onClick={signInWithGoogle}
							className="w-full bg-primary text-primary-foreground px-4 py-3 font-medium hover:bg-primary/90 transition-colors"
						>
							Sign in with Google
						</button>
					</div>
				)}

				{status && (
					<div
						className={`mt-6 p-4 border text-sm ${
							status.includes("SUCCESS")
								? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
								: status.includes("Error") ||
									  status.includes("❌")
									? "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400"
									: "border-border text-muted-foreground"
						}`}
					>
						{status}
					</div>
				)}

				<div className="mt-6 pt-6 border-t border-border">
					<p className="text-xs text-muted-foreground text-center">
						⚠️ This page should be removed after setup for security
					</p>
				</div>
			</div>
		</div>
	);
}
