import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/index.js";

const LoadHeroCTA = ({ callToAction }) => {
	const actions = callToAction.map((intent) => {
		return (
			<Button
				key={intent.label}
				as={intent?.as}
				variant={intent?.variant}
				to={intent?.to}
				onClick={intent?.onClick}
				className={[intent.className].join(" ")}
				// size="lg"
				fullWidthMobile
			>
				{intent.redirect === "back" && (
					<ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				)}
				{intent.icon}
				{intent.label}
				{intent.redirect === "forward" && (
					<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				)}
			</Button>
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
