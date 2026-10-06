import { env } from "../../../app/index.js";
import { emailService } from "../../../shared/index.js";

/**
 * Send the notification email for a submitted contact message.
 *
 * @param {Object} contactMessage
 * @returns {Promise<Object>}
 */
class ContactNotification {
	/**
	 * Escape user-provided content before placing it into HTML.
	 *
	 * @param {string} value
	 * @returns {string}
	 */
	escapeHtml(value) {
		return String(value)
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}

	async send(contactMessage) {
		const { name, email, subject, message } = contactMessage;

		return emailService.send({
			from: env.email.resendFromEmail,
			to: env.email.contactNotificationEmail,
			replyTo: email,
			subject: subject || "New Contact Message",
			html: `
                <div style="font-family: sans-serif; line-height: 1.6;">
                    <h2>New Contact Message</h2>

                    <p>
                        <strong>From:</strong>
                        ${this.escapeHtml(name)}
                        (${this.escapeHtml(email)})
                    </p>

                    <p>
                        <strong>Subject:</strong>
                        ${this.escapeHtml(subject || "N/A")}
                    </p>

                    <hr />

                    <p>
                        ${this.escapeHtml(message)}
                    </p>
                </div>
            `,
		});
	}
}

export default new ContactNotification();
