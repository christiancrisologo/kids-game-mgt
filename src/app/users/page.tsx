
"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <form onSubmit={handleCreate} className="bg-white rounded shadow p-4 mb-6 w-full max-w-md flex flex-col gap-2">
                <input
                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    type="submit"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Add User"}
                </button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="w-full max-w-md space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white rounded shadow p-4 flex flex-col relative">
                        {editId === user.id ? (
                            <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                                <input
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                                    type="email"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                    required
                                />
                                <input
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                                    type="text"
                                    value={editUsername}
                                    onChange={e => setEditUsername(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <button
                                        className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition text-sm"
                                        type="submit"
                                        disabled={updating}
                                    >
                                        {updating ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition text-sm"
                                        type="button"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <span className="font-semibold">{user.username || user.email}</span>
                                <span className="text-gray-500 text-sm">{user.email}</span>
                                <span className="text-gray-400 text-xs">Joined: {user.created_at?.slice(0, 10)}</span>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        className="text-xs text-blue-500 hover:underline"
                                        onClick={() => startEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-xs text-red-500 hover:underline"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {users.length === 0 && !loading && <div>No users found.</div>}
            </div>
        </div>
    );
}
