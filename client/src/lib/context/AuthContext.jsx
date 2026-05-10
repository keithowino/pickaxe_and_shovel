import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db, getCurrentUser, logoutUser } from "../firebase.config";
import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const [authError, setAuthError] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);

	// Check if a user is an admin
	const checkAdminStatus = async (userId) => {
		try {
			const adminDoc = await getDoc(doc(db, "adminUsers", userId));
			const isAdminUser =
				adminDoc.exists() && adminDoc.data().isAdmin === true;
			setIsAdmin(isAdminUser);
			return isAdminUser;
		} catch (error) {
			console.error("Error checking admin status:", error);
			setIsAdmin(false);
			return false;
		}
	};

	// Initialize or update user in Firestore
	const initUserInFirestore = async (firebaseUser) => {
		if (!firebaseUser) return;

		try {
			const userRef = doc(db, "userSettings", firebaseUser.uid);
			const userDoc = await getDoc(userRef);

			if (!userDoc.exists()) {
				// Create user document if it doesn't exist
				await setDoc(userRef, {
					email: firebaseUser.email,
					displayName: firebaseUser.displayName,
					photoURL: firebaseUser.photoURL,
					createdAt: new Date().toISOString(),
					github: {
						username: "",
						pat: "",
					},
				});
			}
		} catch (error) {
			console.error("Error initializing user in Firestore:", error);
		}
	};

	const signInWithGoogle = async () => {
		setIsLoadingAuth(true);
		setAuthError(null);

		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const firebaseUser = result.user;

			// Check if user is admin
			const isAdminUser = await checkAdminStatus(firebaseUser.uid);

			if (!isAdminUser) {
				// Sign out non-admin users immediately
				await signOut(auth);
				setAuthError({
					type: "unauthorized",
					message:
						"You are not authorized to access the admin panel.",
				});
				setIsAuthenticated(false);
				setUser(null);
				setIsLoadingAuth(false);
				setAuthChecked(true);
				return;
			}

			// Initialize user data in Firestore
			await initUserInFirestore(firebaseUser);

			setUser({
				uid: firebaseUser.uid,
				email: firebaseUser.email,
				full_name: firebaseUser.displayName,
				photoURL: firebaseUser.photoURL,
			});
			setIsAuthenticated(true);
			setIsLoadingAuth(false);
			setAuthChecked(true);

			return result.user;
		} catch (error) {
			console.error("Google sign in error:", error);
			setAuthError({
				type: "auth_error",
				message: error.message || "Failed to sign in",
			});
			setIsAuthenticated(false);
			setIsLoadingAuth(false);
			setAuthChecked(true);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setUser(null);
			setIsAuthenticated(false);
			setIsAdmin(false);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	// Check auth state on mount
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			setIsLoadingAuth(true);

			if (firebaseUser) {
				// Check if user is admin
				const isAdminUser = await checkAdminStatus(firebaseUser.uid);

				if (isAdminUser) {
					setUser({
						uid: firebaseUser.uid,
						email: firebaseUser.email,
						full_name: firebaseUser.displayName,
						photoURL: firebaseUser.photoURL,
					});
					setIsAuthenticated(true);
					setAuthError(null);
				} else {
					// Non-admin user - sign them out
					await signOut(auth);
					setUser(null);
					setIsAuthenticated(false);
					setAuthError({
						type: "unauthorized",
						message:
							"You are not authorized to access the admin panel.",
					});
				}
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}

			setIsLoadingAuth(false);
			setAuthChecked(true);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isAdmin,
				isLoadingAuth,
				authError,
				authChecked,
				signInWithGoogle,
				logout,
				checkAdminStatus,
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
