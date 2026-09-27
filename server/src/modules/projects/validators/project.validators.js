import { z } from "zod";

const projectFields = {
	githubRepoId: z.number().int().positive().optional(),
	name: z.string().trim().min(1).max(200),
	description: z.string().trim().max(5000).optional(),
	githubUrl: z.url().optional(),
	liveUrl: z.url().optional(),
	primaryLanguage: z.string().trim().max(100).optional(),
	techStack: z.array(z.string().trim()).optional(),
	topics: z.array(z.string().trim()).optional(),
	category: z.string().trim().min(1).max(100).optional(),
	stars: z.number().int().min(0).optional(),
	forks: z.number().int().min(0).optional(),
	pinned: z.boolean().optional(),
	displayOrder: z.number().int().optional(),
	featured: z.boolean().optional(),
	published: z.boolean().optional(),
};

export const projectIdParamsSchema = z.object({
	projectId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid project ID."),
});

export const listProjectsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	category: z.string().trim().optional(),
	featured: z.enum(["true", "false"]).optional(),
});

export const createProjectBodySchema = z.object({
	...projectFields,
	name: projectFields.name,
});

export const updateProjectBodySchema = z.object(projectFields).partial();

/**
 * Validate the request body for reordering projects.
 *
 * orderedProjectIds must be a non-empty array of valid
 * MongoDB ObjectId strings.
 */
export const reorderProjectsBodySchema = z.object({
	orderedProjectIds: z
		.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid project ID."))
		.min(1, "At least one project ID is required."),
});
