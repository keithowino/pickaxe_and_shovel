import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, X } from "lucide-react";

import {
	Button,
	FormField,
	FormInput,
	FormLabel,
	Heading,
	Loader,
	PageSection,
	SectionHeader,
	Text,
	toast,
} from "../../../shared/index.js";

import {
	createBlogPostCategory,
	createProjectCategory,
	deactivateBlogPostCategory,
	deleteBlogPostCategory,
	deleteProjectCategory,
	fetchBlogPostCategories,
	fetchProjectCategories,
	updateBlogPostCategory,
	updateProjectCategory,
} from "../services/index.js";
import { EmptyResponse } from "../../../lib/index.js";

const emptyForm = {
	name: "",
	description: "",
	displayOrder: null,
};

const BlogPostsCategoryPage = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [formError, setFormError] = useState("");

	const [editingCategory, setEditingCategory] = useState(null);
	const [isCreating, setIsCreating] = useState(false);
	const [form, setForm] = useState(emptyForm);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [actionId, setActionId] = useState(null);

	const loadCategories = async () => {
		setLoading(true);

		try {
			const data = await fetchBlogPostCategories();

			setCategories(data);
		} catch (err) {
			console.error("Failed to load blog post categories:", err);
			toast({
				title: "Fetch Error",
				description:
					err.message ||
					"Failed to load blog post categories. Please try again.",
				variant: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const openCreateForm = () => {
		setEditingCategory(null);
		// setForm(emptyForm);
		setForm({ ...emptyForm, displayOrder: categories.length + 1 });
		setFormError("");
		setIsCreating(true);
	};

	const openEditForm = (category) => {
		setEditingCategory(category);
		setForm({
			name: category.name,
			description: category.description || "",
		});
		setFormError("");
		setIsCreating(false);
	};

	const closeForm = () => {
		if (isSubmitting) return;

		setEditingCategory(null);
		setIsCreating(false);
		setForm(emptyForm);
		setFormError("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setFormError("");
		setIsSubmitting(true);

		try {
			if (editingCategory) {
				const updated = await updateBlogPostCategory(
					editingCategory.id,
					form,
				);

				setCategories((current) =>
					current.map((category) =>
						category.id === updated.id ? updated : category,
					),
				);

				toast({
					title: "Category Update",
					description: "Category updated successfully.",
					variant: "success",
				});
			} else {
				const created = await createBlogPostCategory(form);

				setCategories((current) =>
					[...current, created].sort(
						(a, b) =>
							a.displayOrder - b.displayOrder ||
							a.name.localeCompare(b.name),
					),
				);

				toast({
					title: "Category Creation",
					description: "Category created successfully.",
					variant: "success",
				});
			}

			setEditingCategory(null);
			setIsCreating(false);
			setForm(emptyForm);
		} catch (err) {
			console.error("Failed to save blog post category:", err);

			toast({
				title: "Save Error",
				description:
					err.message ||
					"Unable to save the blog post category. Please try again.",
				variant: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const toggleActive = async (category) => {
		setActionId(category.id);

		try {
			const updated = await deactivateBlogPostCategory(category.id, {
				active: !category.active,
			});

			setCategories((current) =>
				current.map((item) =>
					item.id === updated.id ? updated : item,
				),
			);

			toast({
				title: "Status",
				description: updated.active
					? `"${updated.name}" activated.`
					: `"${updated.name}" deactivated.`,
				variant: "default",
			});
		} catch (err) {
			console.error("Failed to update category status:", err);
			toast({
				title: "Status Update Error",
				description:
					err.message ||
					"Unable to update the category status. Please try again.",
				variant: "error",
			});
		} finally {
			setActionId(null);
		}
	};

	const moveCategory = async (index, direction) => {
		const targetIndex = index + direction;

		if (targetIndex < 0 || targetIndex >= categories.length || actionId) {
			return;
		}

		const currentCategory = categories[index];
		const targetCategory = categories[targetIndex];

		setActionId(currentCategory.id);

		try {
			const [updatedCurrent, updatedTarget] = await Promise.all([
				updateBlogPostCategory(currentCategory.id, {
					displayOrder: targetCategory.displayOrder,
				}),
				updateBlogPostCategory(targetCategory.id, {
					displayOrder: currentCategory.displayOrder,
				}),
			]);

			const reordered = [...categories];

			reordered[index] = updatedTarget;
			reordered[targetIndex] = updatedCurrent;

			reordered.sort(
				(a, b) =>
					a.displayOrder - b.displayOrder ||
					a.name.localeCompare(b.name),
			);

			setCategories(reordered);
			toast({
				title: "Category Update",
				description: "Category order updated.",
				variant: "success",
			});
		} catch (err) {
			console.error("Failed to reorder categories:", err);
			toast({
				title: "Category Reorder Error",
				description:
					err.message ||
					"Unable to reorder categories. Please try again.",
				variant: "error",
			});
		} finally {
			setActionId(null);
		}
	};

	const handleDelete = async (category) => {
		const confirmed = window.confirm(
			`Delete the "${category.name}" category?`,
		);

		if (!confirmed) return;

		setActionId(category.id);

		try {
			await deleteBlogPostCategory(category.id);

			setCategories((current) =>
				current.filter((item) => item.id !== category.id),
			);

			toast({
				title: "Category Removal",
				description: `"${category.name}" deleted.`,
				variant: "success",
			});
		} catch (err) {
			console.error("Failed to delete category:", err);
			toast({
				title: "Category Removal Error",
				description:
					err.message ||
					"Unable to delete the category. It may still be assigned to projects.",
				variant: "error",
			});
		} finally {
			setActionId(null);
		}
	};

	return (
		<>
			<PageSection className="!pt-0">
				{!categories.length ||
					(!isCreating && (
						<div className="flex justify-end my-4">
							<Button
								onClick={openCreateForm}
								disabled={isCreating}
							>
								<Plus className="h-4 w-4" /> Add Category
							</Button>
						</div>
					))}

				{(isCreating || editingCategory) && (
					<div className="mb-6 border border-border bg-card/50 p-5 sm:p-6">
						<div className="mb-5">
							<SectionHeader
								serial={
									editingCategory
										? "// EDIT CATEGORY"
										: "// NEW CATEGORY"
								}
								title={
									editingCategory
										? "Edit Category"
										: "Create Category"
								}
								align="left"
							/>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<FormField>
								<FormLabel htmlFor="category-name">
									CATEGORY NAME
								</FormLabel>

								<FormInput
									id="category-name"
									name="name"
									value={form.name}
									onChange={(event) =>
										setForm((current) => ({
											...current,
											name: event.target.value,
										}))
									}
									placeholder="e.g. IoT"
									required
								/>
							</FormField>

							<FormField>
								<FormLabel htmlFor="category-description">
									DESCRIPTION
								</FormLabel>

								<FormInput
									id="category-description"
									name="description"
									value={form.description}
									onChange={(event) =>
										setForm((current) => ({
											...current,
											description: event.target.value,
										}))
									}
									placeholder="Describe the type of projects in this category."
								/>
							</FormField>

							{formError && (
								<div
									role="alert"
									className="flex items-center justify-between border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive"
								>
									{formError}
									<Button
										onClick={() => setFormError("")}
										variant="ghost"
										size="sm"
									>
										<X />
									</Button>
								</div>
							)}

							<div className="flex flex-wrap gap-2">
								<Button
									type="submit"
									disabled={isSubmitting || !form.name.trim()}
								>
									{isSubmitting
										? "Saving..."
										: editingCategory
											? "Save Changes"
											: "Create Category"}
								</Button>

								<Button
									type="button"
									variant="outline"
									onClick={closeForm}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				)}

				{loading ? (
					<div className="flex justify-center py-16">
						<Loader type="inline" />
					</div>
				) : categories.length === 0 ? (
					<EmptyResponse
						load={{
							code: "// NO CATEGORIES",
							title: "No blog post categories yet.",
							desc: "Create the first category to begin organizing your blog posts.",
							actions: [
								{
									click: openCreateForm,
									icon: <Plus className="h-4 w-4" />,
									label: "Create Category",
								},
							],
						}}
					/>
				) : (
					<div className="border border-border">
						<div className="hidden grid-cols-[auto_1fr_2fr_auto_auto] gap-4 border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
							<span>Order</span>
							<span>Name</span>
							<span>Description</span>
							<span>Status</span>
							<span>Actions</span>
						</div>

						<div>
							{categories.map((category, index) => {
								const isBusy = actionId === category.id;

								return (
									<div
										key={category.id}
										className="grid gap-4 border-b border-border p-4 last:border-b-0 md:grid-cols-[auto_1fr_2fr_auto_auto] md:items-center"
									>
										<div className="flex items-center gap-2">
											<div className="text-sm font-mono text-muted-foreground">
												{category.displayOrder}
											</div>

											<div className="flex">
												<Button
													type="button"
													onClick={() =>
														moveCategory(index, -1)
													}
													disabled={
														index === 0 ||
														!!actionId
													}
													aria-label={`Move ${category.name} up`}
													size="sm"
													variant="secondary"
												>
													<ArrowUp className="h-4 w-4" />
												</Button>

												<Button
													type="button"
													onClick={() =>
														moveCategory(index, 1)
													}
													disabled={
														index ===
															categories.length -
																1 || !!actionId
													}
													aria-label={`Move ${category.name} down`}
													size="sm"
													variant="secondary"
												>
													<ArrowDown className="h-4 w-4" />
												</Button>
											</div>
										</div>

										<div>
											<div className="font-medium">
												{category.name}
											</div>

											<div className="mt-1 text-xs text-muted-foreground">
												{category.slug}
											</div>
										</div>

										<div className="text-sm text-muted-foreground">
											{category.description ||
												"No description."}
										</div>

										<div>
											<Button
												type="button"
												onClick={() =>
													toggleActive(category)
												}
												disabled={isBusy}
												size="sm"
												variant="outline"
												className={` ${
													category.active &&
													"border-primary/40 bg-primary/5 text-primary"
												}`}
											>
												{category.active
													? "Active"
													: "Inactive"}
											</Button>
										</div>

										<div className="flex items-center gap-1">
											<Button
												type="button"
												onClick={() =>
													openEditForm(category)
												}
												disabled={!!actionId}
												aria-label={`Edit ${category.name}`}
												size="sm"
												variant="outline"
											>
												<Pencil className="h-4 w-4" />
											</Button>

											<Button
												type="button"
												onClick={() =>
													handleDelete(category)
												}
												disabled={isBusy}
												aria-label={`Delete ${category.name}`}
												size="sm"
												variant="destructive"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PageSection>
		</>
	);
};

export default BlogPostsCategoryPage;
