import { useEffect, useState } from "react";
// import { base44 } from "@/api/base44Client";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
	Button,
	Heading,
	Loader,
	SectionHeader,
	Text,
	toast,
} from "../../../shared/index.js";
import PostEditor from "./PostEditor.jsx";
import {
	createBlogPost,
	deleteBlogPost,
	fetchAdminBlogPosts,
	updateBlogPost,
} from "../services/index.js";
import {
	EmptyResponse,
	formatDate,
	Image,
	isScheduled,
	MODULE_BOX,
	SELECT_CLASS,
} from "../../../lib/index.js";

// Remember to add reading time crud ui

function renderStatus(post) {
	if (isScheduled(post)) {
		return (
			<span className="text-xs px-2 py-0.5 border border-primary/40 text-primary">
				SCHEDULED
			</span>
		);
	}
	if (post.status === "PUBLISHED") {
		return (
			<span className="text-xs px-2 py-0.5 border border-secondary/40 text-secondary">
				PUBLISHED
			</span>
		);
	}
	return (
		<span className="text-xs px-2 py-0.5 border border-border text-muted-foreground">
			DRAFT
		</span>
	);
}

export default function PostsTable() {
	const [posts, setPosts] = useState(null);
	const [editing, setEditing] = useState(null);
	const [confirmId, setConfirmId] = useState(null);
	const [statusFilter, setStatusFilter] = useState("");

	const load = async () => {
		try {
			// const res = await base44.entities.Post.list("-updated_date", 200);
			const res = await fetchAdminBlogPosts();
			setPosts(res || []);
		} catch (e) {
			setPosts([]);
			toast({
				title: "Load failed",
				description: e?.message,
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		load();
	}, []);

	const existingSlugs = (posts || []).map((p) => p.slug).filter(Boolean);

	const handleSave = async (payload) => {
		try {
			if (editing && editing !== "new" && editing.id) {
				await updateBlogPost(editing.id, payload);
				toast({ title: "Post updated" });
			} else {
				await createBlogPost(payload);
				toast({ title: "Post created" });
			}
			setEditing(null);
			await load();
		} catch (e) {
			toast({
				title: "Save failed",
				description: e?.message || "Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleDelete = async (post) => {
		try {
			await deleteBlogPost(post.id);
			setConfirmId(null);
			toast({ title: "Post deleted" });
			await load();
		} catch (e) {
			toast({
				title: "Delete failed",
				description: e?.message || "Please try again.",
				variant: "destructive",
			});
		}
	};

	const filtered = (posts || []).filter((p) => {
		if (!statusFilter) return true;
		if (statusFilter === "SCHEDULED") return isScheduled(p);
		return p.status === statusFilter;
	});

	return (
		<div className={MODULE_BOX}>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
				<div>
					<SectionHeader
						serial="// BLOG POSTS"
						header={3}
						align="left"
						spacing="mb-0"
					/>
					<Text className="!text-xs">
						{posts?.length ?? 0} IN DATABASE
					</Text>
				</div>
				<div className="flex flex-col sm:flex-row items-center gap-3">
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className={SELECT_CLASS}
					>
						<option value="">All statuses</option>
						<option value="DRAFT">Draft</option>
						<option value="PUBLISHED">Published</option>
						<option value="SCHEDULED">Scheduled</option>
					</select>
					<Button
						onClick={() => setEditing("new")}
						size="sm"
						fullWidthMobile
					>
						<Plus className="h-4 w-4" /> New Post
					</Button>
				</div>
			</div>

			{editing && (
				<PostEditor
					initial={editing === "new" ? null : editing}
					existingSlugs={existingSlugs}
					onSave={handleSave}
					onCancel={() => setEditing(null)}
				/>
			)}

			{posts === null ? (
				<Loader />
			) : filtered.length === 0 ? (
				<EmptyResponse load={{ desc: "No posts match this filter." }} />
			) : (
				<div className="border border-border divide-y divide-border">
					{filtered.map((post) => (
						<div
							key={post.id}
							className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/40 transition-colors"
						>
							<div className="w-full sm:w-24 h-24 sm:h-16 shrink-0 overflow-hidden bg-muted border border-border">
								<Image
									src={post.coverImageUrl}
									alt={post.title}
									fittingType="cover"
									className="w-full h-full"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<Heading className="truncate" level={5}>
									{post.title}
								</Heading>
								<div className="flex items-center gap-2 flex-wrap">
									<span className="text-xs px-2 py-0.5 border border-border">
										{post.category?.name || "—"}
									</span>
									{post.type === "NOTE" && (
										<span className="text-xs px-2 py-0.5 border border-border">
											NOTE
										</span>
									)}

									{renderStatus(post)}
									<Text className="!text-sm">
										{formatDate(post.publishedAt) || "—"}
									</Text>
								</div>
								{post.tags?.length > 0 && (
									<div className="flex flex-wrap mt-1 gap-1.5 mb-4">
										{post.tags.map((t) => (
											<span
												key={t}
												className="text-xs px-2 py-0.5 border border-border bg-background/60"
											>
												{t}
											</span>
										))}
									</div>
								)}
							</div>
							<div className="flex items-center gap-2 shrink-0">
								<Button
									onClick={() => setEditing(post)}
									size="sm"
									variant="outline"
									fullWidthMobile
									aria-label="Edit post"
								>
									<Pencil className="h-4 w-4" />
								</Button>
								{confirmId === post.id ? (
									<Button
										onClick={() => handleDelete(post)}
										size="sm"
										variant="destructive"
										fullWidthMobile
									>
										DELETE?
									</Button>
								) : (
									<Button
										onClick={() => setConfirmId(post.id)}
										size="sm"
										variant="secondary"
										fullWidthMobile
										aria-label="Delete post"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
