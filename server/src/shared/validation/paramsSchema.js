import { z } from "zod";
import objectIdSchema from "./objectId.schema.js";

export const projectIdParamsSchema = z.object({
	projectId: objectIdSchema,
});

export const projectSlugParamsSchema = z.object({
	slug: z
		.string()
		.trim()
		.min(1)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid project slug."),
});
