import { Activity, Database, FileText } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useArchivoSalarial } from "../contexts/ArchivoSalarialContext";
import { useGraphVariables } from "../contexts/GraphContext";

const GraphLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/dashboard/graphs";
  const { archivoSalarial } = useArchivoSalarial();
  const { setVariablesTotales, imgBase64 } = useGraphVariables();

  useEffect(() => {
    if (
      archivoSalarial &&
      archivoSalarial.contenido &&
      archivoSalarial.contenido.length > 0
    ) {
      const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
      setVariablesTotales(Object.keys(fila));
    }
  }, [archivoSalarial]);

  const getNumericosCount = () => {
    if (archivoSalarial && archivoSalarial.contenido) {
      const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
      let count = 0;
      Object.values(fila).forEach((value) => {
        const num = Number(value);
        if (value !== "" && !isNaN(num)) {
          count++;
        }
      });
      return count;
    }
    return 0;
  };

  const getCategoricosCount = () => {
    if (archivoSalarial && archivoSalarial.contenido) {
      const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
      let count = 0;
      Object.values(fila).forEach((value) => {
        const num = Number(value);
        if (value === "" || isNaN(num)) {
          count++;
        }
      });
      return count;
    }
    return 0;
  };

  const getValoresNulosCount = () => {
    if (archivoSalarial && archivoSalarial.contenido) {
      let nulos = 0;
      archivoSalarial.contenido.forEach((registro: any) => {
        const fila = JSON.parse(registro.fila_registro);
        Object.values(fila).forEach((valor) => {
          if (valor === null || valor === "" || valor === undefined) {
            nulos++;
          }
        });
      });
      return nulos;
    }
    return 0;
  };

  return (
    <div className={isHome ? "graphs-page grid-row" : "graphs-page grid-col"}>
      {/* Contenido principal*/}
      <Outlet />

      {/* Tarjetas y gráfico */}
      <div
        className={
          isHome ? "graphs-cards-result" : "graphs-cards-result center-start"
        }
      >
        <div className="cards-panel">
          <div className="card-small dataset-card">
            <FileText className="card-icon" />
            <div className="card-content">
              <h2>Dataset actual</h2>
              <p>
                Nombre: <strong>{archivoSalarial?.nombre_archivo}</strong>
              </p>
              <p>
                Tamaño:{" "}
                <strong>
                  {archivoSalarial
                    ? (archivoSalarial.tamano / 1024).toFixed(2)
                    : 0}{" "}
                  kB
                </strong>
              </p>
            </div>
          </div>
          <div className="card-small summary-card">
            <Database className="card-icon" />
            <div className="card-content">
              <h2>Resumen</h2>
              <p>
                Valores nulos: <strong>{getValoresNulosCount()}</strong>
              </p>
              <p>
                Variables numéricas: <strong>{getNumericosCount()}</strong>
              </p>
              <p>
                Variables categoricas: <strong>{getCategoricosCount()}</strong>
              </p>
            </div>
          </div>
        </div>
        {!isHome && (
          <section className="chart-panel">
            <div className="chart-placeholder">
              {!imgBase64 ? (
                <Activity size={64} />
              ) : (
                <img
                  src={`data:image/png;base64,${imgBase64}`}
                  alt="Equidad del modelo"
                />
              )}
            </div>
            {imgBase64 && (
              <button
                className="btn btn--secondary download-btn-new"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = `data:image/png;base64,${imgBase64}`;
                  link.download = "grafico.png";
                  link.click();
                }}
              >
                Descargar PNG
              </button>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default GraphLayout;
