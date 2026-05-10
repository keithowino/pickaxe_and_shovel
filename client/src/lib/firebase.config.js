import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helper functions
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(user);
			},
			reject,
		);
	});
};

export const logoutUser = async () => {
	await signOut(auth);
};

// Firestore collection references
export const projectsCollection = collection(db, "projects");
export const userSettingsCollection = collection(db, "userSettings");

// Project CRUD operations
export const getProjects = async () => {
	const snapshot = await getDocs(projectsCollection);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProject = async (id) => {
	const docRef = doc(db, "projects", id);
	const snapshot = await getDoc(docRef);
	return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const createProject = async (data) => {
	const docRef = doc(projectsCollection);
	await setDoc(docRef, { ...data, createdAt: new Date().toISOString() });
	return { id: docRef.id, ...data };
};

export const updateProject = async (id, data) => {
	const docRef = doc(db, "projects", id);
	await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
};

export const deleteProject = async (id) => {
	const docRef = doc(db, "projects", id);
	await deleteDoc(docRef);
};

// User settings CRUD operations
export const getUserSettings = async (userId) => {
	const docRef = doc(db, "userSettings", userId);
	const snapshot = await getDoc(docRef);
	return snapshot.exists() ? snapshot.data() : null;
};

export const updateUserSettings = async (userId, data) => {
	const docRef = doc(db, "userSettings", userId);
	await setDoc(docRef, data, { merge: true });
};
