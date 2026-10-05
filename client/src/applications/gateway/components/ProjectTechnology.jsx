import { PageSection, SectionHeader } from "../../../shared/index.js";

const TechnologyGroup = ({ label, items }) => {
	if (!items.length) {
		return null;
	}

	return (
		<div>
			<div className="serial-number mb-3 text-muted-foreground">
				{label}
			</div>

			<div className="flex flex-wrap gap-2">
				{items.map((item) => (
					<span
						key={item}
						className="border border-border bg-card/60 px-3 py-2 text-sm"
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
};

export default function ProjectTechnology({ project }) {
	const techStack = Array.isArray(project.techStack) ? project.techStack : [];

	const topics = Array.isArray(project.topics) ? project.topics : [];

	return (
		<PageSection>
			<SectionHeader
				align="left"
				serial="// 03 · TECHNOLOGY"
				title="Technology"
			/>

			<div className="space-y-8">
				{project.primaryLanguage && (
					<TechnologyGroup
						label="Primary Language"
						items={[project.primaryLanguage]}
					/>
				)}

				<TechnologyGroup label="Technology Stack" items={techStack} />

				<TechnologyGroup label="Topics" items={topics} />
			</div>
		</PageSection>
	);
}
