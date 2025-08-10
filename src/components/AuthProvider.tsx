"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/utils/supabaseClient";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);
  return <>{children}</>;
}
