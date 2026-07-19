import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    return token ? { name: name || "User", email: email || "" } : null;
  });

  const login = (userData) => {
    if (userData?.name) localStorage.setItem("userName", userData.name);
    if (userData?.email) localStorage.setItem("userEmail", userData.email);
    setUser({ name: userData?.name || "User", email: userData?.email || "" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);