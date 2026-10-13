import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	Button,
	Form,
	FormInput,
	FormLabel,
	toast,
} from "../../../shared/index.js";
import { X } from "lucide-react";
import { computeReadingTime, slugify } from "../../../lib/index.js";
import { useEffect } from "react";
import { fetchProjectCategories } from "../services/index.js";

function toLocalInput(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
	return local.toISOString().slice(0, 16);
}

export default function PostEditor({
	initial,
	existingSlugs = [],
	onSave,
	onCancel,
}) {
	const [categories, setCategories] = useState([]);
	const [form, setForm] = useState(() => ({
		title: initial?.title || "",
		slug: initial?.slug || "",
		excerpt: initial?.excerpt || "",
		category: initial?.category || categories[0],
		tags: (initial?.tags || []).join(", "),
		type: initial?.type || "ARTICLE",
		status: initial?.status || "DRAFT",
		publishedAt: toLocalInput(initial?.publishedAt),
		coverImageUrl: initial?.coverImageUrl || "",
		content: initial?.content || "",
	}));

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));

	const loadCategories = async () => {
		setLoading(true);

		try {
			const projectCategories = await fetchProjectCategories();

			setCategories(projectCategories);
		} catch (error) {
			console.error("Failed to load categories:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []); // refreshKey;

	const update = (k, value) =>
		setForm((f) => {
			const next = { ...f, [k]: value };
			if (k === "title" && !slugTouched) next.slug = slugify(value);
			return next;
		});

	const submit = async (e) => {
		e?.preventDefault();

		if (
			!form.title.trim() ||
			!form.excerpt.trim() ||
			!form.content.trim() ||
			!form.coverImageUrl.trim() ||
			!form.category
		) {
			toast({
				title: "Missing fields",
				description:
					"Title, excerpt, cover image, category, and content are required.",
				variant: "destructive",
			});
			return;
		}

		let slug = slugify(form.slug || form.title);
		if (!slug) {
			toast({
				title: "Invalid slug",
				description: "A slug could not be generated from the title.",
				variant: "destructive",
			});
			return;
		}
		const others = existingSlugs.filter((s) => s !== initial?.slug);
		if (others.includes(slug)) {
			let i = 1;
			while (others.includes(`${slug}-${i + 1}`)) i += 1;
			slug = `${slug}-${i + 1}`;
		}

		let publishedAt = form.publishedAt
			? new Date(form.publishedAt).toISOString()
			: undefined;
		if (form.status === "PUBLISHED" && !publishedAt)
			publishedAt = new Date().toISOString();

		const payload = {
			title: form.title.trim(),
			slug,
			excerpt: form.excerpt.trim(),
			content: form.content,
			coverImageUrl: form.coverImageUrl.trim(),
			category: form.category,
			tags: [
				...new Set(
					form.tags
						.split(",")
						.map((t) => t.trim().toLowerCase())
						.filter(Boolean),
				),
			],
			type: form.type,
			status: form.status,
			// publishedAt,
			...(publishedAt ? { publishedAt } : {}),
			readingTimeMinutes: computeReadingTime(form.content),
		};

		setSaving(true);
		try {
			await onSave(payload);
		} catch (err) {
			toast({
				title: "Save failed",
				description: err?.message || "Could not save the post.",
				variant: "destructive",
			});
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		if (!form.category && categories.length > 0) {
			update("category", categories[0]._id);
		}
	}, [categories]);

	// const categoryOptions = [
	// 	...new Set([initial?.category, ...categories].filter(Boolean)),
	// ];
	// Normalize: accept either populated objects or raw ID strings
	const categoryOptions = (() => {
		const seen = new Set();
		const out = [];

		const push = (raw) => {
			if (!raw) return;
			const id = typeof raw === "string" ? raw : raw._id || raw.id;
			const name =
				typeof raw === "string" ? raw : raw.name || raw.slug || raw._id;
			if (!id || seen.has(id)) return;
			seen.add(id);
			out.push({ id, name });
		};

		push(initial?.category);
		categories.forEach(push);
		return out;
	})();

	const selectClass =
		"border border-border bg-card px-3 h-11 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full";

	return (
		<Form onSubmit={submit}>
			<div className="flex items-center justify-between">
				<span className="serial-number text-primary">
					{initial?.id ? "// EDIT POST" : "// NEW POST"}
				</span>
				<button
					type="button"
					onClick={onCancel}
					className="text-muted-foreground hover:text-foreground"
					aria-label="Cancel"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="space-y-1.5 sm:col-span-2">
					<FormLabel required={{ isRequired: true }}>TITLE</FormLabel>

					<FormInput
						value={form.title}
						onChange={(e) => update("title", e.target.value)}
						className="h-11"
					/>
				</div>
				<div className="space-y-1.5">
					<FormLabel required={{ isRequired: true }}>SLUG</FormLabel>

					<FormInput
						value={form.slug}
						onChange={(e) => {
							setSlugTouched(true);
							update("slug", e.target.value);
						}}
						className="h-11"
					/>
				</div>
				<div className="space-y-1.5">
					<FormLabel required={{ isRequired: true }}>
						CATEGORY
					</FormLabel>
					{/* <select
						value={form.category}
						onChange={(e) => update("category", e.target.value)}
						className={selectClass}
					>
						{categoryOptions.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select> */}
					{/* <select
						value={form.category}
						onChange={(e) => update("category", e.target.value)}
						className={selectClass}
					>
						{categoryOptions.map((c) => (
							<option key={c} value={c.id}>
								{c.name}
							</option>
						))}
					</select> */}
					<select
						value={
							typeof form.category === "string"
								? form.category
								: form.category?._id || ""
						}
						onChange={(e) => update("category", e.target.value)}
						className={selectClass}
					>
						<option value="" disabled>
							Select a category…
						</option>
						{categoryOptions.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</div>
				<div className="space-y-1.5 sm:col-span-2">
					<FormLabel required={{ isRequired: true }}>
						EXCERPT
					</FormLabel>

					<FormInput
						as="textarea"
						value={form.excerpt}
						onChange={(e) => update("excerpt", e.target.value)}
						rows={2}
					/>
				</div>
				<div className="space-y-1.5 sm:col-span-2">
					<FormLabel required={{ isRequired: true }}>
						COVER IMAGE URL
					</FormLabel>

					<FormInput
						value={form.coverImageUrl}
						onChange={(e) =>
							update("coverImageUrl", e.target.value)
						}
						className="h-11"
						placeholder="https://..."
					/>
				</div>
				<div className="space-y-1.5 sm:col-span-2">
					<FormLabel>TAGS (comma separated)</FormLabel>

					<FormInput
						value={form.tags}
						onChange={(e) => update("tags", e.target.value)}
						className="h-11"
						placeholder="embedded, motors, debug"
					/>
				</div>
				<div className="space-y-1.5">
					<FormLabel required={{ isRequired: true }}>TYPE</FormLabel>

					<select
						value={form.type}
						onChange={(e) =>
							update("type", e.target.value.toUpperCase())
						}
						className={selectClass}
					>
						<option value="ARTICLE">article</option>
						<option value="NOTE">note</option>
					</select>
				</div>
				<div className="space-y-1.5">
					<FormLabel required={{ isRequired: true }}>
						STATUS
					</FormLabel>

					<select
						value={form.status}
						onChange={(e) =>
							update("status", e.target.value.toUpperCase())
						}
						className={selectClass}
					>
						<option value="DRAFT">draft</option>
						<option value="PUBLISHED">published</option>
					</select>
				</div>
				<div className="space-y-1.5 sm:col-span-2">
					<FormLabel>
						PUBLISH AT (leave empty to publish now)
					</FormLabel>

					<FormInput
						type="datetime-local"
						value={form.publishedAt}
						onChange={(e) => update("publishedAt", e.target.value)}
						className="h-11"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="space-y-1.5">
					<FormLabel required={{ isRequired: true }}>
						CONTENT (MARKDOWN)
					</FormLabel>

					<FormInput
						as="textarea"
						value={form.content}
						onChange={(e) => update("content", e.target.value)}
						rows={20}
						className="font-mono text-sm min-h-[400px]"
					/>
				</div>
				<div className="space-y-1.5">
					<FormLabel>LIVE PREVIEW</FormLabel>

					<div className="blog-content border border-border bg-background p-4 overflow-y-auto min-h-[400px] max-h-[640px]">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{form.content || "*Nothing to preview yet.*"}
						</ReactMarkdown>
					</div>
				</div>
			</div>

			<div className="flex gap-3 pt-2">
				<Button type="submit" disabled={saving}>
					{saving
						? "Saving..."
						: initial?.id
							? "Update post"
							: "Create post"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</Form>
	);
}
