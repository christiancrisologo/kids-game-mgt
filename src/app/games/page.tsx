
"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function GamesPage() {
    const { games, loading, error, fetchGames, addGame, updateGame, deleteGame } = useGameStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else {
            fetchGames();
        }
    }, [user, fetchGames, router]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        await addGame(name, description);
        setName("");
        setDescription("");
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        await deleteGame(id);
    };

    type Game = {
        id: string;
        name: string;
        description?: string;
        created_at?: string;
    };
    const startEdit = (game: Game) => {
        setEditId(game.id);
        setEditName(game.name);
        setEditDescription(game.description || "");
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName("");
        setEditDescription("");
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;
        setUpdating(true);
        await updateGame(editId, editName, editDescription);
        cancelEdit();
        setUpdating(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">Games</h1>
            <form onSubmit={handleCreate} className="bg-white rounded shadow p-4 mb-6 w-full max-w-md flex flex-col gap-2">
                <input
                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="text"
                    placeholder="Game Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                    type="submit"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Add Game"}
                </button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="w-full max-w-md space-y-4">
                {games.map((game) => (
                    <div key={game.id} className="bg-white rounded shadow p-4 flex flex-col relative">
                        {editId === game.id ? (
                            <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                                <input
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    required
                                />
                                <input
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring"
                                    type="text"
                                    value={editDescription}
                                    onChange={e => setEditDescription(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <button
                                        className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700 transition text-sm"
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
                                <span className="font-semibold">{game.name}</span>
                                <span className="text-gray-500 text-sm">{game.description}</span>
                                <span className="text-gray-400 text-xs">Created: {game.created_at?.slice(0, 10)}</span>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        className="text-xs text-blue-500 hover:underline"
                                        onClick={() => startEdit(game)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-xs text-red-500 hover:underline"
                                        onClick={() => handleDelete(game.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {games.length === 0 && !loading && <div>No games found.</div>}
            </div>
        </div>
    );
}
