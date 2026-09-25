import { database } from "../app/index.js";
import { PasswordService, User } from "../modules/index.js";

async function seedAdmin() {
	try {
		await database.connectDatabase();

		const passwordHash = await PasswordService.hash("TestPassword123!");

		const admin = await User.create({
			email: "admin-test@example.com",
			passwordHash,
			roles: ["admin"],
			status: "active",
		});

		console.log(`Seeded ${admin.email}.`);

		await database.disconnectDatabase();

		console.log("Done.");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

seedAdmin();
