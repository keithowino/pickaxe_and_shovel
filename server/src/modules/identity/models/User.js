import mongoose from "mongoose";
import { ROLES } from "../constants/index.js";

/**
 * We added a github subdocument to the existing user schema. Keeping GitHub settings associated with the admin's user record rather than creating a separate collection.
 */
const githubSettingsSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
		},

		encryptedToken: {
			type: String,
			select: false,
		},
	},
	{
		_id: false,
	},
);

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		passwordHash: {
			type: String,
			required: true,
			select: false,
		},

		roles: {
			type: [
				{
					type: String,
					enum: Object.values(ROLES),
				},
			],
			default: [],
		},

		status: {
			type: String,
			enum: ["active", "disabled"],
			default: "active",
		},

		/**
		 * Optional subdocument, created when GitHub settings are saved
		 */
		github: {
			type: githubSettingsSchema,
			default: undefined,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", userSchema);

export default User;
