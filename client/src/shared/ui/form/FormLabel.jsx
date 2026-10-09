import { cva } from "class-variance-authority";
import { cn } from "../../../lib/index.js";

const labelVariants = cva(
	"serial-number text-muted-foreground block mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export default function FormLabel({
	children,
	htmlFor,
	className,
	required = { isRequired: false, className: "" },
	...props
}) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(labelVariants(), className)}
			{...props}
		>
			{children}

			{required.isRequired && (
				<span className={`text-primary ml-1 ${required.className}`}>
					*
				</span>
			)}
		</label>
	);
}
