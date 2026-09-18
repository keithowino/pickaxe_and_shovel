import { Loader2 } from "lucide-react";

/**
 * type can or would be set to either
 * - inline: as inline element loader
 * - component: as component loader
 * - or page: as page loader
 */
export const Loader = ({ className, msg, type }) => {
	let loadTypeStyles;
	let loaderClassName;

	switch (type) {
		case "inline":
			loadTypeStyles = "";
			loaderClassName = "!h-4 !w-4";
			break;

		case "page":
			loadTypeStyles = "min-h-[100svh]";
			break;

		default:
			loadTypeStyles = "gap-2 text-muted-foreground py-10";
			break;
	}

	return (
		<div
			className={[
				loadTypeStyles,
				"flex items-center justify-center",
				msg && "gap-2",
				className,
			].join(" ")}
		>
			<Loader2
				className={[
					"h-8 w-8 animate-spin text-primary",
					loaderClassName,
				].join(" ")}
			/>{" "}
			{msg && <span className="animate-pulse">{msg}</span>}
		</div>
	);
};
