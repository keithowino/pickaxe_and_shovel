import mongoose from "mongoose";
import { ROLES } from "../constants/index.js";

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
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", userSchema);

export default User;
