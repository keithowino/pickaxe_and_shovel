import { motion } from "framer-motion";

const Paper = ({ children, className, transitionDelay = 1 }) => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: transitionDelay * 0.1 }}
				className={[
					"border border-border p-6 sm:p-8 bg-card/50 transition-all duration-200",
					"hover:border-primary hover:shadow-lg",
					"active:scale-[0.98] active:border-primary",
					className,
				].join(" ")}
			>
				{children}
			</motion.div>
		</>
	);
};

export default Paper;
