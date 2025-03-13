import { Navigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const ProtectedRoute = ({ children }) => {
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
        <SidebarTrigger />
        <div className="flex">{children}</div>
      </SidebarProvider>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
