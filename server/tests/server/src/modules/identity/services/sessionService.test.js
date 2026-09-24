import test from "node:test";
import assert from "node:assert/strict";

import mongoose from "mongoose";

import {
	database,
	Session,
	sessionService,
	User,
} from "../../../../../../src/index.js";

let testUser;

test("Session Service", async (t) => {
	t.before(async () => {
		await database.connectDatabase();

		/**
		 * The test deliberately uses:
		 * passwordHash: "test-password-hash",
		 */

		testUser = await User.create({
			email: `session-test-${Date.now()}@example.com`,
			passwordHash: "test-password-hash",
			roles: [],
			status: "active",
		});
	});

	t.after(async () => {
		await Session.deleteMany({
			userId: testUser._id,
		});

		await User.deleteOne({
			_id: testUser._id,
		});

		await database.disconnectDatabase();
	});

	await t.test("createSession creates a session in MongoDB", async () => {
		const session = await sessionService.createSession(testUser._id);

		assert.ok(session);
		assert.ok(session.sessionId);
		assert.equal(session.userId.toString(), testUser._id.toString());
		assert.ok(session.expiresAt instanceof Date);

		const storedSession = await Session.findOne({
			sessionId: session.sessionId,
		});

		assert.ok(storedSession);
		assert.equal(storedSession.userId.toString(), testUser._id.toString());
	});

	await t.test("getSession returns a valid session", async () => {
		const createdSession = await sessionService.createSession(testUser._id);

		const session = await sessionService.getSession(
			createdSession.sessionId,
		);

		assert.ok(session);
		assert.equal(session.sessionId, createdSession.sessionId);
		assert.equal(session.userId.toString(), testUser._id.toString());
	});

	await t.test("deleteSession removes the session from MongoDB", async () => {
		const createdSession = await sessionService.createSession(testUser._id);

		await sessionService.deleteSession(createdSession.sessionId);

		const session = await Session.findOne({
			sessionId: createdSession.sessionId,
		});

		assert.equal(session, null);
	});

	await t.test("getSession returns null for an expired session", async () => {
		const expiredSession = await Session.create({
			sessionId: new mongoose.Types.ObjectId().toString(),
			userId: testUser._id,
			expiresAt: new Date(Date.now() - 1000),
		});

		const session = await sessionService.getSession(
			expiredSession.sessionId,
		);

		assert.equal(session, null);

		const storedSession = await Session.findOne({
			sessionId: expiredSession.sessionId,
		});

		assert.equal(storedSession, null);
	});
});
