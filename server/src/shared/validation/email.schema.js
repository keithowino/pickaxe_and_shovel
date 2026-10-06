import { z } from "zod";

const emailSchema = z
	.email("A valid email address is required.")
	.max(254, "Email must not exceed 254 characters.")
	.transform((email) => email.toLowerCase());

export default emailSchema;
