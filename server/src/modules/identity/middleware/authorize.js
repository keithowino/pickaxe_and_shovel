import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

export function requireRole(...allowedRoles) {
	return function authorize(req, res, next) {
		if (!req.user) {
			return next(
				new AppError(
					"Authentication required.",
					HTTP_STATUS.UNAUTHORIZED,
					ErrorCodes.UNAUTHORIZED,
				),
			);
		}

		const hasRequiredRole = allowedRoles.some((role) =>
			req.user.roles.includes(role),
		);

		if (!hasRequiredRole) {
			return next(
				new AppError(
					"You do not have permission to perform this action.",
					HTTP_STATUS.FORBIDDEN,
					ErrorCodes.FORBIDDEN,
				),
			);
		}

		next();
	};
}
