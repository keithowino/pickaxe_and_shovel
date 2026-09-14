import { motion } from "framer-motion";

const LoadSerialMsg = ({ serial, showAccent = false }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center mb-4 sm:mb-6 flex-wrap gap-3"
		>
			{showAccent && <div className="h-px w-12 bg-primary shrink-0" />}
			<span className="serial-number text-primary">{serial}</span>
		</motion.div>
	);
};

export default LoadSerialMsg;
