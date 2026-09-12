import { Link } from "react-router-dom";
import { SiteHeader } from "../../../shared/index.js";
// import { useAuth } from "@/lib/AuthContext";

const BASE_LINKS = [
	{ to: "/", label: "Home", end: true },
	{ to: "/about", label: "About" },
	{ to: "/services", label: "Services" },
	{ to: "/portfolio", label: "Portfolio" },
	{ to: "/contact", label: "Contact" },
];

function GatewayActions() {
	return (
		<div className="flex items-center gap-3">
			<Link
				to="/login"
				className="text-sm font-medium text-slate-600 hover:text-slate-950"
			>
				Sign in
			</Link>

			<Link
				to="/register"
				className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
			>
				Get started
			</Link>
		</div>
	);
}

export default function GatewayHeader() {
	//   const { user } = useAuth();
	let user = true; // Placeholder for user authentication state

	const refs = user
		? [...BASE_LINKS, { to: "/admin", label: "Admin" }]
		: BASE_LINKS;
	return (
		<SiteHeader
			brand="Pickaxe & Shovel"
			brandHref="/"
			links={refs}
			actions={<GatewayActions />}
		/>
	);
}
