import React, { useEffect, useState } from "react";
import NavbarDashboardHome from "../../../components/NavbarDashboardHome";
import SubirCargarArchivo from "../../../components/SubirCargarArchivo";
import CardButton from "../../../components/CardButton";
import "./home.scss";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import type { ArchivoSalarial } from "../../../models/ArchivoSalarial";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const [isDetalles, setIsDetalles] = useState(true);
  const [navBarActive, setNavBarActive] = useState(false);
  const [archivosSalariales, setArchivosSalariales] = useState<
    ArchivoSalarial[]
  >([]);
  const { archivoSalarial, setArchivoSalarial } = useArchivoSalarial();
  useEffect(() => {
    const loadDatasets = async () => {
      const response = await fetch(`${API_URL}/archivossalariales`);
      if (response.status == 201) {
        const archsal = await response.json();
        setArchivosSalariales(archsal);
      }
    };
    if (archivoSalarial !== null) {
      setNavBarActive(true);
    }
    loadDatasets();
  }, []);
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
                <span className="card_number"></span>
              </CardButton>
              <CardButton title="Número de columnas">
                <span className="card_number"></span>
              </CardButton>
              <CardButton title="Tamaño">
                <span className="card_number">{archivoSalarial.tamano}</span>
              </CardButton>
              <CardButton title="Fecha">
                <span className="card_number">
                  {archivoSalarial.created_at}
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
