import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { gitHubSettingsController } from "../controllers/index.js";

const router = Router();

// All routes require an authenticated administrator.
router.use(authenticate, requireAdmin);

// GET /api/v1/admin/github/settings
router.get("/settings", gitHubSettingsController.getSettings);

// PUT /api/v1/admin/github/settings
router.put("/settings", gitHubSettingsController.saveSettings);

// DELETE /api/v1/admin/github/settings
router.delete("/settings", gitHubSettingsController.disconnect);

export default router;
