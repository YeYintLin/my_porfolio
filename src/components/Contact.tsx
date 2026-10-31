"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string; message: string } | null>(null);
  const [profileInfo, setProfileInfo] = useState({
    email: "yeyint2702@gmail.com",
    phone: "+95 9 798 123456",
    whatsapp: "",
    location: "Yangon, Myanmar",
    linkedin: "https://linkedin.com",
    github: "https://github.com/YeYintLin",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.email) {
          setProfileInfo((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
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
      tempErrors.message = "Message should be at least 10 characters";
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLastSubmitted({ ...formData });
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get In Touch
          </h2>
          <div className="w-20 h-1.5 bg-[var(--primary)] rounded-full mx-auto mb-8" />
          <p className="text-lg opacity-70 max-w-2xl mx-auto font-light">
            Have a project in mind, a job opportunity, or just want to chat about engineering? Drop me a line!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-6 p-6 glass-card group hover:bg-[var(--primary)]/5 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${profileInfo.email}`} className="text-lg font-medium hover:text-[var(--primary)] transition-colors">
                  {profileInfo.email}
                </a>
              </div>
            </div>
            
            {profileInfo.phone && (
              <div className="flex items-center gap-6 p-6 glass-card group hover:bg-[var(--primary)]/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${profileInfo.phone}`} className="text-lg font-medium hover:text-[var(--primary)] transition-colors">
                    {profileInfo.phone}
                  </a>
                </div>
              </div>
            )}

            {profileInfo.whatsapp && (
              <div className="flex items-center gap-6 p-6 glass-card group hover:bg-[var(--primary)]/5 transition-colors border-emerald-500/20">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-wider mb-1">WhatsApp</p>
                  <a 
                    href={profileInfo.whatsapp.startsWith("http") ? profileInfo.whatsapp : `https://wa.me/${profileInfo.whatsapp.replace(/[^0-9]/g, "")}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-lg font-medium text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
                  >
                    Chat on WhatsApp 💬
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 p-6 glass-card group hover:bg-[var(--primary)]/5 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Location</p>
                <h4 className="text-lg font-medium">{profileInfo.location}</h4>
              </div>
            </div>

            {/* Social Media Link Icons */}
            <div className="p-6 glass-card flex flex-col gap-4">
              <h4 className="text-sm font-semibold opacity-70 uppercase tracking-wider">Connect with me</h4>
              <div className="flex gap-4">
                {profileInfo.github && (
                  <a 
                    href={profileInfo.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                )}
                {profileInfo.linkedin && (
                  <a 
                    href={profileInfo.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form with dynamic feedback states */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 w-full"
          >
            <div className="glass-card p-8 md:p-10 relative overflow-hidden min-h-[480px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 flex flex-col items-center gap-6"
                  >
                    <CheckCircle2 className="w-20 h-20 text-[var(--primary)] stroke-[1.5]" />
                    <div>
                      <h3 className="text-3xl font-bold mb-3">Message Sent!</h3>
                      <p className="opacity-80 max-w-md mx-auto leading-relaxed font-light">
                        Thank you for reaching out. Your message has been received! I will review it and get back to you shortly.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                      {lastSubmitted && (
                        <a
                          href={`mailto:${profileInfo.email}?subject=${encodeURIComponent(`Portfolio Inquiry from ${lastSubmitted.name}`)}&body=${encodeURIComponent(lastSubmitted.message)}`}
                          className="px-5 py-2.5 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all font-medium text-sm flex items-center gap-2 shadow-sm"
                        >
                          <Mail className="w-4 h-4" /> Open in Email App
                        </a>
                      )}
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-5 py-2.5 rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all font-medium text-sm"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-800 pb-4">
                      Send a Message
                    </h3>

                    {status === "error" && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl font-light flex flex-col gap-2">
                        <span>{errorMessage}</span>
                        <a
                          href={`mailto:${profileInfo.email}?subject=${encodeURIComponent(`Inquiry from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(formData.message || '')}`}
                          className="underline hover:text-red-400 font-medium inline-flex items-center gap-1.5"
                        >
                          Send directly via your email client ({profileInfo.email}) &rarr;
                        </a>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold opacity-70">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full contact-input rounded-xl px-5 py-4 focus:outline-none ${errors.name ? 'border-red-500 ring-1 ring-red-500/20' : ''} transition-all font-light`}
                      />
                      {errors.name && <span className="text-xs text-red-500 mt-1 pl-1">{errors.name}</span>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold opacity-70">Your Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full contact-input rounded-xl px-5 py-4 focus:outline-none ${errors.email ? 'border-red-500 ring-1 ring-red-500/20' : ''} transition-all font-light`}
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-1 pl-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold opacity-70">Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell me about your project..."
                        className={`w-full contact-input rounded-xl px-5 py-4 focus:outline-none ${errors.message ? 'border-red-500 ring-1 ring-red-500/20' : ''} transition-all font-light resize-none`}
                      />
                      {errors.message && <span className="text-xs text-red-500 mt-1 pl-1">{errors.message}</span>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === "sending"}
                      className="btn-primary w-full py-4 text-lg mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs opacity-60 font-light mt-1">
                      Prefer direct email?{" "}
                      <a href={`mailto:${profileInfo.email}`} className="text-[var(--primary)] hover:underline font-medium">
                        {profileInfo.email}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
