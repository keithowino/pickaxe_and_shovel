import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LoadHeroCTA = ({ callToAction }) => {
	const actions = callToAction.map((intent) => {
		return (
			<Link
				key={intent.label}
				to={intent.to}
				className={[
					"group inline-flex items-center justify-center gap-2 px-7 py-4 font-medium active:scale-[0.98] w-full sm:w-auto",
					intent.className,
				].join(" ")}
			>
				{intent.icon}
				{intent.label}
				<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
			</Link>
		);
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
		>
			{actions}
		</motion.div>
	);
};

export default LoadHeroCTA;
