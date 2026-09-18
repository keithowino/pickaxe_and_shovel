import { SiteHeader } from "../../../shared/index.js";

const BASE_LINKS = [
	{ to: "/", label: "Home", end: true },
	{ to: "/portfolio", label: "Portfolio" },
];

function AdministrationActions() {
	return (
		<div className="flex items-center gap-3">
			<p>NO ACTIONS</p>
		</div>
	);
}

export default function AdministrationHeader() {
	return (
		<SiteHeader
			brand="Admin"
			brandHref="/"
			links={BASE_LINKS}
			actions={<AdministrationActions />}
		/>
	);
}
