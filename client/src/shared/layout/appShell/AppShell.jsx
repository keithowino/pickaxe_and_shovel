import { Fragment } from "react";

export default function AppShell({
	header = null,
	footer = null,
	children,
	className = "",
	mainClassName = "",
}) {
	return (
		<div
			className={`min-h-screen flex flex-col bg-background text-foreground ${className}`.trim()}
		>
			{header && <Fragment>{header}</Fragment>}

			<main className={mainClassName}>{children}</main>

			{footer && <Fragment>{footer}</Fragment>}
		</div>
	);
}
