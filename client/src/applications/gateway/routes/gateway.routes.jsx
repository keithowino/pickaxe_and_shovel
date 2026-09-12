import { GatewayLayout } from "../layouts/index.js";
import { HomePage } from "../pages/index.js";
// import {
// 	AboutPage,
// 	GatewayPage,
// 	PrivacyPage,
// 	TermsPage,
// } from "../pages/index.js";

const gatewayRoutes = [
	{
		element: <GatewayLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			// {
			// 	path: "/about",
			// 	element: <AboutPage />,
			// },
			// {
			// 	path: "/privacy",
			// 	element: <PrivacyPage />,
			// },
			// {
			// 	path: "/terms",
			// 	element: <TermsPage />,
			// },
		],
	},
];

export default gatewayRoutes;
