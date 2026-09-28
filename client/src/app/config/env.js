// const env = Object.freeze({
// 	supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
// 	supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,

// 	firebaseAPIKey: import.meta.env.VITE_FIREBASE_API_KEY,
// 	firebaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// 	firebaseProjectID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// 	firebaseStorageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// 	firebaseMsgSenderID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// 	firebaseAppID: import.meta.env.VITE_FIREBASE_APP_ID,
// });

import { z } from "zod";

const envSchema = z.object({
	MODE: z.enum(["development", "production", "test"]).default("development"),

	VITE_API_URL: z.url("VITE_API_URL must be a valid URL."),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
	console.error("Invalid client environment configuration:");

	for (const issue of parsedEnv.error.issues) {
		console.error(`- ${issue.path.join(".")}: ${issue.message}`);
	}

	throw new Error("Invalid client environment configuration.");
}

const env = Object.freeze({
	mode: parsedEnv.data.MODE,
	apiUrl: parsedEnv.data.VITE_API_URL.replace(/\/+$/, ""),
});

export default env;
