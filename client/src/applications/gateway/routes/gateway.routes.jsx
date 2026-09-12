import { GatewayLayout } from "../layouts/index.js";
import {
	AboutPage,
	AdminPage,
	ContactPage,
	HomePage,
	PortfolioPage,
	ServicePage,
} from "../pages/index.js";
import { AuthenticatedRoute } from "../../../platform/index.js";

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
			{
				element: (
					<AuthenticatedRoute
						requireAdmin={true}
						showLoginScreen={true}
					/>
				),
				children: [
					{
						path: "/admin",
						element: <AdminPage />,
					},
				],
			},
		],
	},
];

export default gatewayRoutes;
