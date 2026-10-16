import { Link } from "react-router-dom";
import {
	Button,
	FeatureGrid,
	Heading,
	PageSection,
	Text,
} from "../../shared/index.js";
import { slugify } from "../blogUtils.js";

export const EmptyResponse = ({ load }) => {
	const { actions, code, desc, title } = load;

	return (
		<PageSection>
			<div className="border border-dashed border-border p-8 text-center sm:p-16">
				<div className="serial-number mb-4 text-muted-foreground">
					{code || "// RESPONSE EMPTY"}
				</div>

				<Heading level={2}>{title || "No items found."}</Heading>

				<Text className="mb-6">{desc}</Text>

				{actions && (
					<FeatureGrid>
						{actions.map((item, i) => {
							return (
								<Button
									key={slugify(`${item.label} ${String(i)}`)}
									as={item?.as}
									to={item?.to}
									onClick={item.click}
									size="sm"
									variant={item?.variant}
									fullWidthMobile
								>
									{item?.icon} {item.label}
								</Button>
							);
						})}
					</FeatureGrid>
				)}
			</div>
		</PageSection>
	);
};
