import { Hero, LoadHeroTitle, PageSection } from "../../../shared/index.js";
import { PostsTable } from "../components/index.js";

const BlogAdminPage = () => {
	return (
		<>
			<Hero
				metadata={{
					description: "Manage blog posts.",
					floatingTools: false,
					serial: "// BLOG MNG.",
					showQuickStats: false,
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: "Blog Posts",
								icon: "",
							}}
						/>
					),
					callToAction: [],
				}}
			/>

			<PageSection>
				<PostsTable />
			</PageSection>
		</>
	);
};

export default BlogAdminPage;
