import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        grupoActivo: decoded.grupoActivo || null,
      });

    } catch (err) {
      toast.error("Token inválido, por favor inicie sesión nuevamente", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    login(); // lee el token al cargar la app
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => useContext(AuthContext);