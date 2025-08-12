
import Link from "next/link";

export default function Home() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2m-6 0h6" />
            </svg>
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center drop-shadow-lg">Kids Game Management</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-xs">A modern platform to manage users, games, and scores with style and ease.</p>
        </div>
        <div className="flex flex-col gap-4 w-full mt-2">
          <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Login
          </Link>
          <Link href="/games" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21m5.25-4l.75 4m-7.5-8h10.5M12 3v4m0 0l-2 2m2-2l2 2" />
            </svg>
            View Games
          </Link>
          <Link href="/users" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            View Users
          </Link>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">&copy; {new Date().getFullYear()} Kids Game Management App</div>
      </main>
    </div>
  );
}
