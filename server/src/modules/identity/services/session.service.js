import ms from "ms";

import { env } from "../../../app/index.js";

import {
	AppError,
	ErrorCodes,
	getId,
	HTTP_STATUS,
} from "../../../shared/index.js";

import { sessionRepository, userRepository } from "../repositories/index.js";

import {
	AccessTokenService,
	RefreshTokenService,
	hashToken,
} from "../security/index.js";

class SessionService {
	async create(user, metadata = {}) {
		const refreshToken = RefreshTokenService.generate(user);

		const expiresAt = new Date(Date.now() + ms(env.jwt.refreshExpires));

		const session = await sessionRepository.create({
			user: user._id,
			refreshTokenHash: hashToken(refreshToken),
			expiresAt,

			ipAddress: metadata.ipAddress ?? null,
			userAgent: metadata.userAgent ?? null,
			deviceName: metadata.deviceName ?? null,
			browser: metadata.browser ?? null,
			operatingSystem: metadata.operatingSystem ?? null,
		});

		const accessToken = AccessTokenService.generate(user, session._id);

		return {
			accessToken,
			refreshToken,
		};
	}

	async rotate(refreshToken, metadata = {}) {
		RefreshTokenService.verify(refreshToken);

		const refreshTokenHash = hashToken(refreshToken);

		const session =
			await sessionRepository.findByRefreshTokenHash(refreshTokenHash);

		if (!session) {
			throw new AppError(
				"Invalid refresh token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const user = await userRepository.findUserById(session.user);

		if (!user || user.status !== "active") {
			throw new AppError(
				"Invalid refresh token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		await sessionRepository.revoke(session);

		return this.create(user, metadata);
	}

	async logout(refreshToken) {
		RefreshTokenService.verify(refreshToken);

		const refreshTokenHash = hashToken(refreshToken);

		const session =
			await sessionRepository.findByRefreshTokenHash(refreshTokenHash);

		if (!session) {
			return;
		}

		await sessionRepository.revoke(session);
	}

	async list(userId, currentSessionId) {
		const sessions = await sessionRepository.findActiveByUser(userId);

		return {
			sessions: sessions.map((session) => ({
				id: getId(session),
				ipAddress: session.ipAddress,
				userAgent: session.userAgent,
				deviceName: session.deviceName,
				browser: session.browser,
				operatingSystem: session.operatingSystem,
				lastActivityAt: session.lastActivityAt,
				expiresAt: session.expiresAt,
				current: getId(session) === String(currentSessionId),
				createdAt: session.createdAt,
			})),
		};
	}

	async revoke(userId, sessionId) {
		const session = await sessionRepository.findActiveByIdAndUser(
			sessionId,
			userId,
		);

		if (!session) {
			throw new AppError(
				"Session not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		await sessionRepository.revoke(session);
	}

	async revokeOthers(userId, currentSessionId) {
		await sessionRepository.revokeAllExcept(userId, currentSessionId);
	}

	async validateAccessSession(sessionId, userId) {
		const session = await sessionRepository.touchActiveByIdAndUser(
			sessionId,
			userId,
		);

		if (!session) {
			throw new AppError(
				"Authentication session is invalid or expired.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		return session;
	}
}

export default new SessionService();
