import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";
import { adminBlogPostController } from "../controllers/index.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/", adminBlogPostController.list);
router.post("/create", adminBlogPostController.create);
router.patch("/:id", adminBlogPostController.update);
router.delete("/:id", adminBlogPostController.remove);

export default router;
