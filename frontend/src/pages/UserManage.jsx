import { Table, TableHead, TableRow } from "@/components/ui/table";
import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserManage = () => {
  const { user } = useUser();
  const [users, setUsers] = useState();
  const fetchUsers = async () => {
    const response = await axiosInstance.get("/user/all");
    setUsers(response.data.users);
  };
  console.log(users);
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center rounded">
      {!users?.includes(user?._id) ? (
        <div className="main flex gap-10">
          <>
            {users?.map((user) => {
              return (
                <div className="card border w-[300px] flex flex-col rounded">
                  <div className="top flex gap-2 flex-col items-center p-10">
                    <img
                      className="w-[100px] rounded-full h-[100px]"
                      src={user?.avatar || "/default.jpg"}
                      alt=""
                    />
                    <h1 className="text-[20px] font-semibold">
                      {user?.username}
                    </h1>
                    <p>{user?.email}</p>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserManage;
