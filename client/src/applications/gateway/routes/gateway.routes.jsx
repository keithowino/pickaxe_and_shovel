import { GatewayLayout } from "../layouts/index.js";
import {
	AboutPage,
	BlogPage,
	BlogPostPage,
	ContactPage,
	HomePage,
	PortfolioPage,
	ProjectDetailPage,
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
				path: "/blog",
				element: <BlogPage />,
			},
			{
				path: "/blog/:slug",
				element: <BlogPostPage />,
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
				path: "/portfolio/:slug",
				element: <ProjectDetailPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
		],
	},
];

export default gatewayRoutes;
