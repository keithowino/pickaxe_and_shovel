import { Router } from "express";

import { contactController } from "../controllers/index.js";

const router = Router();

router.post("/", contactController.createContactMessage);

export default router;
