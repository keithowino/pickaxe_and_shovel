import MetaDataInsert from "../../../lib/MetaDataInsert";
import {
	FeatureGrid,
	Heading,
	Hero,
	LoadHeroTitle,
	PageSection,
	Paper,
	Text,
} from "../../../shared/index.js";
import { Link } from "react-router-dom";
import {
	Code2,
	Cpu,
	Wifi,
	Bot,
	GraduationCap,
	ArrowUpRight,
} from "lucide-react";

const SERVICES = [
	{
		icon: Code2,
		title: "Custom Web Applications",
		desc: "Modern, responsive SPAs and dashboards built with React, Tailwind CSS, and Supabase. From concept to deployed product.",
		topics: ["React", "Tailwind", "Supabase", "Vite"],
		msg: "Hi Keith, I'm interested in building a custom web application.",
	},
	{
		icon: Cpu,
		title: "Mechatronics & Automation Prototypes",
		desc: "Concept-to-prototype for automated systems. Arduino and Raspberry Pi driven hardware tailored to your use case.",
		topics: ["Arduino", "C++", "Sensors", "Motors"],
		msg: "Hi Keith, I'd like to discuss a mechatronics prototype.",
	},
	{
		icon: Wifi,
		title: "IoT Smart Devices",
		desc: "Connected devices for homes, farms, and business. Real-time data, cloud-synced dashboards, mobile-accessible.",
		topics: ["ESP32", "MQTT", "Cloud", "Dashboards"],
		msg: "Hi Keith, I'm exploring an IoT project.",
	},
	{
		icon: Bot,
		title: "DIY Robotics Solutions",
		desc: "Affordable robotic solutions for education, agriculture, and research — built with locally sourced components.",
		topics: ["Robotics", "Motion", "Vision", "Python"],
		msg: "Hi Keith, I want to build a robot.",
	},
	{
		icon: GraduationCap,
		title: "Technical Consulting & Training",
		desc: "One-on-one mentoring, team workshops, and technical advisory for startups navigating the hardware/software stack.",
		topics: ["Workshops", "1:1", "Advisory", "Teams"],
		msg: "Hi Keith, I'd like to book consulting or training.",
	},
];

const heroTitle = () => {
	return (
		<>
			What I <span className="text-primary">build</span>.
		</>
	);
};

const ServicePage = () => {
	return (
		<>
			<MetaDataInsert title={"Services"} />
			<Hero
				metadata={{
					floatingTools: false,
					serial: "// SPEC SHEET · 02",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"Five service lines spanning the full software/hardware spectrum — each designed to ship real, working systems.",
				}}
			/>

			<PageSection>
				<FeatureGrid>
					{SERVICES.map((s, i) => (
						<Paper
							key={s.title}
							as="article"
							transitionDelay={i * 0.8}
							interactive
							className="group relative"
						>
							<div className="serial-number text-muted-foreground absolute top-4 right-4">
								0{i + 1}
							</div>
							<s.icon
								className="h-10 w-10 text-primary mb-6"
								strokeWidth={1.5}
							/>
							<Heading level={3}>{s.title}</Heading>
							<Text className="mb-6">{s.desc}</Text>
							<div className="flex flex-wrap gap-2 mb-6">
								{s.topics.map((t) => (
									<span
										key={t}
										className="text-xs px-2 py-1 border border-border bg-background/50"
									>
										{t}
									</span>
								))}
							</div>
							<Link
								to={`/contact?msg=${encodeURIComponent(s.msg)}`}
								className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all"
							>
								Start a project{" "}
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Paper>
					))}
				</FeatureGrid>
			</PageSection>
		</>
	);
};

export default ServicePage;
