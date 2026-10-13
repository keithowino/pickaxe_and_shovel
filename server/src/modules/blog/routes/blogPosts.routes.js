import { Router } from "express";
import { blogPostController } from "../controllers/index.js";

const router = Router();

router.get("/", blogPostController.list);
router.get("/:slug", blogPostController.getBySlug);

export default router;
