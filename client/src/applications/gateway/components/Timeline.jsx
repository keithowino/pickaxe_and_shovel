import { motion } from "framer-motion";
import { platform } from "../../../shared/index.js";

const Timeline = () => {
	const { milestones } = platform;
	const lastIndex = milestones.length - 1;

	return (
		<div className="relative">
			<div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
			<div className="space-y-14">
				{milestones.map((m, i) => {
					const isLatest = i === lastIndex;
					return (
						<motion.div
							key={m.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="relative pl-12 lg:pl-0 grid lg:grid-cols-2 gap-3 lg:gap-6"
						>
							{/* Dot — centered on the line at both breakpoints */}
							<div
								className={`absolute left-[10px] lg:left-1/2 top-1 lg:-translate-x-1/2 h-3 w-3 rounded-full border-2 border-background ${
									isLatest
										? "bg-primary animate-pulse"
										: "bg-primary"
								}`}
							/>
							{isLatest && (
								<span className="absolute left-[10px] lg:left-1/2 lg:-translate-x-1/2 top-1 h-3 w-3 rounded-full bg-primary/40 animate-ping" />
							)}

							<div
								className={`${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
							>
								<div className="serial-number text-primary mb-2 flex items-center gap-2 lg:justify-end lg:[.lg\:col-start-2_&]:justify-start">
									{m.year}
									{isLatest && (
										<span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm normal-case tracking-normal">
											current
										</span>
									)}
								</div>
								<h3 className="font-heading text-xl sm:text-2xl font-bold mb-2">
									{m.title}
								</h3>
								<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
									{m.desc}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Timeline;
