import React from "react";
import type { ArchivoSalarial } from "../models/ArchivoSalarial";
import { useUsuario } from "../contexts/UsuarioContext";
import { useArchivoSalarial } from "../contexts/ArchivoSalarialContext";

interface Props {
  archivosSalariales: ArchivoSalarial[];
  setNavBarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubirCargarArchivo: React.FC<Props> = ({
  archivosSalariales,
  setNavBarActive,
}: Props) => {
  const { archivoSalarial, setArchivoSalarial } = useArchivoSalarial();
  const { usuario } = useUsuario();
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setArchivoSalarial(JSON.parse(e.target.value));
      setNavBarActive(true);
    } else {
      setArchivoSalarial(null);
      setNavBarActive(false);
    }
  };
  return (
    <div className="dashboard__subir-cargar-archivo">
      <h1 className="dashboard__subir-cargar-archivo__title">
        Bienvenid@, {usuario?.nombres}
      </h1>
      <p>
        Selecciona o carga un conjunto de datos existentes para comenzar el
        análisis de brechas.
      </p>
      <section className="dashboard__subir-cargar-archivo__opciones">
        <select
          id="archivo-select"
          className="dashboard__subir-cargar-archivo__select"
          onChange={(e) => handleChange(e)}
          value={
            archivoSalarial !== null ? JSON.stringify(archivoSalarial) : ""
          }
        >
          <option value="">-- Elige un archivo --</option>
          {archivosSalariales.map((archivoSalarial) => (
            <option value={JSON.stringify(archivoSalarial)}>
              {archivoSalarial.nombre_archivo}
            </option>
          ))}
        </select>
        {archivoSalarial === null && (
          <button onClick={() => window.location.assign("/dashboard/upload")}>
            Subir csv
          </button>
        )}
      </section>
    </div>
  );
};

export default SubirCargarArchivo;
