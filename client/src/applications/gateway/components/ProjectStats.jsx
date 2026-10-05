import { GitFork, Star } from "lucide-react";

import {
	FeatureGrid,
	PageSection,
	Paper,
	SectionHeader,
} from "../../../shared/index.js";

const stats = [
	{
		key: "stars",
		label: "Stars",
		Icon: Star,
	},
	{
		key: "forks",
		label: "Forks",
		Icon: GitFork,
	},
];

export default function ProjectStats({ project }) {
	return (
		<PageSection>
			<SectionHeader
				align="left"
				serial="// 02 · PROJECT METRICS"
				title="Stats"
			/>

			<FeatureGrid columns={4}>
				{stats.map(({ key, label, Icon }, index) => (
					<Paper key={key} transitionDelay={index}>
						<div className="mb-5 sm:mb-6 flex items-center justify-between">
							<span className="serial-number text-muted-foreground">
								{label}
							</span>

							<Icon
								size={18}
								className="text-primary"
								aria-hidden="true"
							/>
						</div>

						<div className="font-heading text-3xl font-bold sm:text-4xl">
							{project[key] ?? 0}
						</div>
					</Paper>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
