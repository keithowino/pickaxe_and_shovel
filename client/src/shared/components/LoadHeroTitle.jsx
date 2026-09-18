import { motion } from "framer-motion";

const LoadHeroTitle = ({ metadata }) => {
	const { className, title, icon } = metadata;

	return (
		<motion.h1
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			className={[
				"font-heading font-bold text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] sm:leading-[1.02] tracking-tight mb-6 text-balance max-w-4xl",
				icon && "flex  items-center gap-3",
				className,
			].join(" ")}
		>
			{icon}
			{typeof title === "function" ? title() : title}
		</motion.h1>
	);
};

export default LoadHeroTitle;
