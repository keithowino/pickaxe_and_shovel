import { User } from "../models/index.js";

async function create(userData) {
	return User.create(userData);
}

async function findUserByEmail(email, { includePasswordHash = false } = {}) {
	if (!email) {
		return null;
	}

	const query = User.findOne({
		email: email.toLowerCase().trim(),
	});

	if (includePasswordHash) {
		query.select("+passwordHash");
	}

	return query;
}

async function findUserById(userId) {
	return User.findById(userId);
}

async function save(user) {
	return user.save();
}

export default {
	create,
	findUserByEmail,
	findUserById,
	save,
};
