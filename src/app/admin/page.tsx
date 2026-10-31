"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FolderPlus, Trash2, Edit3, Layers, Inbox, LogOut, 
  Globe, GitBranch, Plus, X, ArrowLeft, Loader2, Save 
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

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "techstack" | "messages">("projects");
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [techStack, setTechStack] = useState<TechCategory[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

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

  // Tech stack form states
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState<{ [categoryId: string]: string }>({});

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProj, resTech, resMsg] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/techstack"),
        fetch("/api/messages"),
      ]);

      const dataProj = await resProj.json();
      const dataTech = await resTech.json();
      const dataMsg = await resMsg.json();

      if (Array.isArray(dataProj)) setProjects(dataProj);
      if (Array.isArray(dataTech)) setTechStack(dataTech);
      if (Array.isArray(dataMsg)) setMessages(dataMsg);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
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
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // --- PROJECT ACTIONS ---
  const handleOpenAddProject = () => {
    setIsEditingProject(true);
    setProjectForm({
      title: "",
      description: "",
      image: "/projects/ecommerce_mockup.png",
      tagsInput: "",
      liveUrl: "#",
      githubUrl: "#",
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
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("Error deleting project");
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
    if (!confirm("Are you sure you want to delete this entire category?")) return;

    try {
      const response = await fetch(`/api/techstack?id=${id}`, {
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
    const skillName = newSkillInputs[categoryId];
    if (!skillName || !skillName.trim()) return;

    const category = techStack.find((c) => c.id === categoryId);
    if (!category) return;

    const updatedSkills = [...category.skills, skillName.trim()];

    try {
      const response = await fetch("/api/techstack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: categoryId,
          title: category.title,
          skills: updatedSkills,
        }),
      });

      if (response.ok) {
        setNewSkillInputs((prev) => ({ ...prev, [categoryId]: "" }));
        fetchData();
      }
    } catch {
      alert("Error adding skill");
    }
  };

  const handleDeleteSkill = async (categoryId: string, skillName: string) => {
    try {
      const response = await fetch(`/api/techstack?id=${categoryId}&skill=${encodeURIComponent(skillName)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      alert("Error deleting skill");
    }
  };

  // --- MESSAGES ACTIONS ---
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

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
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B1120] text-[#1A1A1A] dark:text-[#F8FAFC] transition-colors duration-300">
      {/* Top Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
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
            <Loader2 className="w-10 h-10 animate-spin text-[#74A12E]" />
            <span className="text-sm font-light">Loading controller data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Dashboard Sidebar Tabs */}
            <div className="lg:col-span-1 flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab("projects"); setIsEditingProject(false); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "projects" 
                    ? "bg-[#74A12E] text-white shadow-lg shadow-[#74A12E]/10" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FolderPlus className="w-5 h-5" /> Projects
              </button>

              <button
                onClick={() => { setActiveTab("techstack"); setIsEditingProject(false); }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "techstack" 
                    ? "bg-[#74A12E] text-white shadow-lg shadow-[#74A12E]/10" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Layers className="w-5 h-5" /> Tech Stack
              </button>

              <button
                onClick={() => { setActiveTab("messages"); setIsEditingProject(false); }}
                className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-medium transition-all cursor-pointer ${
                  activeTab === "messages" 
                    ? "bg-[#74A12E] text-white shadow-lg shadow-[#74A12E]/10" 
                    : "glass-card hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Inbox className="w-5 h-5" /> Received Messages
                {messages.length > 0 && (
                  <span className={`absolute right-4 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    activeTab === "messages" ? "bg-white text-[#74A12E]" : "bg-[#74A12E] text-white"
                  }`}>
                    {messages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Dashboard Content Panels */}
            <div className="lg:col-span-3">
              {/* --- TAB: PROJECTS --- */}
              {activeTab === "projects" && (
                <div className="flex flex-col gap-6">
                  {isEditingProject ? (
                    <div className="glass-card p-8 shadow-xl">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
                        <h2 className="text-xl font-bold">{projectForm.id ? "Edit Project" : "Add Project"}</h2>
                        <button 
                          onClick={() => setIsEditingProject(false)}
                          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold opacity-70">Project Title</label>
                            <input 
                              type="text" 
                              required
                              value={projectForm.title}
                              onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                              className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold opacity-70">Tags (Comma-separated)</label>
                            <input 
                              type="text" 
                              placeholder="React, Node.js, Express"
                              value={projectForm.tagsInput}
                              onChange={(e) => setProjectForm(p => ({ ...p, tagsInput: e.target.value }))}
                              className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold opacity-70">Description</label>
                          <textarea 
                            required
                            rows={3}
                            value={projectForm.description}
                            onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                            className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light resize-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold opacity-70">Image Path / URL</label>
                          <input 
                            type="text" 
                            required
                            value={projectForm.image}
                            onChange={(e) => setProjectForm(p => ({ ...p, image: e.target.value }))}
                            className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold opacity-70">GitHub URL</label>
                            <input 
                              type="text" 
                              value={projectForm.githubUrl}
                              onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                              className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold opacity-70">Live Demo URL</label>
                            <input 
                              type="text" 
                              value={projectForm.liveUrl}
                              onChange={(e) => setProjectForm(p => ({ ...p, liveUrl: e.target.value }))}
                              className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className="btn-primary py-3 text-base flex items-center justify-center gap-2 cursor-pointer mt-4"
                          style={{ backgroundColor: "#74A12E" }}
                        >
                          <Save className="w-4 h-4" /> Save Project
                        </button>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Portfolio Projects ({projects.length})</h2>
                        <button 
                          onClick={handleOpenAddProject}
                          className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2 cursor-pointer"
                          style={{ backgroundColor: "#74A12E" }}
                        >
                          <Plus className="w-4 h-4" /> Add Project
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.length === 0 ? (
                          <div className="md:col-span-2 text-center p-12 glass-card opacity-50 font-light">
                            No projects found. Add your first project using the button above.
                          </div>
                        ) : (
                          projects.map((p) => (
                            <div key={p.id} className="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-gray-200/50 dark:border-gray-800/50">
                              <div>
                                <div className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                                  <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{p.title}</h3>
                                <p className="text-xs opacity-75 line-clamp-2 mb-4 font-light leading-relaxed">{p.description}</p>
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {p.tags.map(t => (
                                    <span key={t} className="text-[10px] bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded font-medium opacity-80">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-900 pt-4 mt-2">
                                <div className="flex gap-3 text-xs opacity-50 font-light">
                                  <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> Code</span>
                                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Demo</span>
                                </div>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleOpenEditProject(p)}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-950 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                                    title="Edit Project"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer"
                                    title="Delete Project"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* --- TAB: TECH STACK --- */}
              {activeTab === "techstack" && (
                <div className="flex flex-col gap-8">
                  <div className="glass-card p-6 shadow-md">
                    <h2 className="text-lg font-bold mb-4">Add Tech Category</h2>
                    <form onSubmit={handleAddCategory} className="flex gap-4">
                      <input 
                        type="text" 
                        required
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                        placeholder="e.g. Cloud & Server"
                        className="flex-1 bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-light"
                      />
                      <button 
                        type="submit" 
                        className="btn-primary py-3 px-6 text-sm flex items-center gap-2 cursor-pointer shrink-0"
                        style={{ backgroundColor: "#74A12E" }}
                      >
                        <Plus className="w-4 h-4" /> Add Category
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold tracking-tight">Stack Categories ({techStack.length})</h2>

                    {techStack.length === 0 ? (
                      <div className="text-center p-12 glass-card opacity-50 font-light">
                        No categories found. Create a category above.
                      </div>
                    ) : (
                      techStack.map((category) => (
                        <div key={category.id} className="glass-card p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-sm relative">
                          <button 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>

                          <h3 className="text-lg font-bold mb-6 pr-10">{category.title}</h3>

                          {/* Skill Tags Lister */}
                          <div className="flex flex-wrap gap-2 mb-6 min-h-[40px] items-center">
                            {category.skills.length === 0 ? (
                              <span className="text-xs opacity-50 italic font-light">No skills in this category yet.</span>
                            ) : (
                              category.skills.map((skill) => (
                                <span 
                                  key={skill}
                                  className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 bg-gray-100 dark:bg-gray-800 text-[var(--foreground)] border border-gray-200 dark:border-gray-700/50 rounded-full"
                                >
                                  {skill}
                                  <button
                                    onClick={() => handleDeleteSkill(category.id, skill)}
                                    className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500 transition-all cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </span>
                              ))
                            )}
                          </div>

                          {/* Add Skill Form */}
                          <div className="flex gap-3 max-w-md border-t border-gray-100 dark:border-gray-900 pt-4">
                            <input 
                              type="text" 
                              placeholder="Add skill (e.g. Docker)"
                              value={newSkillInputs[category.id] || ""}
                              onChange={(e) => setNewSkillInputs((prev) => ({ ...prev, [category.id]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(category.id); }}
                              className="flex-1 bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#74A12E] focus:border-[#74A12E] transition-all font-light"
                            />
                            <button
                              onClick={() => handleAddSkill(category.id)}
                              className="px-4 py-1.5 bg-[#74A12E] text-white rounded-lg text-xs font-medium hover:scale-105 transition-all cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* --- TAB: RECEIVED MESSAGES --- */}
              {activeTab === "messages" && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold tracking-tight">Received Messages ({messages.length})</h2>

                  <div className="flex flex-col gap-4">
                    {messages.length === 0 ? (
                      <div className="text-center p-12 glass-card opacity-50 font-light">
                        Inbox is empty. Messages submitted from the contact section will show up here.
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div key={m.id} className="glass-card p-6 border border-gray-200/50 dark:border-gray-800/50 relative hover:shadow-md transition-all">
                          <button 
                            onClick={() => handleDeleteMessage(m.id)}
                            className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                            <h3 className="font-bold text-lg">{m.name}</h3>
                            <a 
                              href={`mailto:${m.email}`} 
                              className="text-sm text-[#74A12E] hover:underline"
                            >
                              {m.email}
                            </a>
                            <span className="text-xs opacity-50 font-light">
                              {new Date(m.date).toLocaleString()}
                            </span>
                          </div>

                          <div className="p-4 bg-white/5 dark:bg-black/5 rounded-xl border border-gray-100 dark:border-gray-900 text-sm font-light leading-relaxed whitespace-pre-wrap">
                            {m.message}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
