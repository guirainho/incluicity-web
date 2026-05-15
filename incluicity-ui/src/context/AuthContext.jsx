import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("@IncluiCity:token");
    const storedUser = localStorage.getItem("@IncluiCity:user");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function login(email, senha) { 
    const response = await api.post("/auth/login", { email, senha }); 
    const { token } = response.data;

    const loggedUser = { email };

    localStorage.setItem("@IncluiCity:token", token);
    localStorage.setItem("@IncluiCity:user", JSON.stringify(loggedUser));

    setUser(loggedUser);

    return loggedUser;
  }

  async function register(nome, email, senha) { 
    await api.post("/auth/register", { nome, email, senha }); 
    return login(email, senha);
  }

  function logout() {
    localStorage.removeItem("@IncluiCity:token");
    localStorage.removeItem("@IncluiCity:user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
