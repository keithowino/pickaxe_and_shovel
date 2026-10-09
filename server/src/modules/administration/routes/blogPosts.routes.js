import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";
import { blogPostController } from "../controllers/index.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.post("/create", blogPostController.create);

export default router;
