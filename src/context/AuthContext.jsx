"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    if (email === "owner@coffee.com" && password === "admin123") {
      const owner = { email, role: "admin" };
      setUser(owner);
      localStorage.setItem("user", JSON.stringify(owner));
      return true;
    }
    const normalUser = { email, role: "user" };
    setUser(normalUser);
    localStorage.setItem("user", JSON.stringify(normalUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
