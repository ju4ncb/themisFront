import React, { useEffect, useState } from "react";
import NavbarDashboardHome from "../../../components/NavbarDashboardHome";
import SubirCargarArchivo from "../../../components/SubirCargarArchivo";
import Card from "../../../components/Card";
import "./home.scss";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import type { ArchivoSalarial } from "../../../models/ArchivoSalarial";
import Table from "../../../components/Table";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useUsuario } from "../../../contexts/UsuarioContext";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const { usuario } = useUsuario();
  const { archivoSalarial, setArchivoSalarial } = useArchivoSalarial();
  const [isDetalles, setIsDetalles] = useState(true);
  const [navBarActive, setNavBarActive] = useState(false);
  const [archivosSalariales, setArchivosSalariales] = useState<
    ArchivoSalarial[]
  >([]);
  const [numFilas, setNumFilas] = useState<string | number>("Cargando...");
  const [numColumnas, setNumColumnas] = useState<string | number>(
    "Cargando..."
  );
  useEffect(() => {
    const loadDatasets = async () => {
      const response = await fetch(
        `${API_URL}/archivossalariales/usuarios/${usuario?.id_usuario}`
      );
      if (response.status == 200) {
        const archsal = await response.json();
        setArchivosSalariales(archsal);
      }
    };
    if (archivoSalarial !== null) {
      setNavBarActive(true);
    }
    loadDatasets();
  }, [archivoSalarial]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (archivoSalarial && Array.isArray(archivoSalarial.contenido)) {
        const contenido = archivoSalarial.contenido;
        setNumFilas(contenido.length);
        setNumColumnas(
          contenido.length > 0
            ? Object.keys(JSON.parse(contenido[0].fila_registro)).length
            : 0
        );
      } else {
        setNumFilas("Cargando...");
        setNumColumnas("Cargando...");
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [archivoSalarial]);
  const deleteRow = async (id_registro: number) => {
    try {
      const response = await fetch(
        `${API_URL}/registrossalariales/${id_registro}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          text: `Fila eliminada con éxito.`,
        }).then(() => {
          if (!archivoSalarial) return;
          setArchivoSalarial({
            ...archivoSalarial,
            contenido: archivoSalarial!.contenido!.filter(
              (fila: { id_registro: number }) =>
                fila.id_registro !== id_registro
            ),
          });
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
        text: "Hubo un error inesperado eliminando la fila.",
      });
    }
  };
  return (
    <div className={navBarActive ? "dashboard with-navbar" : "dashboard"}>
      <NavbarDashboardHome
        navBarActive={navBarActive}
        isDetalles={isDetalles}
        setIsDetalles={setIsDetalles}
      />
      {isDetalles ? (
        <main className="dashboard__content">
          <SubirCargarArchivo
            archivosSalariales={archivosSalariales}
            setNavBarActive={setNavBarActive}
          />
          <div className="dashboard__cards">
            {archivoSalarial === null ? (
              <>
                <Card title="Último dataset usado" buttonText="Usar este">
                  <span className="card__name">&lt;Nombre-archivo&gt;</span>{" "}
                  <span className="card__attr">&lt;fecha&gt;</span>{" "}
                  <span className="card__attr">&lt;tamaño&gt;</span>
                </Card>

                <Card
                  title="Buscar datasets"
                  buttonText="Entrar a kaggle"
                  onClick={() => {
                    window.open(
                      "https://www.kaggle.com/search?q=dataset+salary",
                      "_blank"
                    );
                  }}
                >
                  <span className="card__name">Buscar datasets en Kaggle</span>
                </Card>
              </>
            ) : (
              <>
                <Card title="Número de filas">
                  <span className="card_number">{numFilas}</span>
                </Card>
                <Card title="Número de columnas">
                  <span className="card_number">{numColumnas}</span>
                </Card>
                <Card title="Tamaño">
                  <span className="card_number">
                    {(archivoSalarial.tamano / 1024).toFixed(2)} kB
                  </span>
                </Card>
                <Card title="Fecha creado">
                  <span className="card_number">
                    {(() => {
                      const date = new Date(archivoSalarial.created_at);
                      const year = date.getFullYear();
                      const month = date.getMonth() + 1;
                      const day = date.getDate();
                      let hours = date.getHours();
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );
                      const seconds = String(date.getSeconds()).padStart(
                        2,
                        "0"
                      );
                      const ampm = hours >= 12 ? "p.m." : "a.m.";
                      hours = hours % 12;
                      hours = hours ? hours : 12; // the hour '0' should be '12'
                      return `${year}-${month}-${day} ${String(hours).padStart(
                        2,
                        "0"
                      )}:${minutes}:${seconds} ${ampm}`;
                    })()}
                  </span>
                </Card>
              </>
            )}
          </div>
        </main>
      ) : (
        <main className="dashboard__table">
          <Table
            ignoreId={true}
            data={archivoSalarial?.contenido?.map(
              ({ fila_registro, id_registro }) => ({
                ...JSON.parse(fila_registro),
                id_registro, // include id_registro for actions
              })
            )}
            actions={[
              {
                actionFunction: (row) => deleteRow(row.id_registro),
                Icon: Trash2,
              },
            ]}
          />
        </main>
      )}
    </div>
  );
};

export default Dashboard;
