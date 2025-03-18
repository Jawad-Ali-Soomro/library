import { Navigate, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useUser } from "@/middleware/user";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useUser();
  const cookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const navigate = useNavigate();
  const token = cookie("token");

  return token ? (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full relative">
          <SidebarTrigger className={"fixed top-5 z-10"} />
          <header className="w-full fixed top-0 left-0 py-3 z-9 bg-white min-h-10 border-b border-gray-200 pr-10 flex justify-end gap-5 items-center">
            <p className="cursor-pointer font-semibold relative">
              <span className="text-gray-500">Howdy,</span> {user?.username}{" "}
              {/* <span className="absolute px-4 py-1 rounded-xl capitalize font-semibold text-[10px] bg-[black] text-white bottom-6 right-[-30px] font-normal">
                {user?.role}
              </span> */}
            </p>
            <img
              className="relative cursor-pointer w-[50px] h-[50px] rounded-3xl"
              src={user?.avatar || "default.jpg"}
              alt=""
              onClick={() => setShowMenu(!showMenu)}
            />
            <div
              className="w-[200px] bg-gray-100 absolute rounded-xl top-[100%]"
              style={{
                maxWidth: showMenu ? "100%" : "0",
                overflow: "hidden",
                padding: showMenu ? "20px" : "0",
              }}
            >
              <ul className="flex flex-col gap-2 transition-3s">
                <li
                  onClick={() => navigate("/profile")}
                  className="w-full cursor-pointer py-2 bg-white flex items-center justify-center uppercase rounded-xl border"
                >
                  Profile
                </li>
                <li className="w-full cursor-pointer py-2 bg-white flex items-center justify-center uppercase rounded-xl border">
                  Settings
                </li>
                <li
                  onClick={() => logout() + window.location.reload()}
                  className="w-full cursor-pointer bg-red-500 flex items-center justify-center uppercase text-white py-2 rounded-xl"
                >
                  Logout
                </li>
              </ul>
            </div>
          </header>
          <main className="flex-grow p-10 mt-10">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
