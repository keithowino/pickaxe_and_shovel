import { useEffect, useState } from "react";
// import { base44 } from "@/api/base44Client";
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";
import PostEditor from "./PostEditor";
import { formatDate, isScheduled } from "@/lib/blogUtils";

function renderStatus(post) {
	if (isScheduled(post)) {
		return (
			<span className="serial-number border border-primary/40 text-primary px-2 py-1">
				SCHEDULED
			</span>
		);
	}
	if (post.status === "published") {
		return (
			<span className="serial-number border border-secondary/40 text-secondary px-2 py-1">
				PUBLISHED
			</span>
		);
	}
	return (
		<span className="serial-number border border-border text-muted-foreground px-2 py-1">
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
		if (editing && editing !== "new" && editing.id) {
			await base44.entities.Post.update(editing.id, payload);
			toast({ title: "Post updated" });
		} else {
			// await base44.entities.Post.create(payload);
			await createBlogPost(payload);
			toast({ title: "Post created" });
		}
		setEditing(null);
		await load();
	};

	// const handleDelete = async (post) => {
	// 	try {
	// 		await base44.entities.Post.delete(post.id);
	// 		setConfirmId(null);
	// 		toast({ title: "Post deleted" });
	// 		await load();
	// 	} catch (e) {
	// 		toast({
	// 			title: "Delete failed",
	// 			description: e?.message,
	// 			variant: "destructive",
	// 		});
	// 	}
	// };

	const filtered = (posts || []).filter((p) => {
		if (!statusFilter) return true;
		if (statusFilter === "scheduled") return isScheduled(p);
		return p.status === statusFilter;
	});

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<div className="h-px w-12 bg-primary" />
						<span className="serial-number text-primary">
							// BLOG POSTS
						</span>
					</div>
					<p className="serial-number text-muted-foreground">
						{posts?.length ?? 0} IN DATABASE
					</p>
				</div>
				<div className="flex items-center gap-3">
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="serial-number h-11 px-3 border border-border bg-card hover:border-primary transition-colors min-h-[44px]"
					>
						<option value="">All statuses</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
						<option value="scheduled">Scheduled</option>
					</select>
					<Button onClick={() => setEditing("new")}>
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
				<div className="flex justify-center py-20">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
				</div>
			) : filtered.length === 0 ? (
				<div className="border border-dashed border-border py-16 text-center">
					<p className="serial-number text-muted-foreground">
						No posts match this filter.
					</p>
				</div>
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
									fittingType="fill"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-heading font-semibold truncate">
									{post.title}
								</h3>
								<div className="flex items-center gap-2 flex-wrap mt-1.5">
									<span className="serial-number text-primary bg-primary/5 px-2 py-0.5">
										{post.category}
									</span>
									{post.type === "note" && (
										<span className="serial-number text-secondary border border-secondary/30 px-2 py-0.5">
											NOTE
										</span>
									)}
									{renderStatus(post)}
									<span className="serial-number text-muted-foreground">
										{formatDate(post.publishedAt) || "—"}
									</span>
								</div>
								{post.tags?.length > 0 && (
									<div className="serial-number text-muted-foreground mt-1 truncate">
										{post.tags
											.map((t) => `#${t}`)
											.join(" ")}
									</div>
								)}
							</div>
							<div className="flex items-center gap-2 shrink-0">
								<button
									onClick={() => setEditing(post)}
									className="p-2 border border-border hover:border-primary transition-colors"
									aria-label="Edit post"
								>
									<Pencil className="h-4 w-4" />
								</button>
								{confirmId === post.id ? (
									<button
										onClick={() => handleDelete(post)}
										className="serial-number px-3 py-2 bg-destructive text-destructive-foreground hover:opacity-90"
									>
										DELETE?
									</button>
								) : (
									<button
										onClick={() => setConfirmId(post.id)}
										className="p-2 border border-border hover:border-destructive transition-colors"
										aria-label="Delete post"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
