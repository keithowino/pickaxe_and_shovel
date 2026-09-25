import { z } from "zod";

export const loginRequestSchema = z.object({
	email: z.email("A valid email address is required."),

	password: z.string().min(1, "Password is required."),
});
