import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { gitHubRepositoriesController } from "../controllers/index.js";

const router = Router();

// All repository endpoints require an authenticated administrator.
router.use(authenticate, requireAdmin);

// GET /repositories
router.get("/", gitHubRepositoriesController.list);

// POST /repositories/import
router.post("/import", gitHubRepositoriesController.importSelected);

router.post("/:projectId/refresh", gitHubRepositoriesController.refresh);

export default router;
