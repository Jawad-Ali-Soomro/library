import React from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./user";
import { axiosInstance } from "@/utils/axiosInstance";

export const UserContextProvider = ({ children }) => {
  const cookies = new Cookies();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedUser = cookies.get("user");
    const storedToken = cookies.get("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);
  const login = (userData, authToken) => {
    localStorage.setItem("role", userData.role);
    cookies.set("user", JSON.stringify(userData), {
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    cookies.set("token", authToken, { path: "/", maxAge: 7 * 24 * 60 * 60 });

    setUser(userData);
    setToken(authToken);

    setLoading(false);
    <Navigate to="/dashboard" />;
  };
  const logout = () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("token", { path: "/" });
    localStorage.removeItem("role");
    setUser(null);
    setToken(null);
  };

  const fetchUser = async () => {
    if (!user?._id) return;
    const response = await axiosInstance.post(`/user/${user?._id}`);
    setUser(response.data);
  };
  return (
    <UserContext.Provider
      value={{ user, token, login, logout, fetchUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
