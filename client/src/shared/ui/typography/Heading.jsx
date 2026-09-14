const levels = {
	1: "text-3xl sm:text-4xl md:text-5xl font-bold",
	2: "text-2xl sm:text-3xl font-bold",
	3: "text-xl sm:text-2xl font-semibold",
	4: "text-lg sm:text-xl font-semibold",
};

export default function Heading({ level = 2, className = "", children }) {
	const Component = `h${level}`;

	return (
		<Component
			className={[
				"font-heading mb-4 sm:mb-6 text-balance",
				levels[level],
				className,
			].join(" ")}
		>
			{children}
		</Component>
	);
}
