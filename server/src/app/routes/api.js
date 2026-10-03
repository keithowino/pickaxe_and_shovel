import { Router } from "express";

import { database } from "../bootstrap/index.js";
import { success } from "../../shared/index.js";

import {
	administrationProjectsRoutes,
	authRoutes,
	githubRepositoriesRoutes,
	githubSettingsRoutes,
	projectCategoryRoutes,
	projectRoutes,
} from "../../modules/index.js";

const router = Router();

/**
 * Health check
 */
router.get("/health", (req, res) => {
	const databaseConnected = database.isDatabaseConnected();

	return success(
		res,
		{
			status: databaseConnected ? "healthy" : "degraded",
			api: "up",
			database: databaseConnected ? "connected" : "disconnected",
		},
		databaseConnected
			? "API is healthy."
			: "API is running but database is unavailable.",
	);
});

router.use("/auth", authRoutes);

router.use("/admin/github", githubSettingsRoutes);
router.use("/admin/github/repositories", githubRepositoriesRoutes);
router.use("/admin/projects", administrationProjectsRoutes);

router.use("/projects", projectRoutes);

router.use("/project-categories", projectCategoryRoutes);

export default router;
