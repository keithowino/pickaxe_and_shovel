import {
	AppError,
	ErrorCodes,
	getId,
	HTTP_STATUS,
} from "../../../shared/index.js";

import { AccessTokenService } from "../security/index.js";

import { userRepository } from "../repositories/index.js";

import { sessionService } from "../services/index.js";

import { AUTH_COOKIE_NAMES } from "../constants/index.js";

export default async function authenticate(req, res, next) {
	try {
		const accessToken = req.cookies?.[AUTH_COOKIE_NAMES.ACCESS_TOKEN];

		if (!accessToken) {
			throw new AppError(
				"Authentication required.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const payload = AccessTokenService.verify(accessToken);

		const session = await sessionService.validateAccessSession(
			payload.sid,
			payload.sub,
		);

		const user = await userRepository.findUserById(payload.sub);

		if (!user || user.status !== "active") {
			throw new AppError(
				"Authentication required.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		req.user = user;
		req.sessionId = getId(session);

		next();
	} catch (error) {
		next(error);
	}
}
