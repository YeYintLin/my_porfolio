"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to dashboard (middleware will allow it now since cookie is set)
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#FAFAF8] dark:bg-[#0B1120] text-[#1A1A1A] dark:text-[#F8FAFC] transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#74A12E] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-all mb-8 font-normal"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </Link>

        <div className="glass-card p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#74A12E]/10 flex items-center justify-center mb-4 text-[#74A12E]">
              <Lock className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center">Admin Access</h1>
            <p className="text-sm opacity-60 text-center mt-2 font-normal">
              Enter password to access dashboard controller
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl font-normal">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold opacity-70">Secret Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#74A12E]/30 focus:border-[#74A12E] transition-all font-normal"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#74A12E" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authorizing...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
