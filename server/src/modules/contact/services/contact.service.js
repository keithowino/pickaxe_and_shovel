import { contactMessagePresenter } from "../presenters/index.js";
import { contactMessageRepository } from "../repositories/index.js";
import contactNotificationService from "./contact.notification.service.js";

class ContactService {
	/**
	 * Submit a new contact message.
	 *
	 * @param {Object} data
	 * @returns {Promise<Object>}
	 */
	async submitContactMessage(data) {
		const message =
			await contactMessageRepository.createContactMessage(data);

		let vetMessage = contactMessagePresenter.present(message);

		try {
			await contactNotificationService.send(vetMessage);
		} catch (error) {
			console.error("⚠️ Contact message notification failed:", error);
		}

		return vetMessage;
	}
}

export default new ContactService();
