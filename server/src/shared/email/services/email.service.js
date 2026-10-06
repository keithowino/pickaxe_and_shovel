import { Resend } from "resend";

import { env } from "../../../app/index.js";
import { AppError, ErrorCodes } from "../../errors/index.js";
import { HTTP_STATUS } from "../../constants/index.js";

const resend = new Resend(env.email.resendApiKey);

/**
 * Send an email through Resend.
 *
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.from
 * @param {string} [options.replyTo]
 * @param {string} options.subject
 * @param {string} options.html
 * @returns {Promise<Object>}
 */
class EmailService {
	async send({ to, from, replyTo, subject, html }) {
		const { data, error } = await resend.emails.send({
			from,
			to: [to],
			...(replyTo && { replyTo }),
			subject,
			html,
		});

		if (error) {
			throw new AppError(
				`Email delivery failed: ${error.message}`,
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		return data;
	}
}

export default new EmailService();
