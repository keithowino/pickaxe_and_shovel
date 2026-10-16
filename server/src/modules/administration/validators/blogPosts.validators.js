import { z } from "zod";
import {
	BLOG_STATUS_VALUES,
	BLOG_TYPE_VALUES,
	objectIdSchema,
} from "../../../shared/index.js";

export const createBlogPostBodySchema = z.object({
	title: z.string().trim().min(1).max(200),
	slug: z
		.string()
		.trim()
		.min(1)
		.max(120)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	excerpt: z.string().trim().min(1).max(200),
	content: z.string().trim().min(1),
	coverImageUrl: z.union([z.url(), z.literal("")]),
	category: objectIdSchema,
	tags: z.array(z.string().trim().toLowerCase()).optional(),
	type: z.enum(BLOG_TYPE_VALUES).optional(),
	status: z.enum(BLOG_STATUS_VALUES).optional(),
	publishedAt: z.coerce.date().nullable().optional(),
	readingTimeMinutes: z.number().int().nonnegative().optional(),
});

export const updateBlogPostBodySchema = createBlogPostBodySchema.partial();
