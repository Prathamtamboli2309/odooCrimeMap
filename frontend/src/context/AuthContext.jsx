import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    const initialUser = localStorage.getItem("user");
    const initialToken = localStorage.getItem("token");
    console.log(initialUser);
    if (initialUser && initialToken) {
      try {
        setUser(JSON.parse(initialUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    setLoading(false); // Set loading state to false after initializing user
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, email, password, role }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
