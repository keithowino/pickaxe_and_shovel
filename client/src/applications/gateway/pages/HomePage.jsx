import { Hero, LoadHeroTitle } from "../../../shared/index.js";
import {
	LoadFeaturedProjects,
	LoadStats,
	platform,
	Skills,
} from "../../../shared/index.js";
import MetaDataInsert from "../../../lib/MetaDataInsert.jsx";
import { Terminal, Cpu } from "lucide-react";

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
							to: "/portfolio",
							icon: <Terminal className="h-4 w-4" />,
							label: "Explore Projects",
							className:
								"bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
						},
						{
							to: "/contact",
							icon: <Cpu className="h-4 w-4" />,
							label: "Get in Touch",
							className:
								"border border-border hover:border-primary hover:text-primary transition-colors",
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
