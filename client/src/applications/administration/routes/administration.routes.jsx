import {
	AdminGateway,
	BlogAdminPage,
	BlogPostsCategoryPage,
	ProjectCategoriesPage,
} from "../pages/index.js";
import { AuthenticatedRoute } from "../../../platform/index.js";
import { AdministrationLayout, CategoriesLayout } from "../layouts/index.js";

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
					// {
					// 	path: "categories",
					// 	element: <ProjectCategoriesPage />,
					// },
					{
						path: "categories",
						element: <CategoriesLayout />,
						children: [
							{
								index: true,
								element: <ProjectCategoriesPage />,
							},
							{
								path: "blog",
								element: <BlogPostsCategoryPage />,
							},
						],
					},
					{
						path: "blog",
						element: <BlogAdminPage />,
					},
				],
			},
		],
	},
];

export default administrationRoutes;
