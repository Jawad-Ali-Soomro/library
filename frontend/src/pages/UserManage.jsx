import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Table, TableHead, TableRow } from "@/components/ui/table";
import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const UserManage = () => {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const verifyUser = async (userId) => {
    try {
      const response = await axiosInstance.patch(`/user/${userId}`);
      toast.success("User verified successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Error verifying user");
      console.error("Error verifying user:", error);
    }
  }
  const unVerifyUser = async (userId) => {
    try {
      const response = await axiosInstance.patch(`/user/unverify/${userId}`);
      toast.success("User Suspended successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Error verifying user");
      console.error("Error verifying user:", error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/all");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const formatRollNo = (department) =>
    department
      ?.split(" ")
      .map((word) => word[0])
      .join("");

      const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        inputValue === "" ? fetchUsers() : this
        setUsername(inputValue);
      
        const filteredUsers = users.filter((u) => 
          u.username.toLowerCase().includes(inputValue)
        );
      
        setUsers(filteredUsers); 
      };
      
      const navigate = useNavigate()
  return (
   <div className="flex flex-col">
    <div className="flex justify-end mt-10 w-[100%]">
      <Input value={username} onChange={handleInputChange} className={"w-[300px]"} />
    </div>
     <div className="flex flex-col  rounded">
      {users.some((u) => u._id !== user?._id) && (
        <div className="main flex gap-2 wrap flex-wrap mt-10 justify-between">
          {users.map((user) => (
            <div
              key={user._id}
              className="card border w-[390px] flex flex-col rounded pb-10"
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
                  } rounded uppercase text-[12px] text-white`}
                >
                  {user?.verified ? "Verified" : "Unverified"}
                </span>
                {user?.department && (
                  <span className="px-4 font-semibold text-gray-500 py-2 bg-gray-100 rounded uppercase text-[12px]">
                    {user?.department}
                  </span>
                )}
                {user?.roll_no && (
                  <span className="px-4 font-semibold text-gray-500 py-2 bg-gray-100 rounded uppercase text-[12px]">
                    {user?.academic_year?.toString().slice(-2) +
                      "-BS" +
                      formatRollNo(user?.department) +
                      "-" +
                      user?.roll_no}
                  </span>
                )}
                {!user.verified && (
                  <Button
                    className={`w-80 h-10 uppercase bg-blue-500 hover:bg-blue-600 rounded `}
                    onClick={() => verifyUser(user._id)}
                  >
                    Verify User
                  </Button>
                )}
                <div className="flex justify-between w-80">
                  <Button
                    className={`w-39 h-10 uppercase bg-red-500 hover:-bg-red-600 rounded ${
                      user.verified ? "mt-12" : ""
                    }`}
                    onClick={() => unVerifyUser(user._id)}
                    disabled={!user.verified}
                  >
                    Suspend User
                  </Button>
                  <Button
                    className={`w-39 h-10 uppercase bg-gray-900 rounded  ${
                      user.verified ? "mt-12" : ""
                    }`}
                    onClick={() =>
                      navigate(`/admin/issued-books?username=${user.username}`)
                    }
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
   </div>
  );
};

export default UserManage;
