import MetaDataInsert from "../../../lib/MetaDataInsert";
import {
	Hero,
	LoadHeroTitle,
	LoadSkillsGrid,
	PageSection,
	Paper,
	SectionHeader,
} from "../../../shared/index.js";
import Timeline from "../components/Timeline.jsx";

const heroTitle = () => {
	return (
		<>
			From <span className="text-primary">bits</span> to{" "}
			<span className="text-secondary">atoms</span>.
		</>
	);
};

const AboutPage = () => {
	return (
		<>
			<MetaDataInsert title={"About"} />
			<Hero
				metadata={{
					floatingTools: false,
					serial: "// SPEC SHEET · 01",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"I'm Keith Owino — a self-taught developer from Nairobi, Kenya. I build web applications today and i am methodically in the path to learning mechatronics to build automated systems that solve real East African problems: smart agriculture, affordable robotics, and connected IoT infrastructure.",
				}}
			/>
			<PageSection>
				<SectionHeader
					serial="// TIMELINE"
					title="The Journey So Far"
					align="left"
				/>
				<Timeline />
			</PageSection>
			<PageSection>
				<SectionHeader
					serial="// CAPABILITIES"
					title="Skills & Proficiency"
					align="left"
				/>
				<LoadSkillsGrid />
			</PageSection>
			<PageSection>
				<Paper className="relative p-8 sm:p-10 lg:p-16 overflow-hidden">
					<div className="absolute top-0 right-0 serial-number bg-primary text-primary-foreground px-3 py-1">
						MANIFESTO
					</div>

					<blockquote className="relative mt-6 sm:mt-4">
						<p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-4 max-w-3xl leading-snug text-balance">
							"The next decade belongs to those who can bridge
							software and hardware — and ship it from Africa."
						</p>
						<footer className="text-muted-foreground serial-number">
							— KEITH OWINO · NAIROBI · 2025
						</footer>
					</blockquote>
				</Paper>
			</PageSection>
			;
		</>
	);
};

export default AboutPage;
