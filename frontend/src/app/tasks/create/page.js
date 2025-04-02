"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "@/api";
import { addTask } from "@/redux/slices/taskSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

export default function CreateTaskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Unauthorized! Please login first.");
      return;
    }

    setLoading(true);
    try {
      const res = await createTask(token, data);
      dispatch(addTask(res.data));
      toast.success("Task created successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
      setTimeout(() => router.push("/tasks"), 1500);
    } catch (err) {
      toast.error("Failed to create task. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4">
      <ToastContainer />

      <div
        className={`max-w-md w-full transition-all duration-700 transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <div
              className={`transition-all duration-1000 delay-300 transform ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <svg
                className="w-12 h-12 mx-auto mb-4 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2
              className={`text-3xl font-bold text-gray-800 mb-2 transition-all duration-1000 delay-500 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Create New Task
            </h2>
            <p
              className={`text-gray-600 mb-6 transition-all duration-1000 delay-700 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Add a new task to your productivity list
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`mb-4 transition-all duration-1000 delay-800 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="title"
              >
                Task Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <input
                  {...register("title", { required: "Task title is required" })}
                  id="title"
                  placeholder="Enter task title"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div
              className={`mb-6 transition-all duration-1000 delay-900 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <textarea
                  {...register("description")}
                  id="description"
                  placeholder="Enter task description (optional)"
                  rows="4"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-1000 transform ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Create Task"
                )}
              </button>
            </div>
          </form>

          <div
            className={`mt-6 text-center text-gray-500 text-sm transition-all duration-1000 delay-1100 transform ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() => router.push("/tasks")}
              className="text-purple-500 hover:text-purple-600 font-medium transition-colors"
            >
              Cancel and return to tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
