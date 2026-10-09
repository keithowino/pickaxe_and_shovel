import { cn } from "../../../lib/index.js";
import { TextInput } from "../input/index.js";

export default function FormInput({
	as,
	rows,
	className = "",
	type,
	...props
}) {
	if (as === "textarea") {
		return (
			<textarea
				rows={rows ?? 5}
				className={cn(
					"flex min-h-[60px] w-full bg-background rounded-md border border-input px-3 py-2 placeholder:text-muted-foreground ",
					"focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
					"resize-none transition-colors",
					"disabled:opacity-50 disabled:cursor-not-allowed md:text-sm",
					className,
				)}
				{...props}
			/>
		);
	}

	return <TextInput className={className} type={type} {...props} />;
}
