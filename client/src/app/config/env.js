const env = Object.freeze({
	supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
	supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,

	firebaseAPIKey: import.meta.env.VITE_FIREBASE_API_KEY,
	firebaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	firebaseProjectID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	firebaseStorageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	firebaseMsgSenderID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	firebaseAppID: import.meta.env.VITE_FIREBASE_APP_ID,
});

export default env;
