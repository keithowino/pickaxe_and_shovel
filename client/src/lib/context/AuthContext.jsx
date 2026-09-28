// import { createContext, useState, useContext, useEffect } from "react";

import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";

// import { auth, db, getCurrentUser, logoutUser } from "../firebase.config";
// import {
// 	onAuthStateChanged,
// 	signInWithPopup,
// 	GoogleAuthProvider,
// 	signOut,
// } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

import apiRequest from "../apiClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const [authError, setAuthError] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);

	// // Check if a user is an admin
	// const checkAdminStatus = async (userId) => {
	// 	try {
	// 		const adminDoc = await getDoc(doc(db, "adminUsers", userId));
	// 		const isAdminUser =
	// 			adminDoc.exists() && adminDoc.data().isAdmin === true;
	// 		setIsAdmin(isAdminUser);
	// 		return isAdminUser;
	// 	} catch (error) {
	// 		console.error("Error checking admin status:", error);
	// 		setIsAdmin(false);
	// 		return false;
	// 	}
	// };

	// Initialize or update user in Firestore
	// const initUserInFirestore = async (firebaseUser) => {
	// 	if (!firebaseUser) return;

	// 	try {
	// 		const userRef = doc(db, "userSettings", firebaseUser.uid);
	// 		const userDoc = await getDoc(userRef);

	// 		if (!userDoc.exists()) {
	// 			// Create user document if it doesn't exist
	// 			await setDoc(userRef, {
	// 				email: firebaseUser.email,
	// 				displayName: firebaseUser.displayName,
	// 				photoURL: firebaseUser.photoURL,
	// 				createdAt: new Date().toISOString(),
	// 				github: {
	// 					username: "",
	// 					pat: "",
	// 				},
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error("Error initializing user in Firestore:", error);
	// 	}
	// };

	const applyUser = useCallback((nextUser) => {
		setUser(nextUser);
		setIsAuthenticated(Boolean(nextUser));
		setIsAdmin(nextUser?.roles?.includes("admin") ?? false);
	}, []);

	const clearUser = useCallback(() => {
		setUser(null);
		setIsAuthenticated(false);
		setIsAdmin(false);
	}, []);

	const restoreSession = useCallback(async () => {
		try {
			const response = await apiRequest("/auth/me");
			applyUser(response.data.user);
			setAuthError(null);
		} catch (error) {
			clearUser();

			if (error.status !== 401) {
				setAuthError({
					type: "auth_error",
					message: error.message || "Unable to restore session.",
				});
			}
		} finally {
			setIsLoadingAuth(false);
			setAuthChecked(true);
		}
	}, [applyUser, clearUser]);

	// const signInWithGoogle = async () => {
	// 	setIsLoadingAuth(true);
	// 	setAuthError(null);

	// 	try {
	// 		const provider = new GoogleAuthProvider();
	// 		const result = await signInWithPopup(auth, provider);
	// 		const firebaseUser = result.user;

	// 		// Check if user is admin
	// 		const isAdminUser = await checkAdminStatus(firebaseUser.uid);

	// 		if (!isAdminUser) {
	// 			// Sign out non-admin users immediately
	// 			await signOut(auth);
	// 			setAuthError({
	// 				type: "unauthorized",
	// 				message:
	// 					"You are not authorized to access the admin panel.",
	// 			});
	// 			setIsAuthenticated(false);
	// 			setUser(null);
	// 			setIsLoadingAuth(false);
	// 			setAuthChecked(true);
	// 			return;
	// 		}

	// 		// Initialize user data in Firestore
	// 		await initUserInFirestore(firebaseUser);

	// 		setUser({
	// 			uid: firebaseUser.uid,
	// 			email: firebaseUser.email,
	// 			full_name: firebaseUser.displayName,
	// 			photoURL: firebaseUser.photoURL,
	// 		});
	// 		setIsAuthenticated(true);
	// 		setIsLoadingAuth(false);
	// 		setAuthChecked(true);

	// 		return result.user;
	// 	} catch (error) {
	// 		console.error("Google sign in error:", error);
	// 		setAuthError({
	// 			type: "auth_error",
	// 			message: error.message || "Failed to sign in",
	// 		});
	// 		setIsAuthenticated(false);
	// 		setIsLoadingAuth(false);
	// 		setAuthChecked(true);
	// 		throw error;
	// 	}
	// };

	const login = useCallback(
		async (email, password) => {
			setIsLoadingAuth(true);
			setAuthError(null);

			try {
				const response = await apiRequest("/auth/login", {
					method: "POST",
					body: { email, password },
				});

				applyUser(response.data.user);
				setAuthError(null);

				return response.data.user;
			} catch (error) {
				clearUser();

				/**
				 * It was recommended that this was to be removed.
				 */
				setAuthError({
					type: error.status === 401 ? "unauthorized" : "auth_error",
					message: error.message || "Failed to sign in.",
				});

				throw error;
			} finally {
				setIsLoadingAuth(false);
				setAuthChecked(true);
			}
		},
		[applyUser, clearUser],
	);

	// const logout = async () => {
	// 	try {
	// 		await logoutUser();
	// 		setUser(null);
	// 		setIsAuthenticated(false);
	// 		setIsAdmin(false);
	// 	} catch (error) {
	// 		console.error("Logout error:", error);
	// 	}
	// };

	const logout = useCallback(async () => {
		try {
			await apiRequest("/auth/logout", {
				method: "POST",
			});
		} finally {
			clearUser();
			setAuthError(null);
		}
	}, [clearUser]);

	// // Check auth state on mount
	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
	// 		setIsLoadingAuth(true);

	// 		if (firebaseUser) {
	// 			// Check if user is admin
	// 			const isAdminUser = await checkAdminStatus(firebaseUser.uid);

	// 			if (isAdminUser) {
	// 				setUser({
	// 					uid: firebaseUser.uid,
	// 					email: firebaseUser.email,
	// 					full_name: firebaseUser.displayName,
	// 					photoURL: firebaseUser.photoURL,
	// 				});
	// 				setIsAuthenticated(true);
	// 				setAuthError(null);
	// 			} else {
	// 				// Non-admin user - sign them out
	// 				await signOut(auth);
	// 				setUser(null);
	// 				setIsAuthenticated(false);
	// 				setAuthError({
	// 					type: "unauthorized",
	// 					message:
	// 						"You are not authorized to access the admin panel.",
	// 				});
	// 			}
	// 		} else {
	// 			setUser(null);
	// 			setIsAuthenticated(false);
	// 		}

	// 		setIsLoadingAuth(false);
	// 		setAuthChecked(true);
	// 	});

	// 	return () => unsubscribe();
	// }, []);

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isAdmin,
				isLoadingAuth,
				authError,
				authChecked,
				// signInWithGoogle,
				login,
				logout,
				// checkAdminStatus,
				restoreSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
