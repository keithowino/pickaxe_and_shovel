import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
// import { base44 } from "@/api/base44Client";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { socialLinks } from "../lib/DynamicData";
import MetaDataInsert from "../lib/MetaDataInsert";
import { supabase } from "../lib/supabase";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  // Pre-fill message from URL query (e.g., /contact?msg=Hello%20there!)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg");
    if (msg) setForm((f) => ({ ...f, message: msg })); // URLSearchParams.get() already decodes
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
      // 1. Save message to Supabase DB
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

      // 3. Success state
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div>
      <MetaDataInsert title={"Contact"} />
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none " />

        <div className="relative">
          <div className="serial-number text-primary mb-4">
            // SPEC SHEET · 04
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Start a <span className="text-primary">conversation</span>.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Have a project, idea, or collaboration in mind? Drop a message — I
            read every one.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={onSubmit}
            className="border border-border bg-card/50 p-6 lg:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="serial-number text-muted-foreground block mb-2">
                  NAME *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="serial-number text-muted-foreground block mb-2">
                  EMAIL *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="serial-number text-muted-foreground block mb-2">
                SUBJECT
              </label>
              <input
                value={form.subject}
                onChange={update("subject")}
                placeholder="What's it about?"
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="serial-number text-muted-foreground block mb-2">
                MESSAGE *
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about your project or idea…"
                className="w-full bg-background border border-border px-4 py-3 focus:border-primary outline-none resize-none transition-colors"
              />
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
              <div className="text-sm">
                {status === "success" && (
                  <span className="flex items-center gap-2 text-secondary">
                    <CheckCircle2 className="h-4 w-4" /> Message received. I'll
                    reply soon!
                  </span>
                )}
                {status === "error" && (
                  <span className="text-destructive">
                    Something went wrong. Please try again.
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border border-border p-6 bg-card/50">
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
          </div>
          <div className="border border-border p-6 bg-card/50">
            <Mail className="h-5 w-5 text-primary mb-3" />
            <div className="serial-number text-muted-foreground mb-1">
              EMAIL
            </div>
            <div className="font-heading text-base font-bold">
              {socialLinks.email}
            </div>
          </div>
          <div className="border border-border p-6 bg-card/50">
            <div className="serial-number text-muted-foreground mb-3">
              SOCIAL
            </div>
            <div className="flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <IoLogoGithub className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <IoLogoLinkedin className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <IoLogoTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="border border-border overflow-hidden h-48">
            <iframe
              title="Nairobi map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.7%2C-1.35%2C36.95%2C-1.22&layer=mapnik"
              className="w-full h-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
