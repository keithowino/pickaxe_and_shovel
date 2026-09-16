export default function TextInput({ className = "", ...props }) {
	return (
		<input
			className={[
				"w-full bg-background border border-border px-4 py-3",
				"focus:border-primary focus-visible:outline-none transition-colors",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				className,
			].join(" ")}
			{...props}
		/>
	);
}
