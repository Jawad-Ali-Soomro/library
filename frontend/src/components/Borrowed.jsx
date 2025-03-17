import { useUser } from "@/middleware/user";
import React, { useEffect } from "react";

const Borrowed = () => {
  const { user, fetchUser } = useUser();

  return <div></div>;
};

export default Borrowed;
