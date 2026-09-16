export default function FormLabel({
	children,
	htmlFor,
	className,
	required = { isRequired: false, className: "" },
}) {
	return (
		<label
			htmlFor={htmlFor}
			className={`serial-number text-muted-foreground block mb-2 ${className}`}
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
