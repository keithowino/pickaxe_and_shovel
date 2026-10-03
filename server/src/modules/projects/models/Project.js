import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		githubRepoId: {
			type: Number,
			unique: true,
			sparse: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: {
			type: String,
			default: "",
			trim: true,
		},

		githubUrl: {
			type: String,
			default: "",
			trim: true,
		},

		liveUrl: {
			type: String,
			default: "",
			trim: true,
		},

		thumbnailUrl: {
			type: String,
			default: "",
			trim: true,
		},

		primaryLanguage: {
			type: String,
			default: "",
			trim: true,
		},

		techStack: {
			type: [String],
			default: [],
		},

		topics: {
			type: [String],
			default: [],
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProjectCategory",
			required: true,
			index: true,
		},

		stars: {
			type: Number,
			default: 0,
			min: 0,
		},

		forks: {
			type: Number,
			default: 0,
			min: 0,
		},

		pinned: {
			type: Boolean,
			default: false,
		},

		displayOrder: {
			type: Number,
			default: 0,
		},

		featured: {
			type: Boolean,
			default: false,
		},

		published: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
