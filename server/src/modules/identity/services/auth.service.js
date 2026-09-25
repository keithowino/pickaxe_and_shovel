import { userRepository } from "../repositories/index.js";

import { PasswordService } from "../security/index.js";

import SessionService from "./session.service.js";

import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

import { userPresenter } from "../presenters/index.js";

class AuthService {
	async login({ data, requestMetadata = {} }) {
		const user = await userRepository.findUserByEmail(data.email, {
			includePasswordHash: true,
		});

		/**
		 * Do not reveal whether the email exists.
		 */
		if (!user) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const passwordMatches = await PasswordService.compare(
			data.password,
			user.passwordHash,
		);

		if (!passwordMatches) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		if (user.status !== "active") {
			throw new AppError(
				"Authentication is not available for this account.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const tokens = await SessionService.create(user, requestMetadata);

		return {
			user: userPresenter.present(user),
			...tokens,
		};
	}

	async refresh(refreshToken, requestMetadata = {}) {
		const result = await SessionService.rotate(
			refreshToken,
			requestMetadata,
		);

		return result;
	}

	async logout(refreshToken) {
		return SessionService.logout(refreshToken);
	}

	async sessions(userId, currentSessionId) {
		return SessionService.list(userId, currentSessionId);
	}

	async revokeSession(userId, sessionId) {
		return SessionService.revoke(userId, sessionId);
	}

	async revokeOtherSessions(userId, currentSessionId) {
		return SessionService.revokeOthers(userId, currentSessionId);
	}
}

export default new AuthService();
