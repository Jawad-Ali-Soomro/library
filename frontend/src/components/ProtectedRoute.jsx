import { Navigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useUser } from "@/middleware/user";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const cookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
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
              <span className="absolute px-4 py-1 rounded-xl capitalize font-semibold text-[10px] bg-[black] text-white bottom-6 right-[-30px] font-normal">
                {user?.role}
              </span>
            </p>
            <img
              className="cursor-pointer w-[50px] h-[50px] rounded-3xl"
              src={user?.avatar || "default.jpg"}
              alt=""
            />
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
