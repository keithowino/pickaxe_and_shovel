import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};
