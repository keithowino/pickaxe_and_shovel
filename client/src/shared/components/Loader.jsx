import { Loader2 } from "lucide-react";
import { PageSection } from "../layout/index.js";

const LoaderChild = ({ className, loaderClassName, loadTypeStyles, msg }) => {
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
			{msg && <span>{msg}</span>}
		</div>
	);
};

/**
 * type can or would be set to either
 * - inline: as inline element loader
 * - component: as component loader
 * - or page: as page loader
 */
export const Loader = ({ className, msg, type }) => {
	let loadTypeStyles;
	let loaderClassName;
	let blockType = false;

	switch (type) {
		case "inline":
			loadTypeStyles = "";
			loaderClassName = "!h-4 !w-4";
			break;

		case "page":
			loadTypeStyles =
				"border border-border animate-pulse bg-muted min-h-[100svh]";
			blockType = true;
			break;

		default:
			loadTypeStyles =
				"border border-border h-72 animate-pulse bg-muted gap-2 py-10";
			blockType = true;
			break;
	}

	return (
		<>
			{blockType ? (
				<PageSection>
					<LoaderChild
						className={className}
						loaderClassName={loaderClassName}
						loadTypeStyles={loadTypeStyles}
						msg={msg}
					/>
				</PageSection>
			) : (
				<LoaderChild
					className={className}
					loaderClassName={loaderClassName}
					loadTypeStyles={loadTypeStyles}
					msg={msg}
				/>
			)}
		</>
	);
};
