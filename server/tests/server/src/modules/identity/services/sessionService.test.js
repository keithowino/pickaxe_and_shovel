import test from "node:test";
import assert from "node:assert/strict";

import mongoose from "mongoose";

import {
	database,
	Session,
	User,
	PasswordService,
	AccessTokenService,
	hashToken,
	sessionService,
} from "../../../../../../src/index.js";

let testUser;

test("Session Service", async (t) => {
	t.before(async () => {
		await database.connectDatabase();

		testUser = await User.create({
			email: `session-test-${Date.now()}@example.com`,
			passwordHash: await PasswordService.hash("TestPassword123!"),
			roles: [],
			status: "active",
		});
	});

	t.after(async () => {
		await Session.deleteMany({
			user: testUser._id,
		});

		await User.deleteOne({
			_id: testUser._id,
		});

		await database.disconnectDatabase();
	});

	await t.test(
		"create creates an active session and returns access/refresh tokens",
		async () => {
			const result = await sessionService.create(testUser, {
				ipAddress: "127.0.0.1",
				userAgent: "node:test",
			});

			assert.ok(result);
			assert.ok(result.accessToken);
			assert.ok(result.refreshToken);

			assert.equal(typeof result.accessToken, "string");

			assert.equal(typeof result.refreshToken, "string");

			// const storedSession = await Session.findOne({
			// 	user: testUser._id,
			// });

			const storedSession = await Session.findOne({
				refreshTokenHash: hashToken(result.refreshToken),
			});

			assert.ok(storedSession);

			assert.equal(
				storedSession.user.toString(),
				testUser._id.toString(),
			);

			assert.ok(storedSession.refreshTokenHash);

			assert.notEqual(
				storedSession.refreshTokenHash,
				result.refreshToken,
			);

			assert.equal(storedSession.isRevoked, false);

			assert.ok(storedSession.expiresAt instanceof Date);
		},
	);

	await t.test(
		"validateAccessSession returns an active session",
		async () => {
			const result = await sessionService.create(testUser);

			const payload = AccessTokenService.verify(result.accessToken);

			const session = await sessionService.validateAccessSession(
				payload.sid,
				payload.sub,
			);

			assert.ok(session);

			assert.equal(session.user.toString(), testUser._id.toString());

			assert.equal(session.isRevoked, false);
		},
	);

	await t.test(
		"rotate revokes the old session and creates a new session",
		async () => {
			const first = await sessionService.create(testUser);

			const oldSession = await Session.findOne({
				refreshTokenHash: hashToken(first.refreshToken),
			});

			assert.ok(oldSession);

			const second = await sessionService.rotate(first.refreshToken);

			assert.ok(second.accessToken);
			assert.ok(second.refreshToken);

			assert.notEqual(second.refreshToken, first.refreshToken);

			const revokedSession = await Session.findById(oldSession._id);

			assert.ok(revokedSession);

			assert.equal(revokedSession.isRevoked, true);

			assert.ok(revokedSession.revokedAt instanceof Date);

			const newSession = await Session.findOne({
				refreshTokenHash: hashToken(second.refreshToken),
			});

			assert.ok(newSession);

			assert.equal(newSession.isRevoked, false);
		},
	);

	await t.test("logout revokes the session", async () => {
		const result = await sessionService.create(testUser);

		const session = await Session.findOne({
			refreshTokenHash: hashToken(result.refreshToken),
		});

		assert.ok(session);

		await sessionService.logout(result.refreshToken);

		const revokedSession = await Session.findById(session._id);

		assert.ok(revokedSession);

		assert.equal(revokedSession.isRevoked, true);

		assert.ok(revokedSession.revokedAt instanceof Date);
	});

	await t.test(
		"validateAccessSession rejects a revoked session",
		async () => {
			const result = await sessionService.create(testUser);

			const payload = AccessTokenService.verify(result.accessToken);

			await sessionService.logout(result.refreshToken);

			await assert.rejects(
				() =>
					sessionService.validateAccessSession(
						payload.sid,
						payload.sub,
					),
				{
					name: "AppError",
					statusCode: 401,
				},
			);
		},
	);

	await t.test(
		"validateAccessSession rejects an expired session",
		async () => {
			const expiredSession = await Session.create({
				user: testUser._id,
				refreshTokenHash: new mongoose.Types.ObjectId().toString(),
				expiresAt: new Date(Date.now() - 1000),
				isRevoked: false,
			});

			await assert.rejects(
				() =>
					sessionService.validateAccessSession(
						expiredSession._id,
						testUser._id,
					),
				{
					name: "AppError",
					statusCode: 401,
				},
			);
		},
	);
});
