import { cn } from "../../../lib/index.js";

export default function TextInput({ className = "", type, ...props }) {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full bg-background rounded-md border border-input px-3 py-1 placeholder:text-muted-foreground ",
				"focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  transition-colors",
				"disabled:opacity-50 disabled:cursor-not-allowed md:text-sm",
				className,
			)}
			{...props}
		/>
	);
}
