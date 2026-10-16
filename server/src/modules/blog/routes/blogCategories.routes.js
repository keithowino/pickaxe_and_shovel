import { Router } from "express";

import { blogCategoriesController } from "../controllers/index.js";

const router = Router();

router.get("/", blogCategoriesController.list);

export default router;
