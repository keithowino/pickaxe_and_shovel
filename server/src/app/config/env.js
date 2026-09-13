import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	mongoUri: process.env.MONGODB_URI,
	clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
