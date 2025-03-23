import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./user";
import { axiosInstance } from "@/utils/axiosInstance";

export const UserContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser)); // ✅ Parse JSON string
      setToken(storedToken);
    }
  }, []);

  const login = (userData, authToken) => {
    localStorage.setItem("role", userData.role);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ No extra options
    localStorage.setItem("token", authToken);

    setUser(userData);
    setToken(authToken);
    setLoading(false);

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser(null);
    setToken(null);

    window.location.href = "/"; // ✅ Reload to home page
  };

  const fetchUser = async () => {
    if (!user?._id) return;
    
    try {
      const response = await axiosInstance.get(`/user/${user._id}`); // ✅ Use GET instead of POST
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
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
