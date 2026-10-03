import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

export const createProjectCategorySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Category name is required.")
		.max(100, "Category name cannot exceed 100 characters."),

	// slug: z
	// 	.string()
	// 	.trim()
	// 	.min(1, "Category slug is required.")
	// 	.max(120, "Category slug cannot exceed 120 characters.")
	// 	.regex(
	// 		/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
	// 		"Slug must contain lowercase letters, numbers, and hyphens only.",
	// 	),

	description: z
		.string()
		.trim()
		.max(500, "Description cannot exceed 500 characters.")
		.optional()
		.default(""),

	displayOrder: z
		.number()
		.int("Display order must be an integer.")
		.min(0, "Display order cannot be negative.")
		.optional()
		.default(0),

	active: z.boolean().optional().default(true),
});

export const updateProjectCategorySchema =
	createProjectCategorySchema.partial();

export const projectCategoryIdSchema = z.object({
	id: objectIdSchema,
});

export const projectCategoryQuerySchema = z.object({
	active: z
		.enum(["true", "false"])
		.transform((value) => value === "true")
		.optional(),
});
