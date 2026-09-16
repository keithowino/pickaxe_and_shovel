import { TextInput } from "../input/index.js";

export default function FormInput({ as, rows, className = "", ...props }) {
	if (as === "textarea") {
		return (
			<textarea
				rows={rows ?? 5}
				className={[
					"w-full bg-background border border-border px-4 py-3",
					"focus:border-primary focus-visible:outline-none",
					"resize-none transition-colors",
					"disabled:opacity-50 disabled:cursor-not-allowed",
					className,
				].join(" ")}
				{...props}
			/>
		);
	}

	return <TextInput className={className} {...props} />;
}
