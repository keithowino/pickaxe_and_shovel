import { Router } from "express";

import { projectController } from "../controllers/index.js";

const router = Router();

// Public endpoints
router.get("/", projectController.list);
router.get("/stats", projectController.getStats);

// Public project details
router.get("/:projectId", projectController.getById);

export default router;
