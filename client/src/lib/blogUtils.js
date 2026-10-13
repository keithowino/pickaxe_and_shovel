export function slugify(value) {
	return String(value ?? "")
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function computeReadingTime(content) {
	const words = String(content || "")
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(value) {
	if (!value) return "";
	const d = new Date(value);
	if (isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function isScheduled(post) {
	return (
		post?.status === "PUBLISHED" &&
		!!post?.publishedAt &&
		new Date(post.publishedAt) > new Date()
	);
}

export function isLive(post) {
	return (
		post?.status === "PUBLISHED" &&
		(!post?.publishedAt || new Date(post.publishedAt) <= new Date())
	);
}

export const dummyCategories = [
	{
		id: "6ac12d93cc829113f2b9cf69",
		name: "Web Development",
		slug: "web-development",
		description: "",
		displayOrder: 3,
		active: true,
		createdAt: new Date("2026-10-03T16:30:11.171Z"),
		updatedAt: new Date("2026-10-05T10:22:09.798Z"),
	},
	{
		id: "6ac12daacc829113f2b9cf6a",
		name: "Mechatronics",
		slug: "mechatronics",
		description: "",
		displayOrder: 3,
		active: true,
		createdAt: new Date("2026-10-03T16:30:34.582Z"),
		updatedAt: new Date("2026-10-03T16:32:01.057Z"),
	},
	{
		id: "6ac37a2452de174a78a28a70",
		name: "API Build Tutorials",
		slug: "api-build-tutorials",
		description: "",
		displayOrder: 2,
		active: true,
		createdAt: new Date("2026-10-05T10:21:24.861Z"),
		updatedAt: new Date("2026-10-05T10:22:09.796Z"),
	},
	{
		id: "6ac37a7652de174a78a28a71",
		name: "Learning",
		slug: "learning",
		description: "My learning journey.",
		displayOrder: 4,
		active: true,
		createdAt: new Date("2026-10-05T10:22:46.968Z"),
		updatedAt: new Date("2026-10-05T10:22:46.968Z"),
	},
	{
		id: "6ac37ab452de174a78a28a72",
		name: "Collaborations",
		slug: "collaborations",
		description: "Team builds.",
		displayOrder: 5,
		active: true,
		createdAt: new Date("2026-10-05T10:23:48.251Z"),
		updatedAt: new Date("2026-10-05T10:23:48.251Z"),
	},
	{
		id: "6ac37ada52de174a78a28a73",
		name: "Model Context Protocol",
		slug: "model-context-protocol",
		description: "MCP projects.",
		displayOrder: 6,
		active: true,
		createdAt: new Date("2026-10-05T10:24:26.722Z"),
		updatedAt: new Date("2026-10-05T10:24:26.722Z"),
	},
	{
		id: "6acb17af9ff96cf271b289f8",
		name: "Coming Soon",
		slug: "coming-soon",
		description: "Set to be developed in the near future.",
		displayOrder: 7,
		active: true,
		createdAt: new Date("2026-10-11T04:59:27.073Z"),
		updatedAt: new Date("2026-10-11T04:59:27.073Z"),
	},
];

export const dummyPostsArr = [
	{
		id: "6acb69cf34bb77c45cb95ffc",
		title: "Why Your React State Updates Feel One Step Behind",
		slug: "why-your-react-state-updates-feel-one-step-behind",
		excerpt:
			"Stale closures, batching, and the mental model that finally made React state clicks stop surprising me.",
		content:
			"## The symptom\n\nYou click a button, the counter shows `1` when you expected `2`. You click again, now it's `2` — always one behind. Classic.\n\n## The cause\n\nState is a snapshot. The value you read in the handler is the value from the render that created the handler. By the time the next render happens, you're reading a *new* closure.\n\n```jsx\nfunction Counter() {\n  const [n, setN] = useState(0);\n  const handleClick = () => {\n    setN(n + 1); // uses the `n` from this render\n    setN(n + 1); // same `n` — not 2, just 1 again\n  };\n  return <button onClick={handleClick}>{n}</button>;\n}\n```\n\n## The fix\n\nUse the functional updater when the next value depends on the previous one. It hands you the *latest* queued state, not the render's snapshot.\n\n```jsx\nsetN(prev => prev + 1);\nsetN(prev => prev + 1); // now 2\n```\n\n## The mental model\n\nThink of each render as a photograph. Event handlers are printed on that photograph. They will only ever see what was in the frame when the photo was taken. The functional updater is the one escape hatch — it reaches across photographs.\n\nOnce that clicked, I stopped fighting React and started reading the snapshot.",
		coverImageUrl:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
		// category: "6ac12d93cc829113f2b9cf69",
		category: dummyCategories[0],
		tags: ["react", "javascript", "frontend"],
		type: "ARTICLE",
		status: "PUBLISHED",
		publishedAt: new Date("2026-10-11T10:49:00.000Z"),
		readingTimeMinutes: 2,
		createdAt: new Date("2026-10-11T10:49:51.136Z"),
		updatedAt: new Date("2026-10-11T10:49:51.136Z"),
	},
	{
		id: "6acb6fe334bb77c45cb96000",
		title: "Designing a Closed-Loop Motor Controller Without Losing Your Mind",
		slug: "designing-a-closed-loop-motor-controller-without-losing-your-mind",
		excerpt:
			"A build log on taking a BLDC motor from open-loop commutation to a stable velocity loop, and the debugging heuristics that actually mattered.",
		content:
			'## The problem\n\nOpen-loop commutation gets a motor spinning, but it teaches you nothing about what the motor is *actually* doing. The moment you ask it to hold a position under load, the illusion breaks.\n\nThis is a log of taking a small BLDC gimbal motor from blind commutation to a velocity loop that survives a step load.\n\n### The stack\n\n- STM32G4 running at 170 MHz\n- Magnetic encoder, 14-bit absolute\n- Three half-bridge drivers, current-sense on the low side\n- Control loop at 20 kHz, telemetry at 100 Hz\n\n## What actually mattered\n\nThe thing nobody tells you: **the sensor alignment is 90% of the work.** A 2-degree electrical offset between the mechanical zero and the electrical zero turns your `d` axis into a `q` axis leakage path and your loop gain becomes a function of angle.\n\n```c\n// crude electrical-zero calibration: hold d-axis voltage, read encoder\nfloat align_sensor() {\n  apply_voltage(q_axis = 0.0f, d_axis = 0.5f);\n  delay_ms(500);\n  return encoder_read_electrical();\n}\n```\n\nAfter alignment, the PI gains stopped being mysterious. Before, I was tuning a system whose plant changed every revolution.\n\n## The loop\n\nA cascaded loop: inner current (PI), outer velocity (PI). Bandwidth separation of ~10x kept them from fighting.\n\n- Current loop: 2 kHz bandwidth\n- Velocity loop: 200 Hz bandwidth\n- Feed-forward: back-EMF estimate from `Ke * omega`\n\n## Lessons\n\n1. Calibrate before you tune.\n2. Telemetry is not optional — you cannot tune what you cannot see.\n3. Saturation handling in the integrator is the difference between "works on the bench" and "works in the field."\n\nThe motor now holds 0.1% velocity error across a 0–3000 RPM range. The whole journey was three weeks; the code was two days of it.',
		coverImageUrl:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
		// category: "6ac12daacc829113f2b9cf6a",
		category: dummyCategories[1],
		tags: ["motor-control", "embeded", "stm32", "control-systems"],
		type: "ARTICLE",
		status: "PUBLISHED",
		publishedAt: new Date("2026-10-11T11:15:47.449Z"),
		readingTimeMinutes: 2,
		createdAt: new Date("2026-10-11T11:15:47.470Z"),
		updatedAt: new Date("2026-10-11T11:15:47.470Z"),
	},
	{
		id: "6acd58e693921accb2971358",
		title: "Draft: Thoughts on a Self-Documenting Test Bench",
		slug: "draft-thoughts-on-a-self-documenting-test-bench",
		excerpt:
			"Work in progress — notes toward a test bench whose wiring documents itself.",
		content:
			"## Status: draft\n\nThis is a working draft. Notes toward a test bench where the wiring harness *is* the documentation.\n\n- Each cable labeled at both ends with the signal and the pin.\n- A photo of the bench auto-archived on every test run.\n- The test script reads the harness manifest and refuses to run if a cable is missing.\n\nMore once I've run it through a real qualification cycle.",
		coverImageUrl:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
		// category: ObjectId("6ac12daacc829113f2b9cf6a"),
		category: dummyCategories[1],
		tags: ["testing", "hardware"],
		type: "NOTE",
		status: "PUBLISHED",
		publishedAt: new Date("2026-10-12T22:02:14.205Z"),
		readingTimeMinutes: 1,
		createdAt: new Date("2026-10-12T22:02:14.224Z"),
		updatedAt: new Date("2026-10-12T22:02:14.224Z"),
	},
];
