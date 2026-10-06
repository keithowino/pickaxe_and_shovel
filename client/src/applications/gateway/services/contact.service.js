import { apiRequest } from "../../../lib/index.js";

export const submitMessage = async (messageData) => {
	const response = await apiRequest("/contact", {
		method: "POST",
		body: messageData,
	});

	return response.data;
};
