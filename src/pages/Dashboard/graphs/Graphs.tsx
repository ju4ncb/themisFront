import React, { useEffect, useState } from "react";
import { FileText, Database, Activity } from "lucide-react";
import "./Graphs.scss";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

const graficasMap = {
  scatter: "Gráfico de dispersión",
  hist: "Histograma",
  box: "Gráfico de cajas y bigotes",
  bar: "Gráfico de barra",
};

const Graphs: React.FC = () => {
  const { archivoSalarial } = useArchivoSalarial();
  const [tiposGraficas, setTiposGraficas] = useState<string[]>([]);

  const [variablesTotales, setVariablesTotales] = useState<string[]>([]);
  const [variablesAsignadas, setVariablesAsignadas] = useState<string[]>([]);
  const [variablesHorizontales, setVariablesHorizontales] = useState<string[]>(
    []
  );
  const [variableVertical, setVariableVertical] = useState("");
  const [variableDiferenciadora, setVariableDiferenciadora] = useState("");
  const [graficoEscogido, setGraficoEscogido] = useState("");
  const [imgBase64, setImgBase64] = useState<string>("");

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

  useEffect(() => {
    fetch(`${API_URL}/ai/graphs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTiposGraficas(data);
        }
      })
      .catch(() => {
        // handle error silently
      });
  }, []);

  const handleGenerateGraph = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      !graficoEscogido ||
      variablesHorizontales.length === 0 ||
      !variableVertical
    ) {
      Swal.fire({
        icon: "warning",
        title: "Faltan campos",
        text: "Por favor seleccione el tipo de gráfico, al menos una variable horizontal y una variable vertical.",
      });
      return;
    }

    // Función auxiliar para validar si una variable es numérica
    const isNumericVariable = (variable: string) => {
      if (!archivoSalarial?.contenido?.length) return false;
      const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
      const value = fila[variable];
      return value !== "" && !isNaN(Number(value));
    };

    if (graficoEscogido === "scatter") {
      if (variablesHorizontales.length !== 1) {
        Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el gráfico de dispersión, seleccione solo una variable horizontal.",
        });
        return;
      }
      // Validar que ambas sean numéricas
      if (
        !isNumericVariable(variablesHorizontales[0]) ||
        !isNumericVariable(variableVertical)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el gráfico de dispersión, ambas variables deben ser numéricas.",
        });
        return;
      }
    }

    if (graficoEscogido === "hist") {
      // Validar que todas las variables horizontales y la vertical sean numéricas
      if (
        variablesHorizontales.length === 0 ||
        !variablesHorizontales.every(isNumericVariable) ||
        !isNumericVariable(variableVertical)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el histograma, todas las variables horizontales y la variable vertical deben ser numéricas.",
        });
        return;
      }
    }

    if (graficoEscogido === "bar" || graficoEscogido === "box") {
      // Validar que la variable vertical sea numérica
      if (!isNumericVariable(variableVertical)) {
        const result = await Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el gráfico de barra, la variable vertical debe ser numérica, ¿Desea forzarlo?",
          showCancelButton: true,
          confirmButtonText: "Forzar gráfico",
          cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) {
          return;
        }
      }
      if (
        variablesHorizontales.some((variable) => isNumericVariable(variable))
      ) {
        const result = await Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "No se recomienda usar variables numéricas como variables horizontales para este tipo de gráfico. ¿Desea continuar de todas formas?",
          showCancelButton: true,
          confirmButtonText: "Generar de todas formas",
          cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) {
          return;
        }
      }
    }

    try {
      Swal.fire({
        title: "Generando gráfico...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await fetch(`${API_URL}/ai/explore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: variablesHorizontales,
          y: variableVertical,
          hue: variableDiferenciadora || undefined,
          graphType: graficoEscogido,
          id_archivo: archivoSalarial?.id_archivo,
        }),
      });
      if (!response.ok) throw new Error("Error al generar el gráfico");
      const data = await response.json();
      if (data?.image) {
        setImgBase64(data.image);
        Swal.close();
      } else {
        throw new Error("No se recibió la imagen");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo generar el gráfico.",
      });
    }
  };

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
    <div className="graphs-page">
      <main className="graphs-content-new">
        {/* Formulario grande a la izquierda */}
        <section className="form-panel-new">
          <h1 className="form-title">Generar gráfico</h1>

          <div className="field-group">
            <label>Tipo de gráfico</label>
            <select
              value={graficoEscogido}
              onChange={(e) => setGraficoEscogido(e.target.value)}
            >
              <option value={""}>Seleccione un tipo de gráfico</option>
              {tiposGraficas.map((value) => (
                <option key={value} value={value}>
                  {graficasMap[value as keyof typeof graficasMap]}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Variable(s) horizontal(es)</label>
            <select
              value=""
              onChange={(e) => {
                const selected = e.target.value;
                if (selected && !variablesHorizontales.includes(selected)) {
                  setVariablesHorizontales([
                    ...variablesHorizontales,
                    selected,
                  ]);
                  setVariablesAsignadas([...variablesAsignadas, selected]);
                }
              }}
            >
              <option value="">Seleccione una variable</option>
              {variablesTotales
                .filter((variable) => !variablesAsignadas.includes(variable))
                .map((variable) => (
                  <option key={variable} value={variable}>
                    {variable} (
                    {(() => {
                      if (!archivoSalarial?.contenido?.length) return "";
                      const fila = JSON.parse(
                        archivoSalarial.contenido[0].fila_registro
                      );
                      const value = fila[variable];
                      const num = Number(value);
                      if (value === "" || isNaN(num)) return "categórica";
                      return "numérica";
                    })()}
                    )
                  </option>
                ))}
            </select>
            <div className="selected-vars">
              {variablesHorizontales.map((variable) => (
                <span key={variable} className="selected-var">
                  {variable}
                  <button
                    type="button"
                    className="btn-remove-var"
                    onClick={() => {
                      setVariablesHorizontales(
                        variablesHorizontales.filter((v) => v !== variable)
                      );
                      setVariablesAsignadas(
                        variablesAsignadas.filter((v) => v !== variable)
                      );
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Variable vertical</label>
            <select
              value={variableVertical}
              onChange={(e) => {
                const selected = e.target.value;
                // Remove previous variableVertical from variablesAsignadas
                setVariablesAsignadas((prev) => {
                  const removedPrev = prev.filter(
                    (v) => v !== variableVertical
                  );
                  // Add new selection if not empty and not already present
                  if (selected && !removedPrev.includes(selected)) {
                    return [...removedPrev, selected];
                  }
                  return removedPrev;
                });
                setVariableVertical(selected);
              }}
            >
              <option value="">Seleccione una variable</option>
              {variablesTotales
                .filter(
                  (variable) =>
                    !variablesAsignadas.includes(variable) ||
                    variable === variableVertical
                )
                .map((variable) => (
                  <option key={variable} value={variable}>
                    {variable} (
                    {(() => {
                      if (!archivoSalarial?.contenido?.length) return "";
                      const fila = JSON.parse(
                        archivoSalarial.contenido[0].fila_registro
                      );
                      const value = fila[variable];
                      const num = Number(value);
                      if (value === "" || isNaN(num)) return "categórica";
                      return "numérica";
                    })()}
                    )
                  </option>
                ))}
            </select>
            <div className="selected-vars">
              {variableVertical && (
                <div className="selected-var">
                  {variableVertical}
                  <button
                    type="button"
                    className="btn-remove-var"
                    onClick={() => {
                      setVariablesAsignadas(
                        variablesAsignadas.filter((v) => v !== variableVertical)
                      );
                      setVariableVertical("");
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="field-group">
            <label>Variable diferenciadora (Opcional)</label>
            <select
              value={variableDiferenciadora}
              onChange={(e) => {
                const selected = e.target.value;
                // Remove previous variableDiferenciadora from variablesAsignadas
                setVariablesAsignadas((prev) => {
                  const removedPrev = prev.filter(
                    (v) => v !== variableDiferenciadora
                  );
                  // Add new selection if not empty and not already present
                  if (selected && !removedPrev.includes(selected)) {
                    return [...removedPrev, selected];
                  }
                  return removedPrev;
                });
                setVariableDiferenciadora(selected);
              }}
            >
              <option value="">Seleccione una variable</option>
              {variablesTotales
                .filter(
                  (variable) =>
                    !variablesAsignadas.includes(variable) ||
                    variable === variableDiferenciadora
                )
                .map((variable) => (
                  <option key={variable} value={variable}>
                    {variable} (
                    {(() => {
                      if (!archivoSalarial?.contenido?.length) return "";
                      const fila = JSON.parse(
                        archivoSalarial.contenido[0].fila_registro
                      );
                      const value = fila[variable];
                      const num = Number(value);
                      if (value === "" || isNaN(num)) return "categórica";
                      return "numérica";
                    })()}
                    )
                  </option>
                ))}
            </select>
            <div className="selected-vars">
              {variableDiferenciadora && (
                <div className="selected-var">
                  {variableDiferenciadora}
                  <button
                    type="button"
                    className="btn-remove-var"
                    onClick={() => {
                      setVariablesAsignadas(
                        variablesAsignadas.filter(
                          (v) => v !== variableDiferenciadora
                        )
                      );
                      setVariableDiferenciadora("");
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn--primary generate-btn-new"
            onClick={(e) => handleGenerateGraph(e)}
          >
            Generar gráfico
          </button>
        </section>

        {/* Tarjetas derecha */}
        <aside className="cards-panel">
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
        </aside>

        {/* Gráfico y botón abajo derecha */}
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
      </main>
    </div>
  );
};

export default Graphs;
