import { createContext, useContext, useEffect, useState } from "react";
import type { ArchivoSalarial } from "../models/ArchivoSalarial";

interface ArchivoSalarialContextType {
  archivoSalarial: ArchivoSalarial | null;
  setArchivoSalarial: (archivoSalarial: ArchivoSalarial | null) => void;
  estaAutenticado: boolean;
}

const ArchivoSalarialContext = createContext<
  ArchivoSalarialContextType | undefined
>(undefined);

export const ArchivoSalarialProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [archivoSalarial, setArchivoSalarialState] =
    useState<ArchivoSalarial | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem("archivoSalarial");
    if (stored) setArchivoSalarialState(JSON.parse(stored));
  }, []);

  const setArchivoSalarial = (archivoSalarial: ArchivoSalarial | null) => {
    setArchivoSalarialState(archivoSalarial);
    if (archivoSalarial) {
      localStorage.setItem("archivoSalarial", JSON.stringify(archivoSalarial));
    } else {
      localStorage.removeItem("archivoSalarial");
    }
  };

  const value = {
    archivoSalarial,
    setArchivoSalarial,
    estaAutenticado: !!archivoSalarial,
  };

  return (
    <ArchivoSalarialContext.Provider value={value}>
      {children}
    </ArchivoSalarialContext.Provider>
  );
};

// Hook customizado
export const useArchivoSalarial = () => {
  const context = useContext(ArchivoSalarialContext);
  if (!context) {
    throw new Error(
      "useArchivoSalarial debe ser usado dentro de un ArchivoSalarialProvider"
    );
  }
  return context;
};
