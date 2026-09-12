import { Link } from "react-router-dom";

import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoLinkedin,
	IoLogoTwitter,
} from "react-icons/io5";

// import { MainLogo } from "../../components/LoadLogo.jsx";
import { Container } from "../../ui/index.js";
import { FeatureGrid } from "../featureGrid/index.js";
import { platform } from "../../config/index.js";

export default function SiteFooter({
	brand = "TassiaQCA",
	description = "",
	columns = [],
	bottomLinks = [],
	copyright,
	className = "",
}) {
	const { social } = platform;
	const columnCols = Math.min(columns.length, 3);

	return (
		<footer
			className={["border-t border-slate-200 bg-card/40", className].join(
				" ",
			)}
		>
			<Container className="py-12">
				<div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.4fr_2fr]">
					<div>
						{/* <div className="mb-4">
							<MainLogo
								iconPD="10"
								iconD="9"
								text={{
									size: "text-2xl",
									color: "text-slate-950",
								}}
								bg="light"
							/>
						</div> */}

						{description && (
							<p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
								{description}
							</p>
						)}

						<div className="mt-6 flex gap-4">
							{[
								{
									href: social.github,
									label: "GitHub",
									Icon: IoLogoGithub,
								},
								{
									href: social.linkedin,
									label: "LinkedIn",
									Icon: IoLogoLinkedin,
								},
								{
									href: social.twitter,
									label: "Twitter",
									Icon: IoLogoTwitter,
								},
								{
									href: social.facebook,
									label: "Facebook",
									Icon: IoLogoFacebook,
								},
								{
									href: social.instagram,
									label: "Instagram",
									Icon: IoLogoInstagram,
								},
							].map(({ href, label, Icon }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noreferrer"
									aria-label={label}
									className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
								>
									<Icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					{columns.length > 0 && (
						<FeatureGrid columns={columnCols}>
							{columns.map((column) => (
								<div key={column.title}>
									<h4 className="serial-number mb-4 text-foreground">
										{column.title}
									</h4>

									{column.content ? (
										<div className="mt-4">
											{column.content}
										</div>
									) : (
										<ul className="mt-4 space-y-2">
											{(column.links || []).map(
												(link) => (
													<li key={link.to}>
														<Link
															to={link.to}
															className="text-sm text-muted-foreground hover:text-primary transition-colors"
														>
															{link.label}
														</Link>
													</li>
												),
											)}
										</ul>
									)}
								</div>
							))}
						</FeatureGrid>
					)}
				</div>

				<div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
					<span>
						{copyright ||
							`© ${new Date().getFullYear()} Keith Owino — All
							systems synthesized.`}
					</span>

					<span className="hidden md:block">
						Made with Pickaxe & Shovel in Nairobi 🇰🇪
					</span>

					{bottomLinks.length > 0 && (
						<nav className="flex flex-wrap gap-x-5 gap-y-2">
							{bottomLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className=" hover:text-slate-900"
								>
									{link.label}
								</Link>
							))}
						</nav>
					)}
				</div>
			</Container>
		</footer>
	);
}
