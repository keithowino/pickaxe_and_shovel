import { Router } from "express";

import { projectController } from "../controllers/index.js";

import { authenticate, requireRole, ROLES } from "../../identity/index.js";

const router = Router();

// Public endpoints
router.get("/", projectController.list);
router.get("/stats", projectController.getStats);

// Administrative endpoints
router.use("/admin", authenticate, requireRole(ROLES.ADMIN));

router.get("/admin", projectController.listAdmin);
router.get("/admin/stats", projectController.getAdminStats);
router.get("/admin/:projectId", projectController.getAdminById);

router.post("/admin", projectController.create);

// Project ordering — register before the generic project ID route.
router.patch("/admin/order", projectController.reorder);

router.patch("/admin/:projectId", projectController.update);
router.delete("/admin/:projectId", projectController.remove);

// Public project details
router.get("/:projectId", projectController.getById);

export default router;
