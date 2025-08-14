
"use client";

import { useEffect, useState } from "react";

import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { MobileInput } from "@/components/ui/MobileInput";
import { MobileButton } from "@/components/ui/MobileButton";


export default function UsersPage() {
    const { users, loading, error, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editEmail, setEditEmail] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else {
            fetchUsers();
        }
    }, [user, fetchUsers, router]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        await addUser(email, username);
        setEmail("");
        setUsername("");
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        await deleteUser(id);
    };

    type User = {
        id: string;
        email: string;
        username?: string;
        created_at?: string;
    };
    const startEdit = (user: User) => {
        setEditId(user.id);
        setEditEmail(user.email);
        setEditUsername(user.username || "");
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditEmail("");
        setEditUsername("");
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;
        setUpdating(true);
        await updateUser(editId, editEmail, editUsername);
        cancelEdit();
        setUpdating(false);
    };

    return (

                <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-purple-500 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900 overflow-hidden py-10">
                    {/* Animated background shapes */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400 opacity-20 rounded-full blur-2xl animate-pulse animation-delay-1000" />

                    <main className="relative z-10 bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-8 max-w-md w-full border border-gray-200 dark:border-gray-800 backdrop-blur-md">
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-purple-500 shadow-lg mb-2 animate-bounce">
                                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center drop-shadow-lg">Users</h1>
                            <p className="text-md text-gray-700 dark:text-gray-300 text-center max-w-xs">Manage users with a consistent, modern UI.</p>
                        </div>
                        <form onSubmit={handleCreate} className="w-full space-y-4 mb-6">
                            <MobileInput
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={setEmail}
                            />
                            <MobileInput
                                label="Username"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={setUsername}
                            />
                            <MobileButton
                                variant="primary"
                                size="md"
                                fullWidth
                                onClick={() => {}}
                                disabled={creating}
                            >
                                {creating ? "Creating..." : "Add User"}
                            </MobileButton>
                        </form>
                        {loading && <div>Loading...</div>}
                        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                        <div className="w-full space-y-4">
                            {users.map((user) => (
                                <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col relative border border-gray-200 dark:border-gray-700">
                                    {editId === user.id ? (
                                        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                                            <MobileInput
                                                type="email"
                                                value={editEmail}
                                                onChange={setEditEmail}
                                            />
                                            <MobileInput
                                                type="text"
                                                value={editUsername}
                                                onChange={setEditUsername}
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <MobileButton
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => {}}
                                                    disabled={updating}
                                                >
                                                    {updating ? "Saving..." : "Save"}
                                                </MobileButton>
                                                <MobileButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </MobileButton>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <span className="font-semibold text-lg">{user.username || user.email}</span>
                                            <span className="text-gray-500 text-sm">{user.email}</span>
                                            <span className="text-gray-400 text-xs">Joined: {user.created_at?.slice(0, 10)}</span>
                                            <div className="absolute top-2 right-2 flex gap-2">
                                                <MobileButton
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => startEdit(user)}
                                                >
                                                    Edit
                                                </MobileButton>
                                                <MobileButton
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </MobileButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {users.length === 0 && !loading && <div className="text-center text-gray-500">No users found.</div>}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">&copy; {new Date().getFullYear()} Kids Game Management App</div>
                    </main>
                </div>
    );
}
