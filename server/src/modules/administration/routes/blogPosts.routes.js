import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";
import { blogPostController } from "../controllers/index.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/", blogPostController.list);
router.post("/create", blogPostController.create);
router.patch("/:id", blogPostController.update);
router.delete("/:id", blogPostController.remove);

export default router;
