import mongoose from "mongoose";

const projectCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			index: true,
			maxlength: 120,
		},

		description: {
			type: String,
			trim: true,
			maxlength: 500,
			default: "",
		},

		displayOrder: {
			type: Number,
			default: 0,
			min: 0,
			validate: {
				validator: Number.isInteger,
				message: "Display order must be an integer.",
			},
		},

		active: {
			type: Boolean,
			default: true,
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

projectCategorySchema.index({
	active: 1,
	displayOrder: 1,
});

const ProjectCategory = mongoose.model(
	"ProjectCategory",
	projectCategorySchema,
);

export default ProjectCategory;
