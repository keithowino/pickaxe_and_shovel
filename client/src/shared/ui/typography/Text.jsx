import { motion } from "framer-motion";

export default function Text({ children, className = "", visuals = false }) {
	const sharedClassName =
		"text-sm sm:text-base text-muted-foreground leading-relaxed";

	if (visuals) {
		return (
			<>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className={[
						"mt-5 sm:mt-6 sm:text-lg lg:text-xl max-w-2xl",
						sharedClassName,
						className,
					].join(" ")}
				>
					{children}
				</motion.p>
			</>
		);
	}

	return <p className={[sharedClassName, className].join(" ")}>{children}</p>;
}
