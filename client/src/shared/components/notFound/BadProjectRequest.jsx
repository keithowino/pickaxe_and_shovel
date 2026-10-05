import { Link } from "react-router-dom";
import { PageSection } from "../../layout/index.js";
import { Heading, Text } from "../../ui/index.js";

const BadProjectRequest = ({ redirect }) => {
	const { to, label } = redirect;

	return (
		<PageSection>
			<div className="border border-dashed border-border p-8 text-center sm:p-16">
				<div className="serial-number mb-4 text-muted-foreground">
					PROJECT NOT FOUND
				</div>

				<Heading level={2}>This project could not be found.</Heading>

				<Text className="mb-6">
					The project may have been unpublished or the URL may be
					incorrect.
				</Text>

				<Link
					to={to}
					className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
				>
					{label}
				</Link>
			</div>
		</PageSection>
	);
};

export default BadProjectRequest;
