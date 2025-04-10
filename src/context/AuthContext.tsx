import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
import api from "../services/api";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/api/auth/login", { email, senha });
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/consumo");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      alert("Login falhou. Verifique seu e-mail e senha.");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
