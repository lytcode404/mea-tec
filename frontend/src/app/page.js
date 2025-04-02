"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-4">
      <div
        className={`max-w-md w-full transition-all duration-700 transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
          <div className="text-center mb-8">
            <div
              className={`transition-all duration-1000 delay-300 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-3 text-gray-800 transition-all duration-1000 delay-500 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Task Manager
            </h1>
            <p
              className={`text-gray-600 text-lg md:text-xl mb-8 transition-all duration-1000 delay-700 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Streamline your productivity with secure, real-time task
              management
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-1000 delay-900 transform ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md flex justify-center items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md flex justify-center items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Register
            </button>
          </div>

          <div
            className={`mt-8 text-center text-gray-500 text-sm transition-all duration-1000 delay-1100 transform ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>Start organizing your tasks today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
