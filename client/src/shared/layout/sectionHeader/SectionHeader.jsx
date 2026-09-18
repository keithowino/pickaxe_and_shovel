import { LoadSerialMsg } from "../../components/index.js";
import { Heading } from "../../ui/index.js";

export default function SectionHeader({
	serial,
	title,
	align = "center",
	className = "",
	spacing = "mb-8 sm:mb-12",
	header = 2,
}) {
	const hasIcon = title && typeof title === "object" && title.icon;

	return (
		<div
			className={[
				spacing,
				align === "center" ? "text-center" : "text-left",
				className,
			].join(" ")}
		>
			<LoadSerialMsg serial={serial} />

			<Heading
				level={header}
				className={hasIcon ? "flex items-center gap-3" : ""}
			>
				{hasIcon && title.icon}
				{hasIcon ? title.msg : title}
			</Heading>
		</div>
	);
}
