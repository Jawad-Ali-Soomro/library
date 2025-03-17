import { useUser } from "@/middleware/user";
import React, { useEffect } from "react";

const Borrowed = () => {
  const { user, fetchUser } = useUser();
  const fetchUserInfo = async () => {
    return await fetchUser();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  console.log(user);
  return <div></div>;
};

export default Borrowed;
