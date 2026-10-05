import { ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

import { Button, Heading, Text } from "../../../shared/index.js";

export default function ProjectHero({ project }) {
	return (
		<section className="relative border-b border-border">
			<div className="relative aspect-square sm:aspect-[16/7] min-h-[320px] overflow-hidden bg-muted">
				{project.thumbnailUrl ? (
					<>
						<img
							src={project.thumbnailUrl}
							alt=""
							className="h-full w-full object-cover"
						/>

						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
					</>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background">
						<span className="font-heading text-[8rem] font-bold text-primary/10">
							{project.name?.[0]?.toUpperCase() || "?"}
						</span>
					</div>
				)}

				<div className="absolute inset-x-0 bottom-0">
					<div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12 lg:pb-12">
						<div className="max-w-4xl">
							<div className="mb-3 flex flex-wrap items-center gap-3">
								<span className="serial-number text-primary">
									PROJECT
								</span>

								{project.category && (
									<span className="serial-number text-muted-foreground">
										{project.category.name}
									</span>
								)}
							</div>

							<Heading level={1} className="uppercase">
								{project.name}
							</Heading>

							{project.description && (
								<Text className="mt-4 max-w-3xl text-base sm:text-lg">
									{project.description}
								</Text>
							)}

							<div className="mt-6 flex flex-wrap gap-3">
								{project.liveUrl && (
									<Button
										as="a"
										href={project.liveUrl}
										target="_blank"
										fullWidthMobile
									>
										Live Project
										<ExternalLink size={16} />
									</Button>
								)}

								{project.githubUrl && (
									<Button
										as="a"
										variant="secondary"
										href={project.githubUrl}
										target="_blank"
										fullWidthMobile
									>
										GitHub
										<IoLogoGithub size={18} />
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
