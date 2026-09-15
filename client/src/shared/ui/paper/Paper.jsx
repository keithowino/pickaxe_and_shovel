import { motion } from "framer-motion";

const MOTION_TAGS = {
	div: motion.div,
	article: motion.article,
	section: motion.section,
	aside: motion.aside,
	li: motion.li,
};

const Paper = ({
	as = "div",
	children,
	className = "",
	transitionDelay = 1,
	...props
}) => {
	const Component = MOTION_TAGS[as] ?? motion.div;

	return (
		<Component
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
			{...props}
		>
			{children}
		</Component>
	);
};

export default Paper;
