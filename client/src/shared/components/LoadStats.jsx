import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Hammer, Rocket } from "lucide-react";
import {
	fetchProjects,
	getProjectStats,
} from "../../services/projectServices.js";
import { FeatureGrid, PageSection } from "../layout/index.js";
import { Paper } from "../ui/index.js";

export default function LoadStats() {
	const [projectCount, setProjectCount] = useState(null);
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadStats();
	}, []);

	const loadStats = async () => {
		try {
			// Get all projects for count
			const allProjects = await fetchProjects();
			setProjectCount(allProjects.length);

			// Get detailed stats
			const projectStats = await getProjectStats();
			setStats(projectStats);
		} catch (error) {
			console.error("Failed to load stats:", error);
			setProjectCount(0);
		} finally {
			setLoading(false);
		}
	};

	const statsData = [
		{
			icon: Hammer,
			label: "Projects Built",
			value: loading
				? "—"
				: projectCount !== null
					? `${projectCount}`
					: "—",
			color: "text-primary",
		},
		{
			icon: MapPin,
			label: "Based In",
			value: "Nairobi, KE 🇰🇪",
			color: "text-secondary",
		},
		{
			icon: Rocket,
			label: "Future Founder",
			value: "Mechatronics",
			color: "text-primary",
		},
	];

	return (
		<PageSection>
			<FeatureGrid>
				{statsData.map((s, i) => (
					<Paper
						key={s.label}
						className="group relative hover:-translate-y-1 transition-all duration-300"
						transitionDelay={i}
					>
						<div className="flex items-start justify-between mb-5 sm:mb-6">
							<div
								className={`h-10 w-10 rounded-full flex items-center justify-center ${s.bg}`}
							>
								<s.icon className={`h-5 w-5 ${s.color}`} />
							</div>
							<span className="serial-number text-muted-foreground">
								0{i + 1}
							</span>
						</div>
						<div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
							{s.value}
						</div>
						<div className="mt-2 serial-number text-muted-foreground">
							{s.label}
						</div>
					</Paper>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
