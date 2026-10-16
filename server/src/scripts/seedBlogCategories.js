import { database } from "../app/index.js";
import { BlogCategory } from "../modules/index.js";

const BLOG_CATEGORIES = [
	{
		name: "Tutorials",
		slug: "tutorials",
		description:
			"Step-by-step guides with runnable code. Written to be followed, not just read.",
		displayOrder: 1,
		active: true,
	},
	{
		name: "Build Logs",
		slug: "build-logs",
		description:
			"Chronological records of projects in progress — the decisions, the dead ends, and the fixes.",
		displayOrder: 2,
		active: true,
	},
	{
		name: "Engineering Notes",
		slug: "engineering-notes",
		description:
			"Short observations and gotchas. One lesson per post, learned the hard way.",
		displayOrder: 3,
		active: true,
	},
	{
		name: "Essays",
		slug: "essays",
		description:
			"Long-form arguments and reflections on engineering practice, tools, and craft.",
		displayOrder: 4,
		active: true,
	},
	{
		name: "Field Notes",
		slug: "field-notes",
		description:
			"Observations from outside the desk — the workshop, the city, the environment.",
		displayOrder: 5,
		active: true,
	},
];

async function seedBlogCategories() {
	try {
		await database.connectDatabase();

		const created = [];

		for (const data of BLOG_CATEGORIES) {
			// Idempotent: update if the slug already exists, insert otherwise.
			const category = await BlogCategory.findOneAndUpdate(
				{ slug: data.slug },
				data,
				{
					upsert: true,
					returnDocument: "after",
					setDefaultsOnInsert: true,
				},
			);

			created.push(category);
		}

		for (const category of created) {
			console.log(
				`Seeded: ${category.name} (${category.slug}) #${category.displayOrder}`,
			);
		}

		console.log(`\nTotal blog categories: ${created.length}`);

		await database.disconnectDatabase();
	} catch (error) {
		console.error("Seeding failed:", error);
		await database.disconnectDatabase().catch(() => {});
		process.exit(1);
	}
}

seedBlogCategories();
