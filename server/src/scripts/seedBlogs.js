import { database } from "../app/index.js";
import { Post, BlogCategory } from "../modules/index.js";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Fetch a category ID by slug. Fails loudly if the category doesn't exist —
 * better than seeding posts with a dangling category reference.
 */
async function requireCategoryBySlug(slug) {
	const category = await BlogCategory.findOne({ slug }).lean();
	if (!category) {
		throw new Error(
			`Seed aborted: no blog category with slug "${slug}". ` +
				`Seed your categories first.`,
		);
	}
	return category._id;
}

// -----------------------------------------------------------------------------
// Posts
// -----------------------------------------------------------------------------

async function seedPosts() {
	try {
		await database.connectDatabase();

		// ---- Resolve categories once ------------------------------------
		const tutorialsId = await requireCategoryBySlug("tutorials");
		const buildLogsId = await requireCategoryBySlug("build-logs");
		const engineeringNotesId =
			await requireCategoryBySlug("engineering-notes");
		const essaysId = await requireCategoryBySlug("essays");

		// ---- Post 1: Frontend deep-dive --------------------------------
		const postOne = await Post.create({
			title: "Why Your React State Updates Feel One Step Behind",
			slug: "react-state-one-step-behind",
			excerpt:
				"Stale closures, batching, and the mental model that finally made React state clicks stop surprising me.",
			content: `## The symptom\n\nYou click a button, the counter shows \`1\` when you expected \`2\`. You click again, now it's \`2\` — always one behind. Classic.\n\n## The cause\n\nState is a snapshot. The value you read in the handler is the value from the render that created the handler. By the time the next render happens, you're reading a *new* closure.\n\n\`\`\`jsx\nfunction Counter() {\n  const [n, setN] = useState(0);\n  const handleClick = () => {\n    setN(n + 1); // uses the \`n\` from this render\n    setN(n + 1); // same \`n\` — not 2, just 1 again\n  };\n  return <button onClick={handleClick}>{n}</button>;\n}\n\`\`\`\n\n## The fix\n\nUse the functional updater when the next value depends on the previous one. It hands you the *latest* queued state, not the render's snapshot.\n\n\`\`\`jsx\nsetN(prev => prev + 1);\nsetN(prev => prev + 1); // now 2\n\`\`\`\n\n## The mental model\n\nThink of each render as a photograph. Event handlers are printed on that photograph. They will only ever see what was in the frame when the photo was taken. The functional updater is the one escape hatch — it reaches across photographs.\n\nOnce that clicked, I stopped fighting React and started reading the snapshot.`,
			coverImageUrl:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
			category: tutorialsId,
			tags: ["react", "javascript", "frontend"],
			type: "ARTICLE",
			status: "PUBLISHED",
			publishedAt: new Date("2026-08-30T09:00:00.000Z"),
			readingTimeMinutes: 2,
		});

		// ---- Post 2: Mechatronics build log ----------------------------
		const postTwo = await Post.create({
			title: "Open-Loop Commutation and the Lie of a Spinning Motor",
			slug: "open-loop-commutation-spinning-motor",
			excerpt:
				"A motor that spins under no load tells you almost nothing. Here's what I learned the moment I added a load and a position sensor.",
			content: `## It spins. That's not the same as it works.\n\nMy first brushless driver spun the motor on the bench. Clean startup, no stutter, exactly what the datasheet promised. I labelled the milestone "done" and moved on to the control loop.\n\nThat was the mistake.\n\n## What open-loop commutation actually assumes\n\nOpen-loop commutation fires the phases on a fixed schedule, usually driven by a timer. It assumes the rotor is exactly where the schedule expects it to be. Under no load, that assumption is nearly true — the rotor is light, the coils pull it along, and the lag is small enough to ignore.\n\nThe moment you add a load, the rotor lags. The schedule keeps firing as if nothing happened. The coils energise out of phase with the magnets. Torque drops. Sometimes the rotor stalls entirely and the driver happily keeps heating the coils.\n\n## What the encoder told me\n\nI strapped a cheap AS5600 magnetic encoder to the shaft and logged the electrical angle against the mechanical angle. Under no load, they tracked within a few degrees. Under a light finger-load, they diverged by 30°, then 60°, then the motor stalled.\n\nThe driver had no idea. It had no feedback. It was doing exactly what I told it to.\n\n## The takeaway\n\nAn open-loop motor is a motor that works only under the conditions you tested it in. The bench is not the field. If a mechanism's behaviour depends on the load, you need to sense the load — or at minimum, sense the consequence of it.\n\nNext step: closed-loop commutation with the encoder, and a current sensor so the driver can tell when it's fighting itself. That is the difference between a demo and a machine.`,
			coverImageUrl:
				"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
			category: buildLogsId,
			tags: ["mechatronics", "motors", "control-systems", "embedded"],
			type: "ARTICLE",
			status: "PUBLISHED",
			publishedAt: new Date("2026-09-14T07:30:00.000Z"),
			readingTimeMinutes: 3,
		});

		// ---- Post 3: AI tooling / agentic programming ------------------
		const postThree = await Post.create({
			title: "What a Model Context Protocol Server Taught Me About Tool Design",
			slug: "mcp-server-tool-design",
			excerpt:
				"Building an MCP server forced me to think about tool boundaries the way I think about function boundaries in code.",
			content: `## Tools are functions with a description\n\nWhen you write a normal function, the signature is the contract. The name, the parameters, the return type — that's what a caller reads. An MCP tool is the same thing, except the caller is a language model, and the signature is a natural-language description.\n\nThat shift in audience changes every design decision.\n\n## Lesson one: name the outcome, not the operation\n\nI started with a tool called \`do_query\`. It was ambiguous — query what? Return what shape? The model kept guessing.\n\nI renamed it to \`search_projects_by_stack\` and gave it one required argument: a tech name. The model stopped guessing. It either had a stack to search for or it didn't.\n\n## Lesson two: return shape is part of the contract\n\nA tool that returns "some JSON" is a tool the model will misread half the time. A tool that returns a list of objects with a documented schema — every field present, consistent names — is one the model can reason about.\n\nI ended up writing the JSON shape into the tool description itself. Not as a schema block, but as a sentence: "Returns a list of projects, each with a name, a slug, and a URL." That alone fixed three-quarters of the malformed calls I was seeing.\n\n## Lesson three: fewer tools, sharper tools\n\nMy first draft had eleven tools. After two weeks, six were never called correctly, and two were never called at all. The model was picking one of the remaining three and overloading it.\n\nI cut it to four, each doing one thing unambiguously. Total accuracy went up. Total capability went down on paper but up in practice.\n\n## Where this is going\n\nIf MCP is the standard for exposing capabilities to models, then the discipline of designing tools for models is its own craft. It looks like API design, but the reader is stranger and less forgiving. Worth learning properly.`,
			coverImageUrl:
				"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
			category: essaysId,
			tags: ["mcp", "ai", "tooling", "api-design"],
			type: "ARTICLE",
			status: "PUBLISHED",
			publishedAt: new Date("2026-09-28T11:00:00.000Z"),
			readingTimeMinutes: 3,
		});

		// ---- Post 4: Short note ----------------------------------------
		const postFour = await Post.create({
			title: "Note to self: read the errno, not the docs",
			slug: "note-read-the-errno",
			excerpt:
				"Half an hour lost to a serial port that wouldn't open. The docs were fine. The error code was clearer.",
			content: `Spent 30 minutes on a serial port that refused to open. Docs said "permission denied" usually meant the device was in use by another process. It wasn't. \`ls /dev/ttyUSB*\` showed nothing — the device wasn't there at all. The driver hadn't loaded.\n\nThe errno told me immediately once I actually read it. **ENOENT**, not **EACCES**. Missing, not locked.\n\nLesson: read the errno before you trust the docs. The docs describe the common case. The errno describes *your* case.`,
			coverImageUrl:
				"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
			category: engineeringNotesId,
			tags: ["debugging", "embedded", "notes"],
			type: "NOTE",
			status: "PUBLISHED",
			publishedAt: new Date("2026-10-06T15:45:00.000Z"),
			readingTimeMinutes: 1,
		});

		// ---- Report ----------------------------------------------------
		const seeded = [postOne, postTwo, postThree, postFour];

		for (const post of seeded) {
			console.log(
				`Seeded: ${post.slug} (${post.type}, ${post.category})`,
			);
		}

		console.log(`\nTotal seeded: ${seeded.length}`);

		await database.disconnectDatabase();
	} catch (error) {
		console.error("Seeding failed:", error);
		await database.disconnectDatabase().catch(() => {});
		process.exit(1);
	}
}

seedPosts();
