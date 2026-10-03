import { Router } from "express";
import { projectCategoryController } from "../controllers/index.js";
import { authenticate, requireAdmin } from "../../identity/index.js";

const router = Router();

router.get("/", projectCategoryController.list);
router.get("/:id", projectCategoryController.getById);

router.use(authenticate, requireAdmin);

router.post("/", projectCategoryController.create);
router.patch("/:id", projectCategoryController.update);
router.delete("/:id", projectCategoryController.remove);

export default router;
