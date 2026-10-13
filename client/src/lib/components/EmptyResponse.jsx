import { Link } from "react-router-dom";
import { Button, Heading, PageSection, Text } from "../../shared/index.js";

export const EmptyResponse = ({ load }) => {
	const { code, desc, ref, title } = load;

	return (
		<PageSection>
			<div className="border border-dashed border-border p-8 text-center sm:p-16">
				<div className="serial-number mb-4 text-muted-foreground">
					{code || "// RESPONSE EMPTY"}
				</div>

				<Heading level={2}>{title || "No items found."}</Heading>

				<Text className="mb-6">{desc}</Text>

				{ref && (
					<Button as={Link} to={ref.to} variant="link">
						{ref.label}
					</Button>
				)}
			</div>
		</PageSection>
	);
};
