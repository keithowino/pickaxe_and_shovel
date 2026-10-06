import { getId } from "../../../shared/index.js";

class ContactMessagePresenter {
	present(message) {
		if (!message) {
			return null;
		}

		return {
			// id: getId(message),
			name: message.name,
			email: message.email,
			subject: message.subject,
			message: message.message,
			status: message.status,
			// createdAt: message.createdAt,
			// updatedAt: message.updatedAt,
		};
	}

	presentCollection(messages) {
		return messages.map((msg) => this.present(msg));
	}
}

export default new ContactMessagePresenter();
