import { Button } from "@/components/ui/button";
import { formatDate } from "@/constants/formatDate";
import { useUser } from "@/middleware/user";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  const getNotifications = async () => {
    if (user) {
      try {
        const response = await axiosInstance.get(`/notification/${user?._id}`);
        setNotifications(response.data);
      } catch (err) {
        toast.error("Failed to fetch notifications");
        console.error(err);
      }
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/notification/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted");
    } catch (err) {
      toast.error("Failed to delete notification");
      console.error(err);
    }
  };

  const deleteAllNotifications = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all notifications?"
    );
    if (!confirm) return;

    try {
      await Promise.all(
        notifications.map((notify) =>
          axiosInstance.delete(`/notification/${notify._id}`)
        )
      );
      setNotifications([]);
      toast.success("All notifications deleted");
    } catch (err) {
      toast.error("Failed to delete all notifications");
      console.error(err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);

  return (
    <div>
      <div className="top pb-6 pt-10 px-10 flex justify-between items-center">
        <h1 className="uppercase text-[20px]">
          You have <span className="font-semibold">{notifications.length}</span>{" "}
          unread notification
        </h1>
        {notifications.length > 0 && (
          <Button
            className="bg-red-600 text-white w-[200px] h-[45px] uppercase py-2"
            onClick={deleteAllNotifications}
          >
            Delete All
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="notifications gap-2 mt-2 flex flex-col">
          {notifications.map((notify) => (
            <div
              key={notify._id}
              className="card w-full border h-15 px-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <h1 className="uppercase text-[15px]">{notify?.message}</h1>
              </div>
              <div className="left flex items-center gap-5">
                {formatDate(notify.createdAt)}
                <Button
                  className="uppercase bg-red-500 px-10"
                  onClick={() => deleteNotification(notify._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500">
          No notifications to show.
        </p>
      )}
    </div>
  );
};

export default Notification;
