import { GatewayLayout } from "../layouts/index.js";
import {
	AboutPage,
	ContactPage,
	HomePage,
	PortfolioPage,
	ServicePage,
} from "../pages/index.js";

const gatewayRoutes = [
	{
		element: <GatewayLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/services",
				element: <ServicePage />,
			},
			{
				path: "/portfolio",
				element: <PortfolioPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
		],
	},
];

export default gatewayRoutes;
