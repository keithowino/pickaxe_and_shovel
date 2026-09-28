import { database } from "../app/index.js";
import { PasswordService, User } from "../modules/index.js";

async function seedUsers() {
	try {
		await database.connectDatabase();

		const adminPasswordHash = await PasswordService.hash("keith@1234");
		const userPasswordHash = await PasswordService.hash("rembo@1234");

		const admin = await User.create({
			email: "designsolutions1629@gmail.com",
			passwordHash: adminPasswordHash,
			roles: ["admin"],
			status: "active",
		});

		const user = await User.create({
			email: "rembo1234@gmail.com",
			passwordHash: userPasswordHash,
			roles: ["user"],
			status: "active",
		});

		console.log(`admin ${admin.email} & user ${user.email} Seeded.`);

		await database.disconnectDatabase();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

seedUsers();
