import { createContext, useContext, useEffect, useState } from "react";

interface GraphContextType {
  variablesTotales: string[];
  setVariablesTotales: React.Dispatch<React.SetStateAction<string[]>>;
  imgBase64: string;
  setImgBase64: React.Dispatch<React.SetStateAction<string>>;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider = ({ children }: { children: React.ReactNode }) => {
  const [variablesTotales, setVariablesTotales] = useState<string[]>([]);
  const [imgBase64, setImgBase64] = useState<string>("");

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem("variablesTotales");
    if (stored) setVariablesTotales(JSON.parse(stored));
  }, []);

  const value = {
    variablesTotales,
    setVariablesTotales,
    imgBase64,
    setImgBase64,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
};

// Hook customizado
export const useGraphVariables = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useUsuario debe ser usado dentro de un UsuarioProvider");
  }
  return context;
};
