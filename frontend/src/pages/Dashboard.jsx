import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import React from "react";

const Dashboard = () => {
  const role = window.localStorage.getItem("role");
  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
    </div>
  );
};

export default Dashboard;
