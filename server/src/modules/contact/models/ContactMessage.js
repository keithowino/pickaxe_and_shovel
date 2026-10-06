import mongoose from "mongoose";
import {
	CONTACT_MSG_STATUS_TYPES,
	CONTACT_MSG_STATUS_VALUES,
} from "../../../shared/index.js";

const contactMessageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},

		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},

		subject: {
			type: String,
			trim: true,
			maxlength: 200,
			default: "",
		},

		message: {
			type: String,
			required: true,
			trim: true,
			maxlength: 5000,
		},

		status: {
			type: String,
			enum: CONTACT_MSG_STATUS_VALUES,
			default: CONTACT_MSG_STATUS_TYPES.NEW,
			index: true,
		},
	},
	{
		timestamps: true,
		collection: "contactMessages",
	},
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
