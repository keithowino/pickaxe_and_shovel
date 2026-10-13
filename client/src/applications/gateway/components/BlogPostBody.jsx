import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostBody({ content }) {
	return (
		<div className="blog-content max-w-none">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{content || ""}
			</ReactMarkdown>
		</div>
	);
}
