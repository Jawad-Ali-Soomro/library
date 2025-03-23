import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/constants/formatDate";
import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const getNotifications = async () => {
    if (user) {
      const response = await axiosInstance.get(`/notification/${user?._id}`);
      setNotifications(response.data);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);
  return (
    <div>
        <div className="top pb-10 pt-10">
            <h1 className="uppercase pl-10 text-[20px]">You've <span className="font-semibold"> {notifications?.length}</span> Unread notification</h1>
        </div>
      {notifications.length > 0 && (
        <div className="notifications gap-2 mt-2 flex flex-col">
          {notifications.map((notify) => {
            return (
              <div className="card w-[100%] h-15 border items-center justify-between px-5 flex">
                <div className="flex items-center justify-center gap-2">
                  <Checkbox />
                  <h1 className="uppercase text-[15px]">{notify?.message}</h1>
                </div>
                <div className="left flex items-center gap-5">
                  {
                    formatDate(notify.createdAt)
                  }
                  <Button className={"uppercase bg-red-500 px-10"}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;
