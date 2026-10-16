import mongoose from "mongoose";
import {
	BLOG_STATUS_TYPE,
	BLOG_STATUS_VALUES,
	BLOG_TYPE,
	BLOG_TYPE_VALUES,
} from "../../../shared/index.js";

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		},

		excerpt: {
			type: String,
			required: true,
		},

		content: {
			type: String,
			required: true,
		},

		coverImageUrl: {
			type: String,
			required: true,
		},

		// category: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "ProjectCategory",
		// 	required: true,
		// 	index: true,
		// },

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BlogCategory",
			required: true,
			index: true,
		},

		tags: { type: [String], default: [] },

		type: {
			type: String,
			enum: BLOG_TYPE_VALUES,
			default: BLOG_TYPE.ARTICLE,
		},

		status: {
			type: String,
			enum: BLOG_STATUS_VALUES,
			default: BLOG_STATUS_TYPE.DRAFT,
		},

		publishedAt: {
			type: Date,
			default: null,
			index: true,
		},
		readingTimeMinutes: {
			type: Number,
		},
	},
	{
		timestamps: true,
	},
);

const Post = mongoose.model("Post", postSchema);

export default Post;
