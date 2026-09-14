import { PageNotFound } from "../pages/index.js";

const platformRoutes = [
	{
		path: "*",
		element: <PageNotFound />,
	},
];

export default platformRoutes;
