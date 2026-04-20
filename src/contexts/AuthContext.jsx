import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
  localStorage.getItem("token")
);


  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

 return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}