import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";
import { adminBlogCategoriesController } from "../controllers/index.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/", adminBlogCategoriesController.list);
router.post("/", adminBlogCategoriesController.create);
router.get("/:id", adminBlogCategoriesController.getById);
router.patch("/:id/active", adminBlogCategoriesController.setActive);
router.patch("/:id", adminBlogCategoriesController.update);
router.delete("/:id", adminBlogCategoriesController.remove);

export default router;
