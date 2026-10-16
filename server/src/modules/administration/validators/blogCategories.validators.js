import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const nameSchema = z
	.string()
	.trim()
	.min(1, "Category name is required.")
	.max(100, "Category name cannot exceed 100 characters.");

const descriptionSchema = z
	.string()
	.trim()
	.max(500, "Description cannot exceed 500 characters.");

const displayOrderSchema = z.coerce
	.number()
	.int("Display order must be an integer.")
	.min(0, "Display order cannot be negative.");

const activeSchema = z.preprocess((value) => {
	if (value === "true") return true;
	if (value === "false") return false;
	return value;
}, z.boolean());

export const listBlogCategoriesQuerySchema = z
	.object({
		includeInactive: activeSchema.optional().default(false),
	})
	.strict();

export const blogCategoryIdParamsSchema = z
	.object({
		id: objectIdSchema,
	})
	.strict();

export const createBlogCategoryBodySchema = z
	.object({
		name: nameSchema,
		description: descriptionSchema.optional(),
		displayOrder: displayOrderSchema.optional(),
		active: activeSchema.optional(),
	})
	.strict();

export const updateBlogCategoryBodySchema = z
	.object({
		name: nameSchema.optional(),
		description: descriptionSchema.optional(),
		displayOrder: displayOrderSchema.optional(),
		active: activeSchema.optional(),
	})
	.strict()
	.refine(
		(data) => Object.keys(data).length > 0,
		"At least one category field must be provided.",
	);

export const setBlogCategoryActiveBodySchema = z
	.object({
		active: activeSchema,
	})
	.strict();
