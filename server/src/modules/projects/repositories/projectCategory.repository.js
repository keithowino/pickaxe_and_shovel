import { ProjectCategory } from "../models/index.js";

export const create = async (data) => {
	return ProjectCategory.create(data);
};

export const findAll = async ({ active } = {}) => {
	const filter = {};

	if (typeof active === "boolean") {
		filter.active = active;
	}

	return ProjectCategory.find(filter)
		.sort({ displayOrder: 1, name: 1 })
		.exec();
};

export const findById = async (id) => {
	return ProjectCategory.findById(id).exec();
};

export const existsByName = async (name) => {
	return ProjectCategory.exists({
		name,
	});
};

export const findBySlug = async (slug) => {
	return ProjectCategory.findOne({ slug }).exec();
};

export const updateById = async (id, data) => {
	return ProjectCategory.findByIdAndUpdate(
		id,
		{ $set: data },
		{
			returnDocument: "after",
			runValidators: true,
		},
	).exec();
};

export const deleteById = async (id) => {
	return ProjectCategory.findByIdAndDelete(id).exec();
};
