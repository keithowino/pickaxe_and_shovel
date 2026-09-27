import { z } from "zod";
import { emailSchema, passwordSchema } from "../../../shared/index.js";

export const loginRequestSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});
