import { AdminGateway } from "../pages/index.js";
import { AuthenticatedRoute } from "../../../platform/index.js";
import { AdministrationLayout } from "../layouts/index.js";

const administrationRoutes = [
	{
		element: (
			<AuthenticatedRoute requireAdmin={true} showLoginScreen={true} />
		),
		children: [
			{
				path: "/admin",
				element: <AdministrationLayout />,
				children: [
					{
						index: true,
						element: <AdminGateway />,
					},
				],
			},
		],
	},
];

export default administrationRoutes;
