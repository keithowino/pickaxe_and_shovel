import clsx from "clsx";
import { buttonVariants, buttonSizes, buttonLayouts } from "./button.styles.js";

export default function Button({
	as: Component = "button",
	variant = "primary",
	size = "md",
	fullWidthMobile = false,
	className = "",
	children,
	...props
}) {
	return (
		<Component
			className={clsx(
				"inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-[0.98]",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				"disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
				buttonVariants[variant],
				buttonSizes[size],
				fullWidthMobile && buttonLayouts.responsive,
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
