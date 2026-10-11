import { Heading, PageSection, Text } from "../../shared/index.js";

export const EmptyResponse = ({ load }) => {
	const { desc, title } = load;

	return (
		<PageSection>
			<div className="border border-dashed border-border p-8 text-center sm:p-16">
				<div className="serial-number mb-4 text-muted-foreground">
					RESPONSE EMPTY
				</div>

				<Heading level={2}>{title || "No items found."}</Heading>

				<Text className="mb-6">{desc}</Text>
			</div>
		</PageSection>
	);
};
