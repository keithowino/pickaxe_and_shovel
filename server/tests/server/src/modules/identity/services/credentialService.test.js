import test from "node:test";
import assert from "node:assert/strict";

import { PasswordService } from "../../../../../../src/index.js";

test("Password Service", async (t) => {
	await t.test("hash returns a bcrypt hash", async () => {
		const password = "TestPassword123!";

		const passwordHash = await PasswordService.hash(password);

		assert.notEqual(passwordHash, password);
		assert.match(passwordHash, /^\$2[aby]\$/);
	});

	await t.test("compare returns true for the correct password", async () => {
		const password = "TestPassword123!";

		const passwordHash = await PasswordService.hash(password);

		const isValid = await PasswordService.compare(password, passwordHash);

		assert.equal(isValid, true);
	});

	await t.test(
		"compare returns false for an incorrect password",
		async () => {
			const passwordHash = await PasswordService.hash("TestPassword123!");

			const isValid = await PasswordService.compare(
				"WrongPassword123!",
				passwordHash,
			);

			assert.equal(isValid, false);
		},
	);
});
