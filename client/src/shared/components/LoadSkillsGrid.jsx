import { motion } from "framer-motion";
import { platform } from "../config/index.js";
import { FeatureGrid } from "../layout/index.js";
import { Paper } from "../ui/index.js";

const LoadSkillsGrid = () => {
	const { proficiency } = platform;

	return (
		<FeatureGrid>
			{proficiency.map((s, i) => (
				<Paper key={s.name} transitionDelay={i}>
					<div className="flex items-center justify-between mb-3">
						<span className="font-heading font-semibold text-sm sm:text-base">
							{s.name}
						</span>
						<span className="serial-number text-muted-foreground">
							{s.category}
						</span>
					</div>
					<div className="h-1.5 bg-muted relative overflow-hidden rounded-full">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: `${s.level}%` }}
							viewport={{ once: true }}
							transition={{ duration: 1, delay: i * 0.04 }}
							className="absolute inset-y-0 left-0 bg-primary rounded-full"
						/>
					</div>
					<div className="mt-2 text-xs text-muted-foreground">
						{s.level}%
					</div>
				</Paper>
			))}
		</FeatureGrid>
	);
};

export default LoadSkillsGrid;
