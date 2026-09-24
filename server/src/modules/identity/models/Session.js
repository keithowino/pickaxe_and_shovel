import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		refreshTokenHash: {
			type: String,
			required: true,
			unique: true,
		},

		expiresAt: {
			type: Date,
			required: true,
		},

		isRevoked: {
			type: Boolean,
			default: false,
			index: true,
		},

		revokedAt: {
			type: Date,
			default: null,
		},

		lastActivityAt: {
			type: Date,
			default: Date.now,
		},

		ipAddress: {
			type: String,
			default: null,
		},

		userAgent: {
			type: String,
			default: null,
		},

		deviceName: {
			type: String,
			default: null,
		},

		browser: {
			type: String,
			default: null,
		},

		operatingSystem: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * #### MongoDB TTL
 *
 * Remove expired sessions automatically.
 * The TTL index is cleanup, not the authentication mechanism.
 * Authentication middleware must still check expiresAt explicitly.
 * That distinction is important.
 */
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
