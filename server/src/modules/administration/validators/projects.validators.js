import { z } from "zod";

const editableProjectFields = {
	name: z.string().trim().min(1).max(200).optional(),
	description: z.string().trim().max(5000).optional(),

	liveUrl: z.union([z.url(), z.literal("")]).optional(),
	thumbnailUrl: z.union([z.url(), z.literal("")]).optional(),

	primaryLanguage: z.string().trim().max(100).optional(),
	techStack: z.array(z.string().trim()).optional(),
	topics: z.array(z.string().trim()).optional(),
	category: z.string().trim().min(1).max(100).optional(),
	featured: z.boolean().optional(),
	published: z.boolean().optional(),
};

/**
 * Validate administrative project creation.
 *
 * GitHub repository identity and GitHub-managed metrics are not accepted
 * through manual project creation.
 */
export const createProjectBodySchema = z
	.object({
		...editableProjectFields,

		// A project may be created unpublished and then managed
		// through the administration workflow.
		published: z.boolean().optional(),

		// Preserve the existing ability to establish the initial
		// pinned state at creation time.
		pinned: z.boolean().optional(),

		// githubUrl may be established when the project is created,
		// but is not editable through the update operation.
		githubUrl: z.url().optional(),
	})
	.strict();

/**
 * Validate administrative project updates.
 *
 * Only fields explicitly designated as administrator-editable
 * are accepted here.
 *
 * Protected fields such as githubRepoId, githubUrl, stars,
 * forks, displayOrder, published, and pinned are intentionally
 * excluded.
 */
export const updateProjectBodySchema = z.object(editableProjectFields).strict();

/**
 * Validate a project ID route parameter.
 */
export const projectIdParamsSchema = z.object({
	projectId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid project ID."),
});

/**
 * Validate administrative project listing queries.
 */
export const listProjectsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	category: z.string().trim().optional(),
	featured: z.enum(["true", "false"]).optional(),
});

/**
 * Validate a project reorder request.
 *
 * The service performs the database-level validation that all
 * existing project IDs are present and that no IDs are duplicated.
 */
export const reorderProjectsBodySchema = z.object({
	orderedProjectIds: z
		.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid project ID."))
		.min(1, "At least one project ID is required."),
});
