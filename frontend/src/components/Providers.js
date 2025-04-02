"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import { login } from "@/redux/slices/authSlice";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth") || pathname === "/";

  return (
    <Provider store={store}>
      {!isAuthPage && <Header />}
      <AuthGuard>{children}</AuthGuard>
    </Provider>
  );
}

function AuthGuard({ children }) {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      const storedToken = localStorage.getItem("jwt");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedToken && storedUser) {
        dispatch(login({ token: storedToken, user: storedUser })); // Restore user session
        setLoading(false);
      } else {
        router.push("/auth/login");
      }
    } else {
      setLoading(false);
    }
  }, [token, router, dispatch]);

  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return children;
}
