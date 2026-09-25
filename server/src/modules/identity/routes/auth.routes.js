import { Router } from "express";

import { authController } from "../controllers/index.js";
import { authenticate } from "../middleware/index.js";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

router.use(authenticate);
router.get("/me", authController.me);

export default router;
