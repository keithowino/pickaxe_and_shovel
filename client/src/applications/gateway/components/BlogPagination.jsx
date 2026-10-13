import { Button } from "../../../shared/index.js";

export default function BlogPagination({ page, totalPages, onChange }) {
	if (totalPages <= 1) return null;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav
			className="flex items-center justify-center gap-2 mt-12 flex-wrap"
			aria-label="Pagination"
		>
			<Button
				onClick={() => onChange(page - 1)}
				disabled={page <= 1}
				variant="outline"
			>
				← PREV
			</Button>
			{pages.map((p) => (
				<Button
					key={p}
					onClick={() => onChange(p)}
					variant={p === page ? "primary" : "outline"}
				>
					{p}
				</Button>
			))}
			<Button
				onClick={() => onChange(page + 1)}
				disabled={page >= totalPages}
				variant="outline"
			>
				NEXT →
			</Button>
		</nav>
	);
}
