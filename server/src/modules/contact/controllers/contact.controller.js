import {
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";

import { contactService } from "../services/index.js";

import { createContactMessageSchema } from "../validators/index.js";

/**
 * Submit a public contact message.
 */
const createContactMessage = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createContactMessageSchema,
		},
		req,
	);

	const message = await contactService.submitContactMessage(body);

	return success(
		res,
		null,
		"Contact message submitted successfully.",
		HTTP_STATUS.CREATED,
	);
});

export default {
	createContactMessage,
};
