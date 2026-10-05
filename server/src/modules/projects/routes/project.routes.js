import { Router } from "express";

import { projectController } from "../controllers/index.js";

const router = Router();

// Public endpoints
router.get("/", projectController.list);
router.get("/stats", projectController.getStats);

// Public project details
// router.get("/:projectId", projectController.getById);

/**
 * The ordering here matters because /stats must
 * be matched before the dynamic /:slug route.
 */
router.get("/:slug", projectController.getBySlug);

export default router;
