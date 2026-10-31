"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FolderPlus, Trash2, Edit3, Layers, Inbox, LogOut, 
  Globe, GitBranch, Plus, X, ArrowLeft, Loader2, Save,
  Briefcase, GraduationCap, User, Phone, Mail, MapPin, CheckCircle2, Image as ImageIcon
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

interface TechCategory {
  id: string;
  title: string;
  skills: string[];
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface TimelineItem {
  id: string;
  type: "work" | "edu";
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "experience" | "profile" | "techstack" | "messages">("projects");
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [techStack, setTechStack] = useState<TechCategory[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [experiences, setExperiences] = useState<TimelineItem[]>([]);
  const [education, setEducation] = useState<TimelineItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Ye Yint Lin",
    title: "Full-Stack Developer & DevOps Specialist",
    email: "altairsetsuna146@gmail.com",
    phone: "",
    whatsapp: "",
    location: "Yangon, Myanmar",
    linkedin: "https://www.linkedin.com/in/ye-yint-lin-altair-822a10298/",
    github: "https://github.com/YeYintLin",
  });

  // Project form states
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<{
    id?: string;
    title: string;
    description: string;
    image: string;
    tagsInput: string;
    liveUrl: string;
    githubUrl: string;
  }>({
    title: "",
    description: "",
    image: "",
    tagsInput: "",
    liveUrl: "",
    githubUrl: "",
  });

  // Timeline form state (Experience / Education)
  const [isEditingTimeline, setIsEditingTimeline] = useState(false);
  const [timelineForm, setTimelineForm] = useState<{
    id?: string;
    type: "work" | "edu";
    title: string;
    subtitle: string;
    date: string;
    description: string;
  }>({
    type: "work",
    title: "",
    subtitle: "",
    date: "",
    description: "",
  });

  // Tech stack form states
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState<{ [categoryId: string]: string }>({});

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const ts = Date.now();
      const [resProj, resTech, resMsg, resExp, resProf] = await Promise.all([
        fetch(`/api/projects?t=${ts}`, { cache: "no-store" }),
        fetch(`/api/techstack?t=${ts}`, { cache: "no-store" }),
        fetch(`/api/messages?t=${ts}`, { cache: "no-store" }),
        fetch(`/api/experience?t=${ts}`, { cache: "no-store" }),
        fetch(`/api/profile?t=${ts}`, { cache: "no-store" }),
      ]);

      if (resProj.ok) setProjects(await resProj.json());
      if (resTech.ok) setTechStack(await resTech.json());
      if (resMsg.ok) setMessages(await resMsg.json());
      if (resExp.ok) {
        const expData = await resExp.json();
        setExperiences(expData.experiences || []);
        setEducation(expData.education || []);
      }
      if (resProf.ok) {
        const profData = await resProf.json();
        if (profData.name) setProfile(profData);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  // --- PROJECTS ACTIONS ---
  const handleOpenAddProject = () => {
    setIsEditingProject(true);
    setProjectForm({
      title: "",
      description: "",
      image: "/projects/ecommerce_mockup.png",
      tagsInput: "React, Next.js, Node.js",
      liveUrl: "#",
      githubUrl: "https://github.com/YeYintLin",
    });
  };

  const handleOpenEditProject = (p: Project) => {
    setIsEditingProject(true);
    setProjectForm({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      tagsInput: p.tags.join(", "),
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = projectForm.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      id: projectForm.id,
      title: projectForm.title,
      description: projectForm.description,
      image: projectForm.image,
      tags,
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
    };

    const method = projectForm.id ? "PUT" : "POST";

    try {
      const response = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsEditingProject(false);
        fetchData();
      } else {
        const err = await response.json();
        alert(err.message || "Failed to save project");
      }
    } catch {
      alert("Error saving project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      alert("Error deleting project");
    }
  };

  // --- TIMELINE (EXPERIENCE & EDUCATION) ACTIONS ---
  const handleOpenAddTimeline = (type: "work" | "edu") => {
    setIsEditingTimeline(true);
    setTimelineForm({
      type,
      title: "",
      subtitle: "",
      date: "",
      description: "",
    });
  };

  const handleOpenEditTimeline = (item: TimelineItem) => {
    setIsEditingTimeline(true);
    setTimelineForm({
      id: item.id,
      type: item.type,
      title: item.title,
      subtitle: item.subtitle,
      date: item.date,
      description: item.description,
    });
  };

  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timelineForm),
      });

      if (res.ok) {
        setIsEditingTimeline(false);
        fetchData();
      } else {
        alert("Failed to save entry");
      }
    } catch {
      alert("Error saving timeline entry");
    }
  };

  const handleDeleteTimeline = async (id: string, type: "work" | "edu") => {
    if (!confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`/api/experience?id=${id}&type=${type}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      alert("Error deleting entry");
    }
  };

  // --- PROFILE & CONTACT ACTIONS ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio_profile_cache", JSON.stringify(profile));
          window.dispatchEvent(new Event("storage"));
        }
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Failed to save profile");
      }
    } catch {
      alert("Error updating profile");
    }
  };

  // --- TECH STACK ACTIONS ---
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) return;

    try {
      const response = await fetch("/api/techstack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newCategoryTitle.trim() }),
      });

      if (response.ok) {
        setNewCategoryTitle("");
        fetchData();
      }
    } catch {
      alert("Error adding category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category and its skills?")) return;

    try {
      const response = await fetch(`/api/techstack?categoryId=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      alert("Error deleting category");
    }
  };

  const handleAddSkill = async (categoryId: string) => {
    const skill = newSkillInputs[categoryId]?.trim();
    if (!skill) return;

    try {
      const response = await fetch("/api/techstack", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, skill, action: "add" }),
      });

      if (response.ok) {
        setNewSkillInputs((prev) => ({ ...prev, [categoryId]: "" }));
        fetchData();
      }
    } catch {
      alert("Error adding skill");
    }
  };

  const handleDeleteSkill = async (categoryId: string, skill: string) => {
    try {
      const response = await fetch("/api/techstack", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, skill, action: "remove" }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      alert("Error removing skill");
    }
  };

  // --- MESSAGES ACTIONS ---
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      alert("Error deleting message");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] dark:bg-[#070B14] text-[#192019] dark:text-[#F1F5F9] transition-colors duration-300">
      {/* Top Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0E1626]/70 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Portfolio Admin Control Center</h1>
              <p className="text-xs opacity-60">Edit projects, experience, contact info, and view inquiries without coding</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 opacity-50">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
            <span className="text-sm font-normal">Loading admin controller...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Dashboard Sidebar Tabs */}
            <div className="lg:col-span-1 flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab("projects"); setIsEditingProject(false); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "projects" 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FolderPlus className="w-5 h-5" /> Projects ({projects.length})
              </button>

              <button
                onClick={() => { setActiveTab("experience"); setIsEditingTimeline(false); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "experience" 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Briefcase className="w-5 h-5" /> Experience & Education
              </button>

              <button
                onClick={() => { setActiveTab("profile"); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "profile" 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <User className="w-5 h-5" /> Profile & Contact Info
              </button>

              <button
                onClick={() => { setActiveTab("techstack"); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "techstack" 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Layers className="w-5 h-5" /> Tech Stack Skills
              </button>

              <button
                onClick={() => { setActiveTab("messages"); }}
                className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "messages" 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Inbox className="w-5 h-5" /> Received Inquiries
                {messages.length > 0 && (
                  <span className={`absolute right-4 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    activeTab === "messages" ? "bg-white text-gray-900" : "bg-[var(--primary)] text-white"
                  }`}>
                    {messages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* ================= PROJECTS TAB ================= */}
              {activeTab === "projects" && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold">Featured Projects</h2>
                      <p className="text-sm opacity-60">Add new showcase projects, attach pictures, and manage links</p>
                    </div>
                    {!isEditingProject && (
                      <button
                        onClick={handleOpenAddProject}
                        className="btn-primary flex items-center gap-2 py-2.5 px-5 text-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Project
                      </button>
                    )}
                  </div>

                  {isEditingProject ? (
                    <div className="glass-card p-8 rounded-3xl">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-bold">
                          {projectForm.id ? "Edit Project" : "Add New Project"}
                        </h3>
                        <button
                          onClick={() => setIsEditingProject(false)}
                          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Project Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. Next.js SaaS Platform"
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            required
                            rows={4}
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            placeholder="Explain the technical challenges, architecture, and features..."
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[var(--primary)]" /> Image URL or Local Path
                          </label>
                          <input
                            type="text"
                            required
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            placeholder="e.g. /projects/cms_architecture.png or https://imgur.com/your-image.png"
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                          {projectForm.image && (
                            <div className="mt-3 flex items-center gap-4">
                              <span className="text-xs opacity-50">Preview:</span>
                              <div className="h-20 w-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-black/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Tags & Languages (Comma Separated)</label>
                          <input
                            type="text"
                            value={projectForm.tagsInput}
                            onChange={(e) => setProjectForm({ ...projectForm, tagsInput: e.target.value })}
                            placeholder="React, TypeScript, Docker, Node.js, MongoDB"
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                            <input
                              type="text"
                              value={projectForm.liveUrl}
                              onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                              placeholder="https://yourdemo.com or #"
                              className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">GitHub Repository URL</label>
                            <input
                              type="text"
                              value={projectForm.githubUrl}
                              onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                              placeholder="https://github.com/YeYintLin/..."
                              className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                          <button
                            type="button"
                            onClick={() => setIsEditingProject(false)}
                            className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn-primary py-2.5 px-8 text-sm flex items-center gap-2 cursor-pointer">
                            <Save className="w-4 h-4" /> Save Project
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((p) => (
                        <div key={p.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                          <div>
                            <div className="h-40 rounded-xl overflow-hidden mb-4 bg-black/10">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                            <p className="text-xs opacity-70 leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {p.tags.map((tag) => (
                                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                              {p.githubUrl && p.githubUrl !== "#" && (
                                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                  <GitBranch className="w-4 h-4" />
                                </a>
                              )}
                              {p.liveUrl && p.liveUrl !== "#" && (
                                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                  <Globe className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleOpenEditProject(p)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg cursor-pointer">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= EXPERIENCE & EDUCATION TAB ================= */}
              {activeTab === "experience" && (
                <div className="space-y-12">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold">Work Experience & Career</h2>
                        <p className="text-sm opacity-60">Manage your current roles, freelance timeline, and past jobs</p>
                      </div>
                      {!isEditingTimeline && (
                        <button
                          onClick={() => handleOpenAddTimeline("work")}
                          className="btn-primary flex items-center gap-2 py-2.5 px-5 text-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Experience
                        </button>
                      )}
                    </div>

                    {isEditingTimeline ? (
                      <div className="glass-card p-8 rounded-3xl mb-8">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                          <h3 className="text-xl font-bold">
                            {timelineForm.id ? "Edit Entry" : `Add New ${timelineForm.type === "work" ? "Experience" : "Education"}`}
                          </h3>
                          <button onClick={() => setIsEditingTimeline(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleSaveTimeline} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Category</label>
                              <select
                                value={timelineForm.type}
                                onChange={(e) => setTimelineForm({ ...timelineForm, type: e.target.value as "work" | "edu" })}
                                className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                              >
                                <option value="work">Work Experience</option>
                                <option value="edu">Education</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Date / Duration</label>
                              <input
                                type="text"
                                required
                                value={timelineForm.date}
                                onChange={(e) => setTimelineForm({ ...timelineForm, date: e.target.value })}
                                placeholder="e.g. Jan 19, 2026 - Present"
                                className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Title / Degree</label>
                              <input
                                type="text"
                                required
                                value={timelineForm.title}
                                onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                                placeholder="e.g. Junior Full Stack Developer"
                                className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Subtitle / Company / Institution</label>
                              <input
                                type="text"
                                required
                                value={timelineForm.subtitle}
                                onChange={(e) => setTimelineForm({ ...timelineForm, subtitle: e.target.value })}
                                placeholder="e.g. Full-Time or University Name"
                                className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Key Highlights / Description</label>
                            <textarea
                              rows={3}
                              value={timelineForm.description}
                              onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                              placeholder="Brief description of responsibilities, achievements, or coursework..."
                              className="w-full px-4 py-3 rounded-xl contact-input outline-none resize-none"
                            />
                          </div>

                          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                              type="button"
                              onClick={() => setIsEditingTimeline(false)}
                              className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn-primary py-2.5 px-8 text-sm flex items-center gap-2 cursor-pointer">
                              <Save className="w-4 h-4" /> Save Timeline Entry
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}

                    {/* Experience List */}
                    <div className="space-y-4 mb-12">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="glass-card p-6 rounded-2xl flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-2 inline-block">
                              {exp.date}
                            </span>
                            <h4 className="text-lg font-bold">{exp.title}</h4>
                            <p className="text-sm opacity-75 font-medium mb-2">{exp.subtitle}</p>
                            <p className="text-xs opacity-70 leading-relaxed font-normal">{exp.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => handleOpenEditTimeline(exp)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg cursor-pointer">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteTimeline(exp.id, "work")} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Education List */}
                    <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[var(--primary)]" /> Education History
                        </h3>
                        <p className="text-sm opacity-60">Degrees, certifications, and university studies</p>
                      </div>
                      {!isEditingTimeline && (
                        <button
                          onClick={() => handleOpenAddTimeline("edu")}
                          className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:border-[var(--primary)] text-xs font-medium cursor-pointer"
                        >
                          + Add Education
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id} className="glass-card p-6 rounded-2xl flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-2 inline-block">
                              {edu.date}
                            </span>
                            <h4 className="text-lg font-bold">{edu.title}</h4>
                            <p className="text-sm opacity-75 font-medium mb-2">{edu.subtitle}</p>
                            <p className="text-xs opacity-70 leading-relaxed font-normal">{edu.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => handleOpenEditTimeline(edu)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg cursor-pointer">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteTimeline(edu.id, "edu")} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= PROFILE & CONTACT TAB ================= */}
              {activeTab === "profile" && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Profile & Contact Channels</h2>
                    <p className="text-sm opacity-60">Update your email, phone, location, WhatsApp, and social accounts</p>
                  </div>

                  <div className="glass-card p-8 rounded-3xl">
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      {saveSuccess && (
                        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Profile and contact details successfully updated!
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            required
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Professional Title</label>
                          <input
                            type="text"
                            required
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-[var(--primary)]" /> Contact Email
                          </label>
                          <input
                            type="email"
                            required
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-[var(--primary)]" /> Phone Number
                          </label>
                          <input
                            type="text"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="+95 9 123 456 789"
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <span className="text-emerald-500">💬</span> WhatsApp Number or Direct Link
                          </label>
                          <input
                            type="text"
                            value={profile.whatsapp}
                            onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                            placeholder="e.g. +959... or https://wa.me/..."
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[var(--primary)]" /> Location
                          </label>
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            placeholder="Yangon, Myanmar"
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4 text-[var(--primary)]" /> GitHub Profile URL
                          </label>
                          <input
                            type="text"
                            value={profile.github}
                            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-[var(--primary)]" /> LinkedIn Profile URL
                          </label>
                          <input
                            type="text"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl contact-input outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
                        <button type="submit" className="btn-primary py-3 px-8 text-sm flex items-center gap-2 cursor-pointer">
                          <Save className="w-4 h-4" /> Save Contact Details
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ================= TECH STACK TAB ================= */}
              {activeTab === "techstack" && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold">Tech Stack Categories</h2>
                      <p className="text-sm opacity-60">Add and customize tools, frameworks, and programming skills</p>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold mb-4">Add New Category</h3>
                    <form onSubmit={handleAddCategory} className="flex gap-4">
                      <input
                        type="text"
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                        placeholder="e.g. Cloud & Monitoring"
                        className="flex-1 px-4 py-3 rounded-xl contact-input outline-none"
                      />
                      <button type="submit" className="btn-primary px-6 text-sm flex items-center gap-2 cursor-pointer">
                        <Plus className="w-4 h-4" /> Add Category
                      </button>
                    </form>
                  </div>

                  <div className="space-y-6">
                    {techStack.map((category) => (
                      <div key={category.id} className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">{category.title}</h3>
                          <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.skills.map((skill) => (
                            <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10">
                              {skill}
                              <button onClick={() => handleDeleteSkill(category.id, skill)} className="hover:text-red-500 cursor-pointer">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkillInputs[category.id] || ""}
                            onChange={(e) => setNewSkillInputs({ ...newSkillInputs, [category.id]: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleAddSkill(category.id)}
                            placeholder="Add a new skill (e.g. Kubernetes)..."
                            className="flex-1 px-3 py-2 rounded-lg contact-input text-xs outline-none"
                          />
                          <button onClick={() => handleAddSkill(category.id)} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold cursor-pointer">
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= MESSAGES TAB ================= */}
              {activeTab === "messages" && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Received Inquiries ({messages.length})</h2>
                    <p className="text-sm opacity-60">Messages submitted through the portfolio contact form</p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="glass-card p-12 text-center rounded-2xl opacity-60">
                      <Inbox className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No inquiries received yet. Any messages from the contact form will appear here!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div key={m.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h4 className="font-bold text-lg">{m.name}</h4>
                              <a href={`mailto:${m.email}`} className="text-xs text-[var(--primary)] hover:underline">
                                {m.email}
                              </a>
                            </div>
                            <span className="text-[11px] opacity-50 font-normal">{m.date}</span>
                          </div>
                          <p className="text-sm opacity-85 leading-relaxed bg-black/5 dark:bg-black/20 p-4 rounded-xl mb-4 font-normal whitespace-pre-wrap">
                            {m.message}
                          </p>
                          <div className="flex justify-end">
                            <button onClick={() => handleDeleteMessage(m.id)} className="text-xs text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" /> Delete Inquiry
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
