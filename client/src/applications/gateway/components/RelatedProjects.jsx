import { Link } from "react-router-dom";

import {
	FeatureGrid,
	PageSection,
	SectionHeader,
} from "../../../shared/index.js";

export default function ({ projects }) {
	if (!projects?.length) {
		return null;
	}

	return (
		<PageSection>
			<SectionHeader
				align="left"
				serial="// 04 · SAME CATEGORY"
				title="Related Projects"
			/>

			<FeatureGrid>
				{projects.map((project) => (
					<Link
						key={project.id}
						to={`/portfolio/${project.slug}`}
						className="group border border-border bg-card/60 transition-all hover:border-primary"
					>
						<div className="aspect-video overflow-hidden border-b border-border bg-muted">
							{project.thumbnailUrl ? (
								<img
									src={project.thumbnailUrl}
									alt=""
									loading="lazy"
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background">
									<span className="font-heading text-6xl font-bold text-primary/10">
										{project.name?.[0]?.toUpperCase() ||
											"?"}
									</span>
								</div>
							)}
						</div>

						<div className="p-5">
							<div className="serial-number mb-2 text-muted-foreground">
								{project.category?.name}
							</div>

							<div className="font-heading text-lg font-bold uppercase transition-colors group-hover:text-primary">
								{project.name}
							</div>
						</div>
					</Link>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
