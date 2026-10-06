import { z } from "zod";
import { emailSchema } from "../../../shared/index.js";

export const createContactMessageSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Name is required.")
		.max(100, "Name must not exceed 100 characters."),

	email: emailSchema,

	subject: z
		.string()
		.trim()
		.max(200, "Subject must not exceed 200 characters.")
		.optional()
		.default(""),

	message: z
		.string()
		.trim()
		.min(1, "Message is required.")
		.max(5000, "Message must not exceed 5000 characters."),
});
