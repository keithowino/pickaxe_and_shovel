import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LoadHeroCTA, LoadSerialMsg } from "../../components/index.js";
import { Mouse } from "lucide-react";
import PageSection from "../pageSection/PageSection.jsx";
import { Text } from "../../ui/index.js";

const CornerBrackets = () => (
	<>
		<div className="absolute top-6 left-6 h-6 w-6 border-l-2 border-t-2 border-primary/40" />
		<div className="absolute top-6 right-6 h-6 w-6 border-r-2 border-t-2 border-primary/40" />
		<div className="absolute bottom-6 left-6 h-6 w-6 border-l-2 border-b-2 border-primary/40" />
		<div className="absolute bottom-6 right-6 h-6 w-6 border-r-2 border-b-2 border-primary/40" />
	</>
);

const Hero = ({ metadata }) => {
	const {
		callToAction,
		description,
		floatingTools,
		serial,
		showQuickStats = true,
		title,
	} = metadata;

	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
	const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

	// Full-bleed hero only for the flagship (homepage-style) variant;
	// sub-page "spec sheet" heroes take only as much room as their content needs.
	const heightClass = floatingTools
		? "min-h-[100svh]"
		: "min-h-[55svh] sm:min-h-[60svh] lg:min-h-[65svh]";

	return (
		<PageSection
			ref={ref}
			/**
			 * min-h (not max-h), height scales by variant so the About hero doesn't leave a dead gap, !py-0 on the section cancels the new Section default padding since this component manages its own vertical rhythm via the inner
			 */
			className={`relative ${heightClass} overflow-hidden flex items-center !py-0`}
		>
			{/* Blueprint grid */}
			<div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
			<CornerBrackets />

			{floatingTools && (
				<>
					{/* Floating pickaxe — smaller & further back on mobile so it never competes with the heading */}
					<motion.div
						style={{ rotate: rotate1 }}
						className="absolute -top-4 right-2 sm:top-16 sm:right-8 lg:right-28 opacity-[0.08] sm:opacity-15 lg:opacity-20 pointer-events-none select-none z-0 scale-75 sm:scale-100"
					>
						<svg
							width="200"
							height="200"
							viewBox="0 0 48 48"
							fill="none"
						>
							<g transform="rotate(-35 24 24)">
								{/* Handle (shaft) */}
								<rect
									x="22"
									y="10"
									width="4"
									height="26"
									rx="2"
									fill="hsl(var(--primary))"
								/>

								{/* Head (main bar) */}
								<rect
									x="14"
									y="10"
									width="20"
									height="4"
									rx="2"
									fill="hsl(var(--primary))"
								/>

								{/* Left spike */}
								<path
									d="M14 12 L8 16 L14 14 Z"
									fill="hsl(var(--primary))"
								/>

								{/* Right spike */}
								<path
									d="M34 12 L40 16 L34 14 Z"
									fill="hsl(var(--primary))"
								/>
							</g>
						</svg>
					</motion.div>

					{/* Floating shovel */}
					<motion.div
						style={{ rotate: rotate2 }}
						className="absolute bottom-40 right-2 sm:bottom-28 sm:right-8 lg:right-28 opacity-[0.08] sm:opacity-15 lg:opacity-20 pointer-events-none select-none z-0 scale-75 sm:scale-100"
					>
						<svg
							width="160"
							height="160"
							viewBox="0 0 48 48"
							fill="none"
						>
							<g transform="rotate(-35 24 24)">
								{/* Handle grip (D-shape) */}
								<path
									d="M20 4 C16 4, 14 8, 18 10 L30 10 C34 8, 32 4, 28 4 Z"
									fill="hsl(var(--secondary))"
								/>

								{/* Shaft */}
								<rect
									x="22"
									y="10"
									width="4"
									height="18"
									rx="2"
									fill="hsl(var(--secondary))"
								/>

								{/* Metal connector */}
								<rect
									x="21"
									y="28"
									width="6"
									height="3"
									rx="1"
									fill="hsl(var(--secondary))"
								/>

								{/* Blade (more realistic spade shape) */}
								<path
									d="M16 31 C16 46, 32 46, 32 31 C32 29, 28 27, 24 27 C20 27, 16 29, 16 31 Z"
									fill="hsl(var(--secondary))"
								/>

								{/* Blade center ridge */}
								<path
									d="M24 27 L24 36"
									stroke="hsl(var(--background))"
									strokeWidth="0.7"
								/>
							</g>
						</svg>
					</motion.div>
				</>
			)}

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
				<LoadSerialMsg serial={serial} showAccent={floatingTools} />

				{title}

				<Text visuals>{description}</Text>

				{callToAction && <LoadHeroCTA callToAction={callToAction} />}

				{/* Quick stat pills */}
				{showQuickStats && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="mt-10 sm:mt-14 flex flex-wrap gap-2"
					>
						{[
							"Based in Nairobi 🇰🇪",
							"Web → Mechatronics",
							"Available for Projects",
						].map((s) => (
							<span
								key={s}
								className="serial-number border border-border px-3 py-2 bg-card/50"
							>
								{s}
							</span>
						))}
					</motion.div>
				)}
			</div>

			{floatingTools && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground z-10"
				>
					<Mouse className="h-4 w-4 animate-bounce" />
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ duration: 1.6, repeat: Infinity }}
						className="h-8 w-px bg-border"
					/>
				</motion.div>
			)}
		</PageSection>
	);
};

export default Hero;
