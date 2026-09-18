export default function Container({ children, className = "" }) {
	return (
		<div
			// // v1
			// className={[
			// 	"mx-auto w-full",
			// 	"max-w-screen-2xl",
			// 	"px-4",
			// 	"sm:px-6",
			// 	"lg:px-8",
			// 	"xl:px-10",
			// 	"2xl:px-12",
			// 	className,
			// ].join(" ")}

			// // v2
			// className={[
			// 	"mx-auto w-full",
			// 	"max-w-7xl",
			// 	"py-4",
			// 	"sm:py-6",
			// 	"px-6",
			// 	"lg:px-10",
			// 	className,
			// ].join(" ")}

			className={[
				// "mx-auto w-full",
				"container mx-auto",
				// "max-w-7xl",
				"px-6",
				"lg:px-10",
				className,
			].join(" ")}
		>
			{children}
		</div>
	);
}
