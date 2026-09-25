const logout = asyncHandler(async (req, res) => {
	const refreshToken = req.cookies?.refreshToken;

	if (refreshToken) {
		await authService.logout(refreshToken);
	}

	clearAuthCookies(res);

	return success(res, null, "Logged out successfully.");
});
