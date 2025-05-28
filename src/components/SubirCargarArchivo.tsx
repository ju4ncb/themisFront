import React from "react";
import type { ArchivoSalarial } from "../models/ArchivoSalarial";
import { useUsuario } from "../contexts/UsuarioContext";
import { useArchivoSalarial } from "../contexts/ArchivoSalarialContext";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

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
      await setArchivoSalarial(JSON.parse(e.target.value));
      setNavBarActive(true);
    } else {
      await setArchivoSalarial(null);
      setNavBarActive(false);
    }
  };
  const eliminarArchivo = async () => {
    try {
      const response = await fetch(
        `${API_URL}/archivossalariales/${archivoSalarial?.id_archivo}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          text: `Archivo eliminado con éxito.`,
        }).then(() => {
          if (!archivoSalarial) return;
          setArchivoSalarial(null);
        });
      } else {
        // Handle error
        throw Error();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error inesperado eliminando el archivo.",
      });
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
          onChange={handleChange}
          value={
            archivoSalarial !== null
              ? JSON.stringify({ ...archivoSalarial, contenido: undefined })
              : ""
          }
        >
          <option value="">-- Elige un archivo --</option>
          {archivosSalariales.map((archivo, index) => (
            <option
              value={JSON.stringify({ ...archivo, contenido: undefined })}
              key={index}
            >
              {archivo.nombre_archivo}
            </option>
          ))}
        </select>
        <div className="buttons-container">
          {archivoSalarial === null ? (
            <button onClick={() => window.location.assign("/dashboard/upload")}>
              Subir csv
            </button>
          ) : (
            <>
              <button
                onClick={() => window.location.assign("/dashboard/graphs")}
              >
                Explorar datos
              </button>
              <button
                onClick={() => window.location.assign("/dashboard/train")}
              >
                Entrenar modelo
              </button>
              <button onClick={eliminarArchivo} className="eliminar">
                Eliminar archivo
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SubirCargarArchivo;
