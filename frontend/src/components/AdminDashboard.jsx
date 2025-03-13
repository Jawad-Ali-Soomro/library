import { AllBooks } from "@/shared/AllBooks";
import { AllUsers } from "@/shared/AllUsers";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex w-full h-full flex flex-col align-end ">
      <AllUsers />
      <AllBooks />
    </div>
  );
};

export default AdminDashboard;
