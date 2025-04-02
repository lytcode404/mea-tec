"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("User from Redux:", user); // Debugging
  }, [user]);


  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Task Manager</h1>
        {user && (
          <p className="text-sm">
            Logged in as <strong>{user.name}</strong> ({user.email})
          </p>
        )}
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
}
