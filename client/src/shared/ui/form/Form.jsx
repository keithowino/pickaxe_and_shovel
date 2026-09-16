export default function Form({ children, className = "", onSubmit }) {
	return (
		<form
			onSubmit={onSubmit}
			className={`border border-border bg-card/50 p-5 sm:p-6 lg:p-10 space-y-5 sm:space-y-6 ${className}`}
		>
			{children}
		</form>
	);
}
