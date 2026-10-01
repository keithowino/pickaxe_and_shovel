import { z } from "zod";

export const projectIdParamsSchema = z.object({
	projectId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid project ID."),
});

export const listProjectsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	category: z.string().trim().optional(),
	featured: z.enum(["true", "false"]).optional(),
});
