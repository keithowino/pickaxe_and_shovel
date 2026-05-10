import {
	db,
	projectsCollection,
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
} from "../lib/firebase.config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

// Get all projects with optional filtering
export const fetchProjects = async (options = {}) => {
	const { category, sortBy = "createdAt", sortOrder = "desc" } = options;

	try {
		let q = query(projectsCollection, orderBy(sortBy, sortOrder));

		if (category && category !== "All") {
			q = query(q, where("category", "==", category));
		}

		const snapshot = await getDocs(q);
		const projects = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

// Get a single project by ID
export const fetchProjectById = async (id) => {
	return await getProject(id);
};

// Get featured projects
export const fetchFeaturedProjects = async () => {
	try {
		const q = query(
			projectsCollection,
			where("featured", "==", true),
			orderBy("createdAt", "desc"),
		);
		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (error) {
		console.error("Error fetching featured projects:", error);
		return [];
	}
};

// Get projects by category
export const fetchProjectsByCategory = async (category) => {
	try {
		const q = query(
			projectsCollection,
			where("category", "==", category),
			orderBy("createdAt", "desc"),
		);
		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (error) {
		console.error(`Error fetching ${category} projects:`, error);
		return [];
	}
};

// Get project statistics
export const getProjectStats = async () => {
	try {
		const allProjects = await fetchProjects();
		const categories = {};
		let totalStars = 0;
		let totalForks = 0;

		allProjects.forEach((project) => {
			const cat = project.category || "Web";
			categories[cat] = (categories[cat] || 0) + 1;
			totalStars += project.stars || 0;
			totalForks += project.forks || 0;
		});

		return {
			total: allProjects.length,
			categories,
			totalStars,
			totalForks,
		};
	} catch (error) {
		console.error("Error getting project stats:", error);
		return { total: 0, categories: {}, totalStars: 0, totalForks: 0 };
	}
};
