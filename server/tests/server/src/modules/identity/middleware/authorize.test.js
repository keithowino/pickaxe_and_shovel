import test from "node:test";
import assert from "node:assert/strict";

import { requireRole, ROLES } from "../../../../../../src/index.js";

test("Authorization Middleware", async (t) => {
	await t.test("allows a user with the required role", async () => {
		const req = {
			user: {
				roles: [ROLES.ADMIN],
			},
		};

		const res = {};

		let nextCalled = false;

		const next = () => {
			nextCalled = true;
		};

		const middleware = requireRole(ROLES.ADMIN);

		middleware(req, res, next);

		assert.equal(nextCalled, true);
	});

	await t.test(
		"allows a user with one of several permitted roles",
		async () => {
			const req = {
				user: {
					roles: [ROLES.USER],
				},
			};

			const res = {};

			let nextCalled = false;

			const next = () => {
				nextCalled = true;
			};

			const middleware = requireRole(ROLES.ADMIN, ROLES.USER);

			middleware(req, res, next);

			assert.equal(nextCalled, true);
		},
	);

	await t.test("returns 401 when no authenticated user exists", async () => {
		const req = {};
		const res = {};

		let capturedError;

		const next = (error) => {
			capturedError = error;
		};

		const middleware = requireRole(ROLES.ADMIN);

		middleware(req, res, next);

		assert.ok(capturedError);
		assert.equal(capturedError.statusCode, 401);
		assert.equal(capturedError.code, "UNAUTHORIZED");
	});

	await t.test(
		"returns 403 when the user lacks the required role",
		async () => {
			const req = {
				user: {
					roles: [ROLES.USER],
				},
			};

			const res = {};

			let capturedError;

			const next = (error) => {
				capturedError = error;
			};

			const middleware = requireRole(ROLES.ADMIN);

			middleware(req, res, next);

			assert.ok(capturedError);
			assert.equal(capturedError.statusCode, 403);
			assert.equal(capturedError.code, "FORBIDDEN");
		},
	);
});
