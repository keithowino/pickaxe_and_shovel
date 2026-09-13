import { Section, Container } from "../../ui/index.js";

export default function PageSection({
	children,
	className = "",
	containerClassName = "",
}) {
	return (
		<Section className={className}>
			<Container className={containerClassName}>{children}</Container>
		</Section>
	);
}
