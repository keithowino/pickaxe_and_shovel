import { motion } from "framer-motion";

const LoadSerialMsg = ({ serial }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center mb-6 sm:mb-8 flex-wrap"
		>
			<div className="h-px w-12 bg-primary shrink-0" />
			<span className="serial-number text-primary">{serial}</span>
		</motion.div>
	);
};

export default LoadSerialMsg;
