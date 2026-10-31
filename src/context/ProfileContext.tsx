"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
}

const defaultProfile: ProfileData = {
  name: "Ye Yint Lin",
  title: "Full-Stack Developer with DevOps skills",
  email: "altairsetsuna146@gmail.com",
  phone: "",
  whatsapp: "",
  location: "Yangon, Myanmar",
  linkedin: "https://www.linkedin.com/in/ye-yint-lin-altair-822a10298/",
  github: "https://github.com/YeYintLin",
};

interface ProfileContextType {
  profile: ProfileData;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  loading: true,
  refreshProfile: async () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      // Check local override cache for instant responsive preview
      const localCached = typeof window !== "undefined" ? localStorage.getItem("portfolio_profile_cache") : null;
      if (localCached) {
        try {
          const parsed = JSON.parse(localCached);
          if (parsed && parsed.name) {
            setProfile(parsed);
          }
        } catch {}
      }

      // Fetch fresh profile from API with cache-busting
      const res = await fetch(`/api/profile?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.name) {
          setProfile(data);
          if (typeof window !== "undefined") {
            localStorage.setItem("portfolio_profile_cache", JSON.stringify(data));
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch profile, using defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProfile();
    }, 0);

    // Listen for storage changes across tabs (e.g. when saved in /admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio_profile_cache" && e.newValue) {
        try {
          setProfile(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
