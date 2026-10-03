import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Pencil, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";

import { MetaDataInsert } from "../../../lib/index.js";
import {
	Button,
	Heading,
	Loader,
	PageSection,
	Text,
	FormField,
	FormInput,
	FormLabel,
	Hero,
	LoadHeroTitle,
} from "../../../shared/index.js";

import {
	createProjectCategory,
	deleteProjectCategory,
	fetchProjectCategories,
	updateProjectCategory,
} from "../services/index.js";

// I used variant="outline" on Button because it is a common pattern, but your shared Button implementation wasn't included in the files you supplied. If your Button doesn't expose that variant, remove the prop and give that cancel button the project's existing secondary styling.

const emptyForm = {
	name: "",
	description: "",
};

const ProjectCategoriesPage = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [formError, setFormError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [editingCategory, setEditingCategory] = useState(null);
	const [isCreating, setIsCreating] = useState(false);
	const [form, setForm] = useState(emptyForm);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [actionId, setActionId] = useState(null);

	const loadCategories = async () => {
		setLoading(true);
		setError("");

		try {
			const data = await fetchProjectCategories();

			setCategories(data);
		} catch (err) {
			console.error("Failed to load project categories:", err);
			setError(
				err.message ||
					"Failed to load project categories. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const openCreateForm = () => {
		setEditingCategory(null);
		setForm(emptyForm);
		setFormError("");
		setSuccessMessage("");
		setIsCreating(true);
	};

	const openEditForm = (category) => {
		setEditingCategory(category);
		setForm({
			name: category.name,
			description: category.description || "",
		});
		setFormError("");
		setSuccessMessage("");
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
		setSuccessMessage("");
		setIsSubmitting(true);

		try {
			if (editingCategory) {
				const updated = await updateProjectCategory(
					editingCategory.id,
					form,
				);

				setCategories((current) =>
					current.map((category) =>
						category.id === updated.id ? updated : category,
					),
				);

				setSuccessMessage("Category updated successfully.");
			} else {
				const created = await createProjectCategory(form);

				setCategories((current) =>
					[...current, created].sort(
						(a, b) =>
							a.displayOrder - b.displayOrder ||
							a.name.localeCompare(b.name),
					),
				);

				setSuccessMessage("Category created successfully.");
			}

			setEditingCategory(null);
			setIsCreating(false);
			setForm(emptyForm);
		} catch (err) {
			console.error("Failed to save project category:", err);
			setFormError(
				err.message ||
					"Unable to save the project category. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const toggleActive = async (category) => {
		setActionId(category.id);
		setError("");
		setSuccessMessage("");

		try {
			const updated = await updateProjectCategory(category.id, {
				active: !category.active,
			});

			setCategories((current) =>
				current.map((item) =>
					item.id === updated.id ? updated : item,
				),
			);

			setSuccessMessage(
				updated.active
					? `"${updated.name}" activated.`
					: `"${updated.name}" deactivated.`,
			);
		} catch (err) {
			console.error("Failed to update category status:", err);
			setError(
				err.message ||
					"Unable to update the category status. Please try again.",
			);
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
		setError("");
		setSuccessMessage("");

		try {
			const [updatedCurrent, updatedTarget] = await Promise.all([
				updateProjectCategory(currentCategory.id, {
					displayOrder: targetCategory.displayOrder,
				}),
				updateProjectCategory(targetCategory.id, {
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
			setSuccessMessage("Category order updated.");
		} catch (err) {
			console.error("Failed to reorder categories:", err);
			setError(
				err.message ||
					"Unable to reorder categories. Please try again.",
			);
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
		setError("");
		setSuccessMessage("");

		try {
			await deleteProjectCategory(category.id);

			setCategories((current) =>
				current.filter((item) => item.id !== category.id),
			);

			setSuccessMessage(`"${category.name}" deleted.`);
		} catch (err) {
			console.error("Failed to delete category:", err);
			setError(
				err.message ||
					"Unable to delete the category. It may still be assigned to projects.",
			);
		} finally {
			setActionId(null);
		}
	};

	return (
		<>
			<MetaDataInsert title={"Project Categories"} />

			<Hero
				metadata={{
					// description: <Desc />,
					description:
						"Manage the categories used to classify projects in the portfolio.",
					floatingTools: false,
					serial: "// PROJECT TAXONOMY",
					showQuickStats: false,
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: "Project Categories",
								icon: "",
							}}
						/>
					),
					callToAction: [
						{
							as: Link,
							to: "/admin",
							redirect: "back",
							label: "Back to Admin",
							variant: "outline",
						},
						{
							onClick: openCreateForm,
							icon: <Plus className="h-4 w-4" />,
							label: "Add Category",
						},
					],
				}}
			/>

			<PageSection className="!pt-0">
				{successMessage && (
					<div
						role="status"
						className="mb-4 flex items-center justify-between border border-primary/30 bg-primary/5 p-3 text-sm"
					>
						{successMessage}
						<Button
							onClick={() => setSuccessMessage("")}
							size="sm"
							variant="outline"
						>
							<X />
						</Button>
					</div>
				)}

				{error && (
					<div
						role="alert"
						className="mb-4 flex items-center justify-between border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive"
					>
						{error}
						<Button
							onClick={() => setError("")}
							variant="ghost"
							size="sm"
						>
							<X />
						</Button>
					</div>
				)}

				{(isCreating || editingCategory) && (
					<div className="mb-6 border border-border bg-card/50 p-5 sm:p-6">
						<div className="mb-5">
							<div className="serial-number text-muted-foreground mb-1">
								{editingCategory
									? "// EDIT CATEGORY"
									: "// NEW CATEGORY"}
							</div>

							<Heading level={3}>
								{editingCategory
									? "Edit Category"
									: "Create Category"}
							</Heading>
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
									className="border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive"
								>
									{formError}
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
					<div className="border border-dashed border-border p-8 text-center sm:p-16">
						<div className="serial-number text-muted-foreground mb-3">
							NO CATEGORIES
						</div>

						<Heading level={3}>No project categories yet.</Heading>

						<Text className="mt-2 mb-6">
							Create the first category to begin organizing your
							portfolio.
						</Text>

						<Button onClick={openCreateForm}>
							<Plus className="h-4 w-4" />
							Create Category
						</Button>
					</div>
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
												<button
													type="button"
													onClick={() =>
														moveCategory(index, -1)
													}
													disabled={
														index === 0 ||
														!!actionId
													}
													aria-label={`Move ${category.name} up`}
													className="border border-border p-1.5 disabled:cursor-not-allowed disabled:opacity-30 hover:border-primary"
												>
													<ArrowUp className="h-4 w-4" />
												</button>

												<button
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
													className="border-y border-r border-border p-1.5 disabled:cursor-not-allowed disabled:opacity-30 hover:border-primary"
												>
													<ArrowDown className="h-4 w-4" />
												</button>
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
											<button
												type="button"
												onClick={() =>
													toggleActive(category)
												}
												disabled={isBusy}
												className={`px-3 py-1 text-xs font-medium border transition-colors ${
													category.active
														? "border-primary/40 bg-primary/5 text-primary"
														: "border-border text-muted-foreground"
												}`}
											>
												{category.active
													? "Active"
													: "Inactive"}
											</button>
										</div>

										<div className="flex items-center gap-1">
											<button
												type="button"
												onClick={() =>
													openEditForm(category)
												}
												disabled={!!actionId}
												aria-label={`Edit ${category.name}`}
												className="border border-border p-2 hover:border-primary disabled:opacity-30"
											>
												<Pencil className="h-4 w-4" />
											</button>

											<button
												type="button"
												onClick={() =>
													handleDelete(category)
												}
												disabled={isBusy}
												aria-label={`Delete ${category.name}`}
												className="border border-border p-2 hover:border-destructive hover:text-destructive disabled:opacity-30"
											>
												<Trash2 className="h-4 w-4" />
											</button>
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

export default ProjectCategoriesPage;
