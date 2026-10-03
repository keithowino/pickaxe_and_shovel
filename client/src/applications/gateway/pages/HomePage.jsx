import { Hero, LoadHeroTitle } from "../../../shared/index.js";
import {
	LoadFeaturedProjects,
	LoadStats,
	platform,
	Skills,
} from "../../../shared/index.js";
import { MetaDataInsert } from "../../../lib/index.js";
import { Terminal, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const heroTitle = () => {
	return (
		<>
			Digging deep.
			<br />
			<span className="text-primary">Building</span> the{" "}
			<span className="text-secondary">future</span>.
		</>
	);
};

const HomePage = () => {
	const { name } = platform;

	return (
		<>
			<MetaDataInsert title={name} />
			<Hero
				metadata={{
					floatingTools: true,
					serial: "SYS/001 // KEITH.OWINO // NAIROBI.KE",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"Web Designer → Mechatronics Engineer. Crafting software today, forging automated hardware for East Africa tomorrow.",
					callToAction: [
						{
							as: Link,
							to: "/portfolio",
							redirect: "forward",
							icon: <Terminal className="h-4 w-4" />,
							label: "Explore Projects",
						},
						{
							as: Link,
							to: "/contact",
							redirect: "forward",
							icon: <Cpu className="h-4 w-4" />,
							label: "Get in Touch",
							variant: "outline",
						},
					],
				}}
			/>
			<Skills />
			<LoadStats />
			<LoadFeaturedProjects />
		</>
	);
};

export default HomePage;
