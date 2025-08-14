
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [formError, setFormError] = useState("");
    const { loading, error, login, register, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    const validate = () => {
        if (!email || !password) {
            setFormError("Email and password are required.");
            return false;
        }
        // Simple email format check
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setFormError("Please enter a valid email address.");
            return false;
        }
        setFormError("");
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        if (!validate()) return;
        await login(email, password);
        setSuccess("Logged in!");
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        if (!validate()) return;
        await register(email, password);
        setSuccess("Registration email sent!");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-purple-500 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900 overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400 opacity-20 rounded-full blur-2xl animate-pulse animation-delay-1000" />

            <main className="relative z-10 bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-8 max-w-md w-full border border-gray-200 dark:border-gray-800 backdrop-blur-md">
                <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-pink-400 to-purple-500 shadow-lg mb-2 animate-bounce">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center drop-shadow-lg">Login to Your Account</h2>
                    <p className="text-md text-gray-700 dark:text-gray-300 text-center max-w-xs">Access games, users, and scores with your credentials.</p>
                </div>
                <form className="w-full space-y-4" onSubmit={handleLogin} autoComplete="on">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            id="password"
                            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-purple-400 dark:bg-gray-800 dark:text-white"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    {formError && <div className="text-red-500 text-center text-sm">{formError}</div>}
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-center text-sm">{success}</div>}
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                        type="submit"
                        disabled={loading}
                    >
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                        type="button"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">&copy; {new Date().getFullYear()} Kids Game Management App</div>
            </main>
        </div>
    );
}
