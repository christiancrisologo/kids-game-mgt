
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900">
      <div className="bg-white/80 dark:bg-gray-900/80 p-8 rounded-lg shadow-lg flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold mb-2 text-center">Welcome to Kids Game Management App</h1>
        <p className="text-lg text-center mb-4">Manage users, games, and scores with ease.</p>
        <div className="flex flex-col gap-3 w-full">
          <Link href="/login" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center transition">Login</Link>
          <Link href="/games" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center transition">View Games</Link>
          <Link href="/users" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 text-center transition">View Users</Link>
        </div>
      </div>
    </div>
  );
}
