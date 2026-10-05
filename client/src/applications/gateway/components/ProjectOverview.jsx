import { PageSection, SectionHeader, Text } from "../../../shared/index.js";

/**
 * There is currently no separate editorial overview
 * field. Therefore the existing description is
 * the source of truth.
 */
export default function ProjectOverview({ project }) {
	return (
		<PageSection>
			<SectionHeader
				align="left"
				serial="// 01 · OVERVIEW"
				title="Overview"
			/>

			<div className="max-w-4xl">
				<Text className="text-base leading-8 sm:text-lg">
					{project.description ||
						"No project overview has been provided."}
				</Text>
			</div>
		</PageSection>
	);
}
