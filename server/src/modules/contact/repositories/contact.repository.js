import { ContactMessage } from "../models/index.js";

/**
 * Create a contact message.
 *
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const createContactMessage = async (data) => {
	return ContactMessage.create(data);
};

export default {
	createContactMessage,
};
