import { motion } from "framer-motion";

const LoadHeroTitle = ({ metadata }) => {
	const { className, title } = metadata;

	return (
		<motion.h1
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			className={[
				"font-heading font-bold text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] sm:leading-[1.02] tracking-tight mb-6 text-balance max-w-4xl",
				className,
			].join(" ")}
		>
			{title()}
		</motion.h1>
	);
};

export default LoadHeroTitle;
