import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../shared/index.js";

import { authService } from "../services/index.js";

import { setAuthCookies, clearAuthCookies } from "../security/index.js";

import { loginRequestSchema } from "../validators/index.js";
import { userPresenter } from "../presenters/index.js";

const login = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: loginRequestSchema,
		},
		req,
	);

	const result = await authService.login({
		data: body,
		requestMetadata: req.requestMetadata,
	});

	setAuthCookies(res, {
		accessToken: result.accessToken,
		refreshToken: result.refreshToken,
	});

	return success(
		res,
		{
			user: result.user,
		},
		"Login successful.",
	);
});

const refresh = asyncHandler(async (req, res) => {
	// const { body } = validateRequest(
	// 	{
	// 		body: refreshRequestSchema,
	// 	},
	// 	req,
	// );

	// const result = await authService.refresh(
	// 	body.refreshToken,
	// 	req.requestMetadata,
	// );

	const refreshToken = req.cookies.refreshToken;

	const result = await authService.refresh(refreshToken, req.requestMetadata);

	setAuthCookies(res, {
		accessToken: result.accessToken,
		refreshToken: result.refreshToken,
	});

	return success(res, null, "Token refreshed.");
});

const logout = asyncHandler(async (req, res) => {
	// const { body } = validateRequest(
	// 	{
	// 		body: refreshRequestSchema,
	// 	},
	// 	req,
	// );

	// await authService.logout(body.refreshToken);

	const refreshToken = req.cookies.refreshToken;

	if (refreshToken) {
		await authService.logout(refreshToken);
	}

	clearAuthCookies(res);

	return success(res, null, "Logged out successfully.");
});

const me = asyncHandler(async (req, res) => {
	return success(res, {
		user: userPresenter.present(req.user),
	});
});

export default {
	login,
	refresh,
	logout,
	me,
};
