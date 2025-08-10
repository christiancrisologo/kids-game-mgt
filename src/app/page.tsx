

"use client";

import Link from "next/link";
import { MobileButton } from "@/components/ui/MobileButton";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/users");
    }
  }, [user, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 px-4">
      <div className="w-full max-w-2xl flex flex-col items-center gap-10 py-16">
        {/* Branding/Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg select-none">
            Admin page
          </span>

        </div>

        {/* Call to Action Buttons */}
        {!user && (
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <Link href="/login" className="w-full md:w-auto">
              <MobileButton
                variant="primary"
                size="lg"
                fullWidth
                icon="🔐"
                onClick={() => router.push("/login")}
              >
                Login / Register
              </MobileButton>
            </Link>
            <Link href="/users" className="w-full md:w-auto">
              <MobileButton
                variant="secondary"
                size="lg"
                fullWidth
                icon="👤"
                onClick={() => router.push("/users")}
              >
                View Users
              </MobileButton>
            </Link>
            <Link href="/games" className="w-full md:w-auto">
              <MobileButton
                variant="tile"
                size="lg"
                fullWidth
                icon="🎮"
                onClick={() => router.push("/games")}
              >
                View Games
              </MobileButton>
            </Link>
          </div>
        )}



        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600 w-full">
          &copy; {new Date().getFullYear()} Kids Game Management. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
