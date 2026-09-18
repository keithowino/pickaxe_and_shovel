import { SiteFooter } from "../../../shared/index.js";

const columns = [
	{
		title: "Platform",
		links: [
			{
				label: "Home",
				to: "/",
			},
			{
				label: "services",
				to: "/services",
			},
			{
				label: "Portfolio",
				to: "/portfolio",
			},
			{
				label: "Administration",
				to: "/admin",
			},
		],
	},
	{
		title: "Reach Out",
		links: [
			{
				label: "contact",
				to: "/contact",
			},
		],
	},
];

const bottomLinks = [
	{
		label: "About",
		to: "/about",
	},
	{
		label: "Privacy",
		to: "/privacy",
	},
	{
		label: "Terms",
		to: "/terms",
	},
];

export default function GatewayFooter() {
	return (
		<SiteFooter
			brand="Pickaxe & Shovel"
			description="Keith Owino — self-taught web developer transitioning into mechatronics engineering. Building automated systems, IoT solutions, and robotics in East Africa."
			columns={columns}
			bottomLinks={bottomLinks}
		/>
	);
}
