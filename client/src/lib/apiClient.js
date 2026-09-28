import env from "../app/config/env.js";

const API_URL = `${env.apiUrl}/api/v1`;

const request = async (path, options = {}) => {
	const { method = "GET", headers = {}, body, ...rest } = options;

	return fetch(`${API_URL}${path}`, {
		...rest,
		method,
		credentials: "include",
		headers: {
			...(body !== undefined
				? { "Content-Type": "application/json" }
				: {}),
			...headers,
		},
		...(body !== undefined ? { body: JSON.stringify(body) } : {}),
	});
};

const parseResponse = async (response) => {
	if (response.status === 204) return null;

	const contentType = response.headers.get("content-type");

	return contentType?.includes("application/json")
		? response.json()
		: response.text();
};

const createApiError = (response, data) => {
	const error = new Error(
		typeof data === "object" && data !== null
			? data.message || "API request failed."
			: data || "API request failed.",
	);

	error.status = response.status;
	error.data = data;

	return error;
};

const apiRequest = async (path, options = {}) => {
	let response = await request(path, options);

	const isAuthEndpoint = path.startsWith("/auth/");

	if (response.status === 401 && !isAuthEndpoint) {
		const refreshResponse = await request("/auth/refresh", {
			method: "POST",
		});

		if (refreshResponse.ok) {
			response = await request(path, options);
		}
	}

	const data = await parseResponse(response);

	if (!response.ok) {
		throw createApiError(response, data);
	}

	return data;
};

export default apiRequest;
