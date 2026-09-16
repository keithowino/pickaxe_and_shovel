import { useState, useEffect } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
// import { base44 } from "@/api/base44Client";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import MetaDataInsert from "../../../lib/MetaDataInsert";
import { supabase } from "../../../lib/supabase.js";
import { platform } from "../../../shared/config/index.js";
import {
	Button,
	FeatureGrid,
	Form,
	FormField,
	FormInput,
	FormLabel,
	FormReaction,
	Hero,
	LoadHeroTitle,
	PageSection,
	Paper,
	SectionHeader,
} from "../../../shared/index.js";

const heroTitle = () => {
	return (
		<>
			Start a <span className="text-primary">conversation</span>.
		</>
	);
};

const ContactPage = () => {
	const { contact, social } = platform;

	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState("idle");

	/**
	 * Pre-fill message from URL query (e.g., /contact?msg=Hello%20there!)
	 */
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const msg = params.get("msg");

		/**
		 * URLSearchParams.get() already decodes
		 */
		if (msg) setForm((f) => ({ ...f, message: msg }));
	}, []);

	const update = (k) => (e) =>
		setForm((f) => ({ ...f, [k]: e.target.value }));

	const onSubmit = async (e) => {
		e.preventDefault();
		// setStatus("loading");
		// try {
		//   await base44.entities.ContactMessage.create(form);
		//   setStatus("success");
		//   setForm({ name: "", email: "", subject: "", message: "" });
		// } catch {
		//   setStatus("error");
		// }

		setStatus("loading");

		try {
			const { error: dbError } = await supabase
				.from("contact_messages")
				.insert([form]);

			if (dbError) throw dbError;

			// 2. Trigger Edge Function (notification)
			// const res = await fetch(
			//   "https://amzeqyagftwisswqznze.functions.supabase.co/notify-contact",
			//   {
			//     method: "POST",
			//     headers: {
			//       "Content-Type": "application/json",
			//     },
			//     body: JSON.stringify(form),
			//   },
			// );

			const res = await fetch(
				"https://amzeqyagftwisswqznze.functions.supabase.co/notify-contact",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
						Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
					},
					body: JSON.stringify(form),
				},
			);

			if (!res.ok) {
				throw new Error("Notification function failed");
			}

			setStatus("success");
			setForm({ name: "", email: "", subject: "", message: "" });
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
	};

	const socialLinks = [
		{
			to: social.github,
			label: "GitHub",
			icon: <IoLogoGithub className="h-4 w-4" />,
		},
		{
			to: social.linkedin,
			label: "LinkedIn",
			icon: <IoLogoLinkedin className="h-4 w-4" />,
		},
		{
			to: social.twitter,
			label: "Twitter",
			icon: <IoLogoTwitter className="h-4 w-4" />,
		},
	];

	return (
		<div>
			<MetaDataInsert title={"Contact"} />
			<Hero
				metadata={{
					floatingTools: false,
					serial: "// SPEC SHEET · 04",
					title: (
						<LoadHeroTitle
							metadata={{
								className: "",
								title: heroTitle,
							}}
						/>
					),
					description:
						"Have a project, idea, or collaboration in mind? Drop a message — I read every one.",
				}}
			/>

			<PageSection>
				<FeatureGrid>
					<div className="lg:col-span-2">
						<SectionHeader
							serial="// TRANSMISSION"
							title=""
							align="left"
						/>
						<Form onSubmit={onSubmit}>
							<FeatureGrid columns={2}>
								<FormField>
									<FormLabel
										htmlFor="contact-name"
										required={{ isRequired: true }}
									>
										NAME
									</FormLabel>
									<FormInput
										id="contact-name"
										required
										value={form.name}
										onChange={update("name")}
										placeholder="Your name"
										autoComplete="name"
									/>
								</FormField>

								<FormField>
									<FormLabel
										htmlFor="contact-email"
										required={{ isRequired: true }}
									>
										EMAIL
									</FormLabel>
									<FormInput
										id="contact-email"
										required
										type="email"
										value={form.email}
										onChange={update("email")}
										placeholder="you@example.com"
										autoComplete="email"
									/>
								</FormField>
							</FeatureGrid>

							<FormField>
								<FormLabel htmlFor="contact-subject">
									SUBJECT
								</FormLabel>
								<FormInput
									id="contact-subject"
									value={form.subject}
									onChange={update("subject")}
									placeholder="What's it about?"
								/>
							</FormField>

							<FormField>
								<FormLabel
									htmlFor="contact-message"
									required={{ isRequired: true }}
								>
									MESSAGE
								</FormLabel>
								<FormInput
									id="contact-message"
									as="textarea"
									required
									rows={6}
									value={form.message}
									onChange={update("message")}
									placeholder="Tell me about your project or idea…"
								/>
							</FormField>

							<div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
								<div className="text-sm min-h-[1.25rem]">
									{status === "success" && (
										<FormReaction
											reaction={{
												success: status,
												msg: "Message received. I'll reply soon!",
											}}
										/>
									)}
									{status === "error" && (
										<FormReaction
											reaction={{
												success: status,
												msg: "Something went wrong. Please try again.",
											}}
										/>
									)}
								</div>

								<Button
									type="submit"
									disabled={status === "loading"}
									fullWidthMobile
								>
									{status === "loading" ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Send className="h-4 w-4" />
									)}
									Send Message
								</Button>
							</div>
						</Form>
					</div>

					{/* Sidebar */}
					<div className="space-y-4">
						<Paper>
							<MapPin className="h-5 w-5 text-primary mb-3" />
							<div className="serial-number text-muted-foreground mb-1">
								LOCATION
							</div>
							<div className="font-heading text-lg font-bold">
								Nairobi, Kenya 🇰🇪
							</div>
							<div className="text-sm text-muted-foreground mt-1">
								Available worldwide — remote first.
							</div>
						</Paper>

						<Paper interactive>
							<Mail className="h-5 w-5 text-primary mb-3" />
							<div className="serial-number text-muted-foreground mb-1">
								EMAIL
							</div>
							<a
								href={`mailto:${contact.email}`}
								className="font-heading text-base font-bold hover:text-primary transition-colors break-all"
							>
								{contact.email}
							</a>
						</Paper>

						<Paper interactive>
							<div className="serial-number text-muted-foreground mb-3">
								SOCIAL
							</div>
							<div className="flex gap-2">
								{socialLinks.map((r) => (
									<a
										key={r.label}
										href={r.to}
										target="_blank"
										rel="noreferrer"
										aria-label={r.label}
										className="p-2.5 border border-border hover:border-primary hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
									>
										{r.icon}
									</a>
								))}
							</div>
						</Paper>

						<div className="border border-border overflow-hidden">
							<div className="serial-number text-muted-foreground px-4 py-2 border-b border-border bg-card/50">
								// LOCATION MAP
							</div>
							<div className="h-40 sm:h-48">
								<iframe
									title="Nairobi map"
									src="https://www.openstreetmap.org/export/embed.html?bbox=36.7%2C-1.35%2C36.95%2C-1.22&layer=mapnik"
									className="w-full h-full grayscale"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</FeatureGrid>
			</PageSection>
		</div>
	);
};

export default ContactPage;
