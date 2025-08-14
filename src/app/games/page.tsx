
"use client";

import { useEffect, useState } from "react";

import { useGameStore } from "@/store/gameStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { MobileInput } from "@/components/ui/MobileInput";
import { MobileButton } from "@/components/ui/MobileButton";


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

        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-purple-500 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900 overflow-hidden py-10">
            {/* Animated background shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400 opacity-20 rounded-full blur-2xl animate-pulse animation-delay-1000" />

            <main className="relative z-10 bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-8 max-w-md w-full border border-gray-200 dark:border-gray-800 backdrop-blur-md">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 shadow-lg mb-2 animate-bounce">
                        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21m5.25-4l.75 4m-7.5-8h10.5M12 3v4m0 0l-2 2m2-2l2 2" />
                        </svg>
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center drop-shadow-lg">Games</h1>
                    <p className="text-md text-gray-700 dark:text-gray-300 text-center max-w-xs">Manage your games with a consistent, modern UI.</p>
                </div>
                <form onSubmit={handleCreate} className="w-full space-y-4 mb-6">
                    <MobileInput
                        label="Game Name"
                        type="text"
                        placeholder="Enter game name"
                        value={name}
                        onChange={setName}
                    />
                    <MobileInput
                        label="Description"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={setDescription}
                    />
                    <MobileButton
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={() => { }}
                        disabled={creating}
                    >
                        {creating ? "Creating..." : "Add Game"}
                    </MobileButton>
                </form>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                <div className="w-full space-y-4">
                    {games.map((game) => (
                        <div key={game.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col relative border border-gray-200 dark:border-gray-700">
                            {editId === game.id ? (
                                <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                                    <MobileInput
                                        type="text"
                                        value={editName}
                                        onChange={setEditName}
                                    />
                                    <MobileInput
                                        type="text"
                                        value={editDescription}
                                        onChange={setEditDescription}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <MobileButton
                                            variant="primary"
                                            size="sm"
                                            onClick={() => { }}
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
                                    <span className="font-semibold text-lg">{game.name}</span>
                                    <span className="text-gray-500 text-sm">{game.description}</span>
                                    <span className="text-gray-400 text-xs">Created: {game.created_at?.slice(0, 10)}</span>
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <MobileButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => startEdit(game)}
                                        >
                                            Edit
                                        </MobileButton>
                                        <MobileButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(game.id)}
                                        >
                                            Delete
                                        </MobileButton>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {games.length === 0 && !loading && <div className="text-center text-gray-500">No games found.</div>}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">&copy; {new Date().getFullYear()} Kids Game Management App</div>
            </main>
        </div>
    );
}
