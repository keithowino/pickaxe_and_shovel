import { forwardRef } from "react";
import { Container, Section } from "../../ui/index.js";

const PageSection = forwardRef(function PageSection(
	{ children, className = "", containerClassName = "" },
	ref,
) {
	return (
		<Section ref={ref} className={className}>
			<Container className={containerClassName}>{children}</Container>
		</Section>
	);
});

export default PageSection;
