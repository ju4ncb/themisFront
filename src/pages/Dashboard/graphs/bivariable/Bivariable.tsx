import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../../contexts/ArchivoSalarialContext";
import Swal from "sweetalert2";
import { useGraphVariables } from "../../../../contexts/GraphContext";
const API_URL = import.meta.env.VITE_API_URL;

const graficasMap = {
  reg: "Gráfico de regresión",
  hist: "Histograma",
  box: "Gráfico de cajas y bigotes",
  bar: "Gráfico de barra",
};

const Bivariable: React.FC = () => {
  const { variablesTotales, setImgBase64 } = useGraphVariables();
  const { archivoSalarial } = useArchivoSalarial();
  const [variablesAsignadas, setVariablesAsignadas] = useState<string[]>([]);
  const [tiposGraficas, setTiposGraficas] = useState<string[]>([]);
  const [variableHorizontal, setVariableHorizontal] = useState<string>("");
  const [variableVertical, setVariableVertical] = useState("");
  const [variableDiferenciadora, setVariableDiferenciadora] = useState("");
  const [graficoEscogido, setGraficoEscogido] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/ai/graphs`)
      .then((res) => res.json())
      .then((data) => {
        const bivariableData = data.bivariable;
        if (Array.isArray(bivariableData)) {
          setTiposGraficas(bivariableData);
        }
      })
      .catch(() => {
        // handle error silently
      });
  }, []);

  const handleGenerateGraph = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!graficoEscogido || !variableHorizontal || !variableVertical) {
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

    if (graficoEscogido === "reg") {
      if (!variableHorizontal) {
        Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el gráfico de regresión, seleccione solo una variable horizontal.",
        });
        return;
      }
      // Validar que ambas sean numéricas
      if (
        !isNumericVariable(variableHorizontal) ||
        !isNumericVariable(variableVertical)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Selección inválida",
          text: "Para el gráfico de regresión, ambas variables deben ser numéricas.",
        });
        return;
      }
    }

    if (graficoEscogido === "hist") {
      // Validar que todas las variables horizontales y la vertical sean numéricas
      if (
        !isNumericVariable(variableHorizontal) ||
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
      if (isNumericVariable(variableHorizontal)) {
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
      const response = await fetch(`${API_URL}/ai/bivariable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: variableHorizontal,
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
  return (
    <main className="graphs-form">
      {/* Formulario grande a la izquierda */}
      <section className="form-panel-new">
        <h1 className="form-title">Generar análisis bivariable</h1>

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
          <label>Variable horizontal</label>
          <select
            value=""
            onChange={(e) => {
              const selected = e.target.value;
              if (selected && variableHorizontal !== selected) {
                setVariableHorizontal(selected);
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
            {variableHorizontal && (
              <div className="selected-var">
                {variableHorizontal}
                <button
                  type="button"
                  className="btn-remove-var"
                  onClick={() => {
                    setVariablesAsignadas(
                      variablesAsignadas.filter((v) => v !== variableHorizontal)
                    );
                    setVariableHorizontal("");
                  }}
                >
                  ×
                </button>
              </div>
            )}
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
                const removedPrev = prev.filter((v) => v !== variableVertical);
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
    </main>
  );
};

export default Bivariable;
