import { z } from "zod";

/**
 * Validate the repository IDs submitted for GitHub import.
 */
export const importRepositoriesBodySchema = z
	.object({
		githubRepoIds: z
			.array(z.number().int().positive())
			.min(1, "At least one GitHub repository ID is required."),
	})
	.strict();
