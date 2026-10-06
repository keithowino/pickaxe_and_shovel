import { Heading, Text } from "../../../ui/index.js";
import { escapeHtml } from "../../../utils/index.js";

const ContactMessage = (properties) => {
	const { name, email, subject, message } = properties;

	return (
		<>
			<Heading>New Contact Message</Heading>

			<Text className="font-extrabold">From:</Text>
			<Text>
				{escapeHtml(name)} <br /> {escapeHtml(email)}
			</Text>

			<Text className="font-extrabold">Subject:</Text>
			<Text>{escapeHtml(subject) || "N/A"}</Text>

			<hr />

			<Text>{escapeHtml(message)}</Text>
		</>
	);
};

export default ContactMessage;
