import { useEffect, useState } from "react";
import { Table, TableHead, TableRow } from "@/components/ui/table";
import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";

const UserManage = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/all");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const formatRollNo = (department) =>
    department
      ?.split(" ")
      .map((word) => word[0])
      .join("");

  return (
    <div className="flex flex-col  rounded">
      {users.some((u) => u._id !== user?._id) && (
        <div className="main flex gap-2 wrap flex-wrap mt-10">
          {users.map((user) => (
            <div
              key={user._id}
              className="card border w-[390px] flex flex-col rounded-xl pb-10"
            >
              <div className="top flex gap-2 flex-col items-center p-8 pb-4">
                <img
                  className="w-[100px] rounded-full h-[100px]"
                  src={user?.avatar || "/default.jpg"}
                  alt=""
                />
                <h1 className="text-[20px] font-semibold">{user?.username}</h1>
                <p>{user?.email}</p>
              </div>
              <div className="bottom flex flex-col gap-2 items-center justify-center">
                <span
                  className={`px-3 py-2 ${
                    user?.verified ? "bg-blue-600" : "bg-red-500"
                  } rounded-xl uppercase text-[12px] text-white`}
                >
                  {user?.verified ? "Verified" : "Unverified"}
                </span>
                {user?.department && (
                  <span className="px-4 font-semibold text-gray-500 py-2 bg-gray-100 rounded-xl uppercase text-[12px]">
                    {user?.department}
                  </span>
                )}
                {user?.roll_no && (
                  <span className="px-4 font-semibold text-gray-500 py-2 bg-gray-100 rounded-xl uppercase text-[12px]">
                    {user?.academic_year?.toString().slice(-2) +
                      "-BS" +
                      formatRollNo(user?.department) +
                      "-" +
                      user?.roll_no}
                  </span>
                )}
                {!user.verified && (
                  <Button
                    className={`w-80 h-10 uppercase bg-blue-500 hover:bg-blue-600 rounded-xl `}
                  >
                    Verify User
                  </Button>
                )}
                <div className="flex justify-between w-80">
                  <Button
                    className={`w-39 h-10 uppercase bg-red-500 hover:-bg-red-600 rounded-xl ${
                      user.verified ? "mt-12" : ""
                    }`}
                  >
                    Delete User
                  </Button>
                  <Button
                    className={`w-39 h-10 uppercase bg-gray-900 rounded-xl  ${
                      user.verified ? "mt-12" : ""
                    }`}
                  >
                    Books
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManage;
