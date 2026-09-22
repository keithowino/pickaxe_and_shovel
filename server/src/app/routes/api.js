import { Router } from "express";
// import { authRoutes as identityRoutes } from "../../modules/identity/index.js";
// ...

const router = Router();

/**
 * Health check
 */
router.get("/health", (req, res) => {
	res.json({
		success: true,
		message: "API is healthy",
	});
});

// router.use("/auth", identityRoutes);
// ...

export default router;
