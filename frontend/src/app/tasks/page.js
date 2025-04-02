"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, deleteTask, updateTask } from "@/redux/slices/taskSlice";
import { useRouter } from "next/navigation";
import {
  getTasks,
  deleteTask as removeTask,
  updateTask as editTask,
} from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TasksPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "pending", // status as a string ("pending" or "completed")
  });

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    } else {
      getTasks(token)
        .then((res) => dispatch(setTasks(res.data)))
        .catch(() => toast.error("Error fetching tasks"));
    }
  }, [token]);

  // Log tasks to debug
  useEffect(() => {
    console.log("Tasks:", tasks);
  }, [tasks]);

  // Delete task
  const handleDelete = async (id) => {
    try {
      await removeTask(token, id);
      dispatch(deleteTask(id));
      toast.success("Task deleted successfully!");
    } catch {
      toast.error("Error deleting task");
    }
  };

  // Open edit modal and convert boolean to status string
  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditData({
      title: task.title,
      description: task.description || "",
      status: task.completed ? "completed" : "pending",
    });
  };

  // Update task: convert status string back to boolean before sending
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTaskData = {
        title: editData.title,
        description: editData.description,
        completed: editData.status === "completed",
      };
      const res = await editTask(token, editingTask, updatedTaskData);
      dispatch(updateTask(res.data));
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch {
      toast.error("Error updating task");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-5 text-center">Your Tasks</h1>
      <button
        onClick={() => router.push("/tasks/create")}
        className="mb-4 bg-blue-500 text-white p-2 rounded shadow"
      >
        Add Task
      </button>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 text-gray-800"
                }`}
              >
                {task.completed ? "completed" : "pending"}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                placeholder="Task Title"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                placeholder="Task Description"
                className="w-full p-2 border rounded mb-2"
              />
              <select
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
