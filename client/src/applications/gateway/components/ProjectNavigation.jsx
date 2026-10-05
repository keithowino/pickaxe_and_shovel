import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureGrid } from "../../../shared";

export default function ProjectNavigation({ navigation }) {
	const { previous, next } = navigation;

	if (!previous && !next) {
		return null;
	}

	return (
		<section className="border-y border-border">
			<FeatureGrid columns={2} className="!gap-0">
				{previous ? (
					<Link
						to={`/portfolio/${previous.slug}`}
						className="group border-b border-border p-6 transition-colors hover:bg-muted/40 md:border-b-0 md:border-r sm:p-8"
					>
						<div className="mb-4 flex items-center gap-2 text-muted-foreground">
							<ArrowLeft size={16} />
							<span className="serial-number">
								PREVIOUS PROJECT
							</span>
						</div>

						<div className="font-heading text-xl font-bold uppercase transition-colors group-hover:text-primary">
							{previous.name}
						</div>
					</Link>
				) : (
					<div className="hidden md:block" />
				)}

				{next && (
					<Link
						to={`/portfolio/${next.slug}`}
						className="group p-6 text-left transition-colors hover:bg-muted/40 sm:p-8 md:text-right"
					>
						<div className="mb-4 flex items-center justify-end gap-2 text-muted-foreground">
							<span className="serial-number">NEXT PROJECT</span>
							<ArrowRight size={16} />
						</div>

						<div className="font-heading text-xl font-bold uppercase transition-colors group-hover:text-primary">
							{next.name}
						</div>
					</Link>
				)}
			</FeatureGrid>
		</section>
	);
}
