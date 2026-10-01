import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { administrationProjectsController } from "../controllers/index.js";

const router = Router();

// All project administration endpoints require an authenticated administrator.
router.use(authenticate, requireAdmin);

// Project administration
router.get("/", administrationProjectsController.list);
router.get("/stats", administrationProjectsController.getStats);
router.get("/:projectId", administrationProjectsController.getById);

router.post("/", administrationProjectsController.create);

// Project ordering — keep this before /:projectId.
router.patch("/order", administrationProjectsController.reorder);

router.patch("/:projectId", administrationProjectsController.update);

router.delete("/:projectId", administrationProjectsController.remove);

export default router;
