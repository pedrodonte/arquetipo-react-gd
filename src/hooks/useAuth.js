import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import constantes from "../components/constantes.json";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setToken(data.token);
    var decoded = await jwt_decode(data.token);
    console.log("LEYENDO TOKEN:" + data.token);
    await setUser(decoded.payload);
    navigate(constantes.inicial, { replace: true });
  };

  const usuario_jwt = () => {
    if (token) {
      var decoded = jwt_decode(token);
      return decoded.payload;
    } else {
      return null;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    console.log("logout");
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      usuario_jwt,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
