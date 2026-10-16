import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
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

blogCategorySchema.index({
	active: 1,
	displayOrder: 1,
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
