import { Router } from "express";

import { database } from "../bootstrap/index.js";
import { success } from "../../shared/index.js";
import { authRoutes } from "../../modules/identity/index.js";
import { projectRoutes } from "../../modules/projects/index.js";

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
router.use("/projects", projectRoutes);

export default router;
