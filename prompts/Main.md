This is the client's `env.js` file, check to evaluate whether i configured it correctly or as recommended:

```js
`~\client\src\app\config\env.js`;

import dotenv from "dotenv";
import { z } from "zod";

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

// dotenv.config({
// 	path: `.env.${process.env.NODE_ENV || "development"}`,
// });

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),

	VITE_API_URL: z.string().min(1, "API_URL is required."),
});

// const parsedEnv = envSchema.safeParse(process.env);
const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid server environment configuration:");

	for (const issue of parsedEnv.error.issues) {
		console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
	}

	process.exit(1);
}

const env = {
	nodeEnv: parsedEnv.data.NODE_ENV,
	apiUrl: parsedEnv.data.VITE_API_URL,
};

export default env;
```

I would like for you to evaluate it because i am not confident with it's current state and the console has this message "Module "url" has been externalized for browser compatibility. Cannot access "url.URL" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details."

Despite `env.js` configuration, on testing:

```jsx
`~\client\src\App.jsx`;

import { AppProviders, AppRouter } from "./app/index.js";
import { apiRequest } from "./lib/apiClient.js";

const test = async () => {
	const result = await apiRequest("/health");

	console.log(result);
};

export default function App() {
	test();

	return (
		<AppProviders>
			<AppRouter />
		</AppProviders>
	);
}
```

This was logged in the console:

```text
{success: true, message: 'API is healthy.', data: {…}}
```

While we are doing this verifications, we may proceed with Step 2: migrating AuthContext.jsx to the backend's login, session restoration, refresh, and logout endpoints.
