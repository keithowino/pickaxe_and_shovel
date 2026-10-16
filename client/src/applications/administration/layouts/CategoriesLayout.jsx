import { NavLink, Outlet } from "react-router-dom";
import { Hero, LoadHeroTitle, PageSection } from "../../../shared/index.js";
import { MetaDataInsert, cn } from "../../../lib/index.js";

const CATEGORIES_LINKS = [
	{ to: "/admin/categories", label: "Project", end: true },
	{ to: "/admin/categories/blog", label: "Blog", end: false },
];

const CategoriesLayout = () => {
	return (
		<>
			<MetaDataInsert title={"Categories"} />

			<Hero
				metadata={{
					description:
						"Manage the categories used to classify projects and blog posts in the portfolio.",
					floatingTools: false,
					serial: "// CATEGORY TAXONOMY",
					showQuickStats: false,
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: "Categories",
								icon: "",
							}}
						/>
					),
				}}
			/>

			<PageSection className="!pt-0 sm:!pt-0">
				<div className="border-b border-border pb-4">
					<nav aria-label="Category sections">
						<ul className="flex gap-2 overflow-x-auto scrollbar-hide fade-edges-x snap-x snap-mandatory -mx-1 px-1">
							{CATEGORIES_LINKS.map((item) => (
								<li key={item.to}>
									<NavLink
										to={item.to}
										end={item.end}
										className={({ isActive }) =>
											cn(
												"inline-flex items-center justify-center px-4 py-2 text-sm font-medium border transition-colors",
												"border-border hover:border-primary",
												isActive
													? "bg-primary text-primary-foreground border-primary"
													: "bg-transparent text-foreground",
											)
										}
									>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</PageSection>

			<Outlet />
		</>
	);
};

export default CategoriesLayout;
