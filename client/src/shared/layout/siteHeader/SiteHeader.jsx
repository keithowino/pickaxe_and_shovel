import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PickaxeShovelLogo } from "../../components/index.js";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";
import { Menu, X } from "lucide-react";
// import { MainLogo } from "../../components/index.js";

function getNavLinkClassName({ isActive }) {
	return [
		"relative px-2 py-2 text-sm font-medium transition-colors",
		isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
	].join(" ");
}

export default function SiteHeader({
	brand = "Pickaxe & Shovel",
	brandHref = "/",
	links = [],
	actions = null,
	className = "",
}) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 10);
		fn();
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);

	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname]);

	return (
		<header
			className={[
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? "bg-background/90 backdrop-blur-md border-b border-border"
					: "bg-transparent",
				className,
			].join(" ")}
		>
			<div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* <MainLogo
					iconPD="9"
					iconD="8"
					text={{ size: "text-xl", color: "text-gray-900" }}
					bg="light"
					ref={brandHref}
				/> */}

				{/* Logo */}
				<Link to={brandHref} className="flex items-center gap-3">
					<PickaxeShovelLogo className="hidden sm:block h-9 w-9" />
					<div className="leading-tight">
						<div className="font-heading font-bold text-sm tracking-wider">
							{brand}
						</div>
						<div className="serial-number hidden sm:block text-muted-foreground">
							KE // EST. 2025
						</div>
					</div>
				</Link>

				<nav className="hidden items-center gap-4 lg:flex">
					{links.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={getNavLinkClassName}
						>
							{({ isActive }) => (
								<>
									{link.label}
									{isActive && (
										<motion.span
											layoutId="nav-active"
											className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
										/>
									)}
								</>
							)}
						</NavLink>
					))}
					<div className="ml-4">
						<ThemeToggle />
					</div>
				</nav>

				{/* <div className="hidden items-center gap-3 md:flex">
					{actions}
				</div> */}

				{/* Mobile controls */}
				<div className="flex lg:hidden items-center gap-3">
					<ThemeToggle />
					<button
						onClick={() => setMobileOpen((v) => !v)}
						aria-label="Toggle menu"
						className="p-2 border border-border"
					>
						{mobileOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile drawer */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="lg:hidden bg-background border-b border-border overflow-hidden"
					>
						<nav className="flex flex-col px-6 py-4 gap-1">
							{links.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									end={link.to === "/"}
									className={({ isActive }) =>
										`px-4 py-3 text-sm font-medium border-l-2 hover:bg-muted hover:text-primary ${isActive ? "border-primary text-primary bg-muted" : "border-transparent text-foreground/70"}`
									}
								>
									{link.label}
								</NavLink>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
