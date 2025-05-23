import { createContext, useContext, useEffect, useState } from "react";
import type { ArchivoSalarial } from "../models/ArchivoSalarial";
import type { RegistroSalarial } from "../models/RegistroSalarial";
const API_URL = import.meta.env.VITE_API_URL;

interface ArchivoSalarialContextType {
  archivoSalarial: ArchivoSalarial | null;
  setArchivoSalarial: (
    archivoSalarial: ArchivoSalarial | null
  ) => Promise<void>;
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

  const setArchivoSalarial = async (
    archivoSalarial: ArchivoSalarial | null
  ) => {
    setArchivoSalarialState(archivoSalarial);
    if (archivoSalarial) {
      try {
        const response = await fetch(
          `${API_URL}/registrossalariales/archivo/${archivoSalarial.id_archivo}`
        );
        if (response.status == 200) {
          const registrosSalariales =
            (await response.json()) as RegistroSalarial[];
          archivoSalarial.contenido = registrosSalariales;
        } else {
          throw Error("No fue posible rescatar el contenido del archivo.");
        }
        console.log(archivoSalarial.contenido);
        localStorage.setItem(
          "archivoSalarial",
          JSON.stringify(archivoSalarial)
        );
      } catch (e) {
        localStorage.setItem(
          "archivoSalarial",
          JSON.stringify(archivoSalarial)
        );
      }
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
