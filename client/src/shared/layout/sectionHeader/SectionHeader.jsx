import { LoadSerialMsg } from "../../components/index.js";
import { Heading } from "../../ui/index.js";

export default function SectionHeader({
	serial,
	title,
	align = "center",
	className = "",
	header = 2,
}) {
	return (
		<div
			className={`mb-12 ${
				align === "center" ? "text-center" : "text-left"
			} ${className}`}
		>
			<LoadSerialMsg serial={serial} />

			<Heading level={header}>{title}</Heading>
		</div>
	);
}
