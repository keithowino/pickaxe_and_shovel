import test from "node:test";
import assert from "node:assert/strict";

import {
	hashPassword,
	verifyPassword,
} from "../../../../../../src/modules/identity/services/index.js";

test("Credential Service", async (t) => {
	await t.test("hashPassword returns a bcrypt hash", async () => {
		const password = "TestPassword123!";

		const passwordHash = await hashPassword(password);

		assert.notEqual(passwordHash, password);
		assert.match(passwordHash, /^\$2[aby]\$/);
	});

	await t.test(
		"verifyPassword returns true for the correct password",
		async () => {
			const password = "TestPassword123!";
			const passwordHash = await hashPassword(password);

			const isValid = await verifyPassword(password, passwordHash);

			assert.equal(isValid, true);
		},
	);

	await t.test(
		"verifyPassword returns false for an incorrect password",
		async () => {
			const passwordHash = await hashPassword("TestPassword123!");

			const isValid = await verifyPassword(
				"WrongPassword123!",
				passwordHash,
			);

			assert.equal(isValid, false);
		},
	);
});
