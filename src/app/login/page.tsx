
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const { loading, error, login, register, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        await login(email, password);
        setSuccess("Logged in!");
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        await register(email, password);
        setSuccess("Registration email sent!");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-pink-200">
            <form className="bg-white p-8 rounded shadow-md w-80 space-y-4" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Register"}
                </button>
                {error && <div className="text-red-500 text-center">{error}</div>}
                {success && <div className="text-green-500 text-center">{success}</div>}
            </form>
        </div>
    );
}
