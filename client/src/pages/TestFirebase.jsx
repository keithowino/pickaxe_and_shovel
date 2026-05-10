import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase.config";
import {
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

export default function TestFirebase() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [logs, setLogs] = useState([]);

	const addLog = (message, isError = false) => {
		setLogs((prev) => [
			...prev,
			{ message, timestamp: new Date().toLocaleTimeString(), isError },
		]);
		console.log(message);
	};

	// Test Firebase initialization
	useEffect(() => {
		addLog("🔍 Testing Firebase initialization...");
		addLog(`✅ Firebase Auth initialized: ${!!auth}`);
		addLog(`✅ Firebase Firestore initialized: ${!!db}`);

		// Check auth state
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				addLog(`✅ User signed in: ${user.email} (UID: ${user.uid})`);
				setUser(user);
			} else {
				addLog("📭 No user signed in");
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const testSignIn = async () => {
		setLoading(true);
		addLog("🔄 Attempting Google sign in...");

		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			addLog(`✅ Sign in successful! User: ${result.user.email}`);
			setUser(result.user);
		} catch (error) {
			addLog(`❌ Sign in failed: ${error.message}`, true);
			addLog(`Error code: ${error.code}`, true);
		} finally {
			setLoading(false);
		}
	};

	const testFirestoreWrite = async () => {
		if (!user) {
			addLog("❌ Please sign in first", true);
			return;
		}

		setLoading(true);
		addLog(`🔄 Testing Firestore write for user: ${user.uid}`);

		try {
			// Try to write to adminUsers collection
			const adminRef = doc(db, "adminUsers", user.uid);
			await setDoc(adminRef, {
				email: user.email,
				isAdmin: true,
				addedAt: new Date().toISOString(),
				testWrite: true,
			});
			addLog("✅ Successfully wrote to adminUsers collection!");

			// Try to read it back
			addLog("🔄 Testing Firestore read...");
			const testCollection = collection(db, "adminUsers");
			const snapshot = await getDocs(testCollection);
			addLog(
				`✅ Successfully read from adminUsers. Found ${snapshot.size} documents`,
			);
		} catch (error) {
			addLog(`❌ Firestore operation failed: ${error.message}`, true);
			addLog(`Error details: ${JSON.stringify(error)}`, true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="font-heading text-3xl font-bold mb-6">
					Firebase Debug Tool
				</h1>

				<div className="space-y-6">
					{/* Status Card */}
					<div className="border border-border p-6">
						<h2 className="font-heading text-xl font-bold mb-4">
							System Status
						</h2>
						<div className="space-y-2">
							<div>
								🔧 Firebase Auth:{" "}
								<span className="text-green-500">
									✓ Initialized
								</span>
							</div>
							<div>
								💾 Firestore:{" "}
								<span className="text-green-500">
									✓ Initialized
								</span>
							</div>
							<div>
								👤 Auth State:{" "}
								{user ? (
									<span className="text-green-500">
										Signed in as {user.email}
									</span>
								) : (
									<span className="text-yellow-500">
										Not signed in
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="border border-border p-6">
						<h2 className="font-heading text-xl font-bold mb-4">
							Actions
						</h2>
						<div className="space-y-4">
							<button
								onClick={testSignIn}
								disabled={loading}
								className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
							>
								Test Google Sign In
							</button>

							<button
								onClick={testFirestoreWrite}
								disabled={loading || !user}
								className="px-4 py-2 bg-secondary text-secondary-foreground rounded disabled:opacity-50 ml-4"
							>
								Test Firestore Write
							</button>
						</div>
					</div>

					{/* Logs */}
					<div className="border border-border p-6">
						<h2 className="font-heading text-xl font-bold mb-4">
							Debug Logs
						</h2>
						<div className="bg-muted p-4 font-mono text-xs h-96 overflow-y-auto">
							{logs.map((log, i) => (
								<div
									key={i}
									className={`mb-1 ${log.isError ? "text-red-500" : "text-foreground"}`}
								>
									[{log.timestamp}] {log.message}
								</div>
							))}
							{logs.length === 0 && (
								<div className="text-muted-foreground">
									No logs yet...
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
