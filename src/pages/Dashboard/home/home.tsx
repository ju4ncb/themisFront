import React, { useEffect, useState } from "react";
import NavbarDashboardHome from "../../../components/NavbarDashboardHome";
import SubirCargarArchivo from "../../../components/SubirCargarArchivo";
import CardButton from "../../../components/CardButton";
import "./home.scss";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import type { ArchivoSalarial } from "../../../models/ArchivoSalarial";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const { archivoSalarial } = useArchivoSalarial();
  const [isDetalles, setIsDetalles] = useState(true);
  const [navBarActive, setNavBarActive] = useState(false);
  const [archivosSalariales, setArchivosSalariales] = useState<
    ArchivoSalarial[]
  >([]);
  useEffect(() => {
    const loadDatasets = async () => {
      const response = await fetch(`${API_URL}/archivossalariales`);
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
  return (
    <div className={navBarActive ? "dashboard with-navbar" : "dashboard"}>
      {navBarActive && (
        <NavbarDashboardHome
          isDetalles={isDetalles}
          setIsDetalles={setIsDetalles}
        />
      )}
      <main className="dashboard__content">
        <SubirCargarArchivo
          archivosSalariales={archivosSalariales}
          setNavBarActive={setNavBarActive}
        />
        <div className="dashboard__cards">
          {archivoSalarial === null ? (
            <>
              <CardButton title="Último dataset usado" buttonText="Usar este">
                <span className="card__name">&lt;Nombre-archivo&gt;</span>{" "}
                <span className="card__attr">&lt;fecha&gt;</span>{" "}
                <span className="card__attr">&lt;tamaño&gt;</span>
              </CardButton>

              <CardButton title="Buscar datasets" buttonText="Entrar a kaggle">
                <span className="card__name">Buscar datasets en Kaggle</span>
              </CardButton>
            </>
          ) : (
            <>
              <CardButton title="Número de filas">
                <span className="card_number">
                  {archivoSalarial.contenido?.length}
                </span>
              </CardButton>
              <CardButton title="Número de columnas">
                <span className="card_number">
                  {archivoSalarial.contenido
                    ? Object.keys(archivoSalarial.contenido[0]).length
                    : 0}
                </span>
              </CardButton>
              <CardButton title="Tamaño">
                <span className="card_number">
                  {(archivoSalarial.tamano / 1024).toFixed(2)} kB
                </span>
              </CardButton>
              <CardButton title="Fecha creado">
                <span className="card_number">
                  {(() => {
                    const date = new Date(archivoSalarial.created_at);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    let hours = date.getHours();
                    const minutes = String(date.getMinutes()).padStart(2, "0");
                    const seconds = String(date.getSeconds()).padStart(2, "0");
                    const ampm = hours >= 12 ? "p.m." : "a.m.";
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    return `${year}-${month}-${day} ${String(hours).padStart(
                      2,
                      "0"
                    )}:${minutes}:${seconds} ${ampm}`;
                  })()}
                </span>
              </CardButton>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
