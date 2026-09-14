import { forwardRef } from "react";

const Section = forwardRef(function Section({ children, className = "" }, ref) {
	return (
		<section ref={ref} className={`py-5 sm:py-8 ${className}`}>
			{children}
		</section>
	);
});

export default Section;
