import { platform } from "../../config/index.js";
import { PageSection } from "../../layout/index.js";

const Skills = () => {
	const { skills } = platform;
	const doubled = [...skills, ...skills];

	return (
		<PageSection className="border-y border-border bg-card/30 overflow-hidden group">
			<div
				className="flex gap-6 sm:gap-8 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
				// style={{
				// 	maskImage:
				// 		"linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
				// 	WebkitMaskImage:
				// 		"linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
				// }}
			>
				{doubled.map((skill, i) => (
					<div
						key={i}
						className="flex items-center gap-6 sm:gap-8 shrink-0"
					>
						<span className="font-heading text-base sm:text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors select-none">
							{skill}
						</span>
						<span className="text-primary text-xs sm:text-sm">
							◆
						</span>
					</div>
				))}
			</div>
		</PageSection>
	);
};

export default Skills;
