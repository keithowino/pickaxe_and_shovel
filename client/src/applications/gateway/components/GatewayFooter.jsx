import { MapPin, Mail, Phone } from "lucide-react";
import { SiteFooter } from "../../../shared/index.js";

// import { platform } from "../../../shared/index.js";

const columns = [
	{
		title: "Navigate",
		links: [
			{
				label: "Home",
				to: "/home",
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
				label: "contact",
				to: "/contact",
			},
		],
	},
	// {
	// 	title: "Contact",
	// 	content: (
	// 		<div className="space-y-4">
	// 			<div className="flex gap-3">
	// 				<MapPin
	// 					size={18}
	// 					className="mt-0.5 shrink-0 text-slate-500"
	// 				/>

	// 				<span className="text-sm leading-6 text-slate-600">
	// 					{/* {platform.location.name}, {platform.location.city} */}
	// 				</span>
	// 			</div>

	// 			<div className="flex gap-3">
	// 				<Mail
	// 					size={18}
	// 					className="mt-0.5 shrink-0 text-slate-500"
	// 				/>

	// 				<span className="text-sm leading-6 text-slate-600">
	// 					{/* {platform.contact.email} */}
	// 				</span>
	// 			</div>

	// 			<div className="flex gap-3">
	// 				<Phone
	// 					size={18}
	// 					className="mt-0.5 shrink-0 text-slate-500"
	// 				/>

	// 				<span className="text-sm leading-6 text-slate-600">
	// 					{/* {platform.contact.phone} */}
	// 				</span>
	// 			</div>
	// 		</div>
	// 	),
	// },
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
