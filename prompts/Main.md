```js
`~\server\src\app\config\env.js`;

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),

	// Environment variables arrive as strings hence the `z.coerce.number()`.
	PORT: z.coerce.number().int().positive().default(5000),

	MONGODB_URI: z.string().min(1, "MONGODB_URI is required."),

	CLIENT_URL: z.string().url().default("http://localhost:3000"),

	CLOUDINARY_CLOUD_NAME: z
		.string()
		.min(1, "CLOUDINARY_CLOUD_NAME is required."),

	CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required."),

	CLOUDINARY_API_SECRET: z
		.string()
		.min(1, "CLOUDINARY_API_SECRET is required."),

	JWT_ACCESS_SECRET: z
		.string()
		.min(32, "JWT_ACCESS_SECRET must be at least 32 characters."),

	JWT_REFRESH_SECRET: z
		.string()
		.min(32, "JWT_REFRESH_SECRET must be at least 32 characters."),

	JWT_ACCESS_EXPIRES: z.string().default("15m"),

	JWT_REFRESH_EXPIRES: z.string().default("7d"),

	JWT_ISSUER: z.string().default("pickaxe-and-shovel"),

	JWT_AUDIENCE: z.string().default("pickaxe-and-shovel-client"),

	GITHUB_TOKEN_ENCRYPTION_KEY: z
		.string()
		.regex(
			/^[0-9a-fA-F]{64}$/,
			"GITHUB_TOKEN_ENCRYPTION_KEY must be a 32-byte hexadecimal key.",
		),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid server environment configuration:");

	for (const issue of parsedEnv.error.issues) {
		console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
	}

	process.exit(1);
}

export const env = {
	nodeEnv: parsedEnv.data.NODE_ENV,
	port: parsedEnv.data.PORT,
	mongoUri: parsedEnv.data.MONGODB_URI,
	clientUrl: parsedEnv.data.CLIENT_URL,

	cloudinary: {
		cloudName: parsedEnv.data.CLOUDINARY_CLOUD_NAME,
		apiKey: parsedEnv.data.CLOUDINARY_API_KEY,
		apiSecret: parsedEnv.data.CLOUDINARY_API_SECRET,
	},

	jwt: {
		accessSecret: parsedEnv.data.JWT_ACCESS_SECRET,
		refreshSecret: parsedEnv.data.JWT_REFRESH_SECRET,
		accessExpires: parsedEnv.data.JWT_ACCESS_EXPIRES,
		refreshExpires: parsedEnv.data.JWT_REFRESH_EXPIRES,
		issuer: parsedEnv.data.JWT_ISSUER,
		audience: parsedEnv.data.JWT_AUDIENCE,
	},

	github: {
		tokenEncryptionKey: parsedEnv.data.GITHUB_TOKEN_ENCRYPTION_KEY,
	},
};
```

The foundation is in place keeping the first change focused ensuring the backend can start with the required encryption configuration before we add credential storage. We may proceed to add the encryption/decryption utility and extend User.js with the GitHub settings field. Then build the GitHub API service and its endpoints.

While on that, when i am at this route `http://localhost:3000/admin` attempting to login with the correct admin email and password, after clicking the signin button the unauthorized access component is rendered while the console has this message "apiClient.js:8 GET http://localhost:5000/api/v1/auth/me 401 (Unauthorized)".
