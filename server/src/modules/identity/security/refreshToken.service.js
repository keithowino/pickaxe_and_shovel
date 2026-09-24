import crypto from "node:crypto";
import jwt from "jsonwebtoken";

import { env } from "../../../app/index.js";

import {
	AppError,
	ErrorCodes,
	getId,
	HTTP_STATUS,
} from "../../../shared/index.js";

class RefreshTokenService {
	generate(user) {
		return jwt.sign(
			{
				sub: getId(user),
				jti: crypto.randomUUID(),
			},
			env.jwt.refreshSecret,
			{
				expiresIn: env.jwt.refreshExpires,
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			},
		);
	}

	verify(token) {
		try {
			return jwt.verify(token, env.jwt.refreshSecret, {
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			});
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new AppError(
					"Refresh token has expired.",
					HTTP_STATUS.UNAUTHORIZED,
					ErrorCodes.UNAUTHORIZED,
				);
			}

			throw new AppError(
				"Invalid refresh token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}
	}
}

export default new RefreshTokenService();
