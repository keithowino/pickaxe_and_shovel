import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

export const listProjectsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	category: objectIdSchema.optional(),
	featured: z.enum(["true", "false"]).optional(),
});
