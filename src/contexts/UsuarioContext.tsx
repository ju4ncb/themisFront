import { createContext, useContext, useEffect, useState } from "react";
import type { Usuario } from "../models/Usuario";

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  estaAutenticado: boolean;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem("usuario");
    if (stored) setUsuarioState(JSON.parse(stored));
  }, []);

  const setUsuario = (usuario: Usuario | null) => {
    setUsuarioState(usuario);
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  };

  const value = {
    usuario,
    setUsuario,
    estaAutenticado: !!usuario,
  };

  return (
    <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>
  );
};

// Hook customizado
export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe ser usado dentro de un UsuarioProvider");
  }
  return context;
};
