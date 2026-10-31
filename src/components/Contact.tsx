"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";

export default function Contact() {
  const { profile: profileInfo } = useProfile();
  const contactEmail = SITE_CONFIG.email;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const loadedAtRef = useRef<number>(0);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _gotcha: honeypot,
          loadedAt: loadedAtRef.current,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection or email directly.");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Direct Communication
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            Get In Touch
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto text-pretty">
            Available for full-time remote developer roles and freelance projects starting December 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Verified Contact Info (No placeholder phone number) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card with Copy-to-Clipboard */}
            <div className="portfolio-card p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:border-[var(--accent)]">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="type-eyebrow text-[var(--muted)]">
                    Email Address
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                    title="Copy email address"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-base font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors break-all"
                >
                  {contactEmail}
                </a>
                <p className="type-body text-sm text-[var(--muted)] mt-1">
                  Direct responses within 24 hours.
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="portfolio-card p-5 sm:p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="type-eyebrow text-[var(--muted)] block mb-1">
                  Location & Timezone
                </span>
                <p className="text-base font-semibold text-[var(--text)]">
                  {profileInfo.location || SITE_CONFIG.location}
                </p>
                <p className="type-body text-sm text-[var(--muted)] mt-1">
                  {SITE_CONFIG.timezone} • Remote across global timezones
                </p>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="portfolio-card p-5 sm:p-6">
              <span className="type-eyebrow text-[var(--muted)] block mb-3">
                Professional Profiles
              </span>
              <div className="flex gap-3">
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-sans font-medium text-center text-[var(--text)] hover:border-[var(--accent)] transition-colors inline-flex items-center justify-center gap-2"
                  aria-label="Visit GitHub Profile"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  GitHub
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-sans font-medium text-center text-[var(--text)] hover:border-[var(--accent)] transition-colors inline-flex items-center justify-center gap-2"
                  aria-label="Visit LinkedIn Profile"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Engineer's Friendly Note */}
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="type-body text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Whether you want to discuss full-stack web architecture, containerization and VPS deployments, or explore working together, I look forward to connecting with you.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="portfolio-card p-6 sm:p-8">
              {/* Aria-live status region for assistive technologies */}
              <div aria-live="polite" className="sr-only">
                {status === "sending" && "Sending your message..."}
                {status === "success" && "Your message has been sent successfully."}
                {status === "error" && errorMessage}
              </div>

              {status === "success" ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)]">Message Sent</h3>
                  <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                    Thank you for reaching out. Your inquiry has been received and I will reply to you at your email address shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn-secondary text-xs px-4 py-2 mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Visually hidden honeypot: off-screen, aria-hidden, tabIndex -1, autocomplete off */}
                  <div className="sr-only-honeypot" aria-hidden="true">
                    <label htmlFor="website_hp">Do not fill this field</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="_gotcha"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">{errorMessage}</p>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="underline hover:text-red-400 mt-0.5 inline-block"
                        >
                          Send directly via email ({contactEmail})
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={`contact-input w-full ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`contact-input w-full ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, timeline, or position requirements..."
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      className={`contact-input w-full resize-y ${errors.message ? "border-red-500" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1" role="alert">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="btn-cta w-full"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--cta-fg)]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
