import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import "./train.scss";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

const Train = () => {
  const { archivoSalarial } = useArchivoSalarial();
  const [forceClassifier, setForceClassifier] = useState(false);
  const [botonesNoDisponibles, setBotonesNoDisponibles] = useState<string[]>(
    []
  );
  const [botonSeleccionado, setBotonSeleccionado] = useState("");
  const [variablesEntrada, setVariablesEntrada] = useState<string[]>([]);
  const [variableSalida, setVariableSalida] = useState("");
  const [variableSensible, setVariableSensible] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [tiposVariables, setTiposVariables] = useState<Record<string, string>>(
    {}
  );
  const [modelos, setModelos] = useState<{
    regression?: string[];
    classifier?: string[];
  }>({});
  const [modeloEscogido, setModeloEscogido] = useState("");
  const [imgBase64Overfitting, setImgBase64Overfitting] = useState<string>("");
  const [imgBase64Fairness, setImgBase64Fairness] = useState<string>("");
  useEffect(() => {
    fetch(`${API_URL}/ai/modelos`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setModelos(data);
        }
      })
      .catch(() => {
        // handle error silently
      });
  }, []);
  if (
    archivoSalarial?.contenido?.[0]?.fila_registro &&
    Object.keys(tiposVariables).length === 0
  ) {
    try {
      const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
      const nuevosTipos: Record<string, string> = {};
      Object.entries(fila).forEach(([key, value]) => {
        // Try to determine if value is numérico
        const num = Number(value);
        if (value !== "" && !isNaN(num)) {
          nuevosTipos[key] = "numérico";
        } else {
          nuevosTipos[key] = "categórico";
        }
      });
      setTiposVariables(nuevosTipos);
    } catch (e) {
      // ignore parse errors
    }
  }
  useEffect(() => {
    if (!archivoSalarial?.contenido?.[0]?.fila_registro) return;

    const allVariables = Object.keys(
      JSON.parse(archivoSalarial.contenido[0].fila_registro)
    );

    const usedVariables = new Set([
      variableSalida,
      variableSensible,
      ...variablesEntrada,
    ]);

    const noDisponibles = allVariables.filter((v) => usedVariables.has(v));

    setBotonesNoDisponibles(noDisponibles);
  }, [variableSalida, variableSensible, variablesEntrada]);
  const asignarBoton = (instruccion: string) => {
    if (!botonSeleccionado) return;

    if (instruccion === "entrada") {
      if (!variablesEntrada.includes(botonSeleccionado)) {
        if (botonSeleccionado === variableSalida) {
          setErrorLog(
            `Variable ${botonSeleccionado} ya es de tipo salida, deseleccionala primero.`
          );
          setTimeout(() => setErrorLog(""), 7000);
          return;
        } else if (botonSeleccionado === variableSensible) {
          setVariableSensible("");
          return;
        }
        setVariablesEntrada([...variablesEntrada, botonSeleccionado]);
        setBotonSeleccionado("");
      }
    } else if (instruccion === "sensible") {
      if (botonSeleccionado !== variableSalida) {
        if (!variablesEntrada.includes(botonSeleccionado)) {
          setErrorLog(
            `Variable ${botonSeleccionado} debe ser de entrada para poder ser sensible.`
          );
          setTimeout(() => setErrorLog(""), 7000);
          return;
        }
        setVariableSensible(botonSeleccionado);
        setBotonSeleccionado("");
      } else {
        setErrorLog(
          `Variable ${botonSeleccionado} ya es de tipo salida, deseleccionala primero.`
        );
        setTimeout(() => setErrorLog(""), 7000);
        return;
      }
    } else if (instruccion === "salida") {
      if (botonSeleccionado !== variableSensible) {
        if (variablesEntrada.includes(botonSeleccionado)) {
          setErrorLog(
            `Variable ${botonSeleccionado} ya es de tipo entrada o sensible, deseleccionala primero.`
          );
          setTimeout(() => setErrorLog(""), 7000);
          return;
        }
        setVariableSalida(botonSeleccionado);
        setBotonSeleccionado("");
      }
    }
  };
  const entrenar = async () => {
    if (!archivoSalarial?.id_archivo) {
      setTimeout(() => setErrorLog(""), 7000);
      setErrorLog("No hay archivo cargado.");
      return;
    }
    if (!variableSalida || variablesEntrada.length === 0) {
      setTimeout(() => setErrorLog(""), 7000);
      setErrorLog("Debe asignar variables de entrada y salida.");
      return;
    }
    if (!modeloEscogido) {
      setErrorLog("Debe seleccionar un modelo.");
      setTimeout(() => setErrorLog(""), 7000);
      return;
    }
    if (forceClassifier) {
      const result = await Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "No se recomienda forzar la clasificación en variables de salida numéricas continuas. ¿Desea continuar de todas formas?",
        showCancelButton: true,
        confirmButtonText: "Generar de todas formas",
        cancelButtonText: "Cancelar",
      });
      if (!result.isConfirmed) {
        return;
      }
    }

    const body = {
      id_archivo: archivoSalarial.id_archivo,
      modelType: modeloEscogido, // o el tipo que corresponda
      target: variableSalida,
      features: variablesEntrada,
      sensitiveFeature: variableSensible || undefined,
    };

    Swal.fire({
      title: "Generando gráfico...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`${API_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw error;
        }
        return res.json();
      })
      .then((resultados) => {
        Swal.fire({
          title: "Modelo entrenado con éxito",
          text: "Baja a ver los resultados.",
          icon: "success",
          width: 600,
        });

        if (resultados?.overfitting_plot) {
          setImgBase64Overfitting(resultados.overfitting_plot);
        }
        if (resultados?.fairness_plot) {
          setImgBase64Fairness(resultados.fairness_plot);
        }
      })
      .catch((error) => {
        console.log(error.errorMssg);
        Swal.fire({
          title: "Error al ejecutar el modelo",
          text: error.errorMssg || error.error || "Error desconocido",
          icon: "error",
        });
      });
  };
  return (
    <>
      <div className="train">
        <div className="container-train">
          <div className="panel-variable">
            <div className="panel-arriba">
              <h2>Asignar variable seleccionada</h2>
              <div className="botones">
                <button
                  className="entrada"
                  onClick={() => asignarBoton("entrada")}
                >
                  Variables de entrada
                </button>
                <button
                  className="sensible"
                  onClick={() => asignarBoton("sensible")}
                >
                  Variable sensible
                </button>
                <button
                  className="salida"
                  onClick={() => asignarBoton("salida")}
                >
                  Variables de salida
                </button>
              </div>
              {botonSeleccionado !== "" ? (
                <p className="tipo-variable">
                  Tipo de variable:{" "}
                  <span>
                    {tiposVariables[botonSeleccionado] || "Desconocido"}
                  </span>
                </p>
              ) : (
                <p className="tipo-variable">Escoge una variable.</p>
              )}
            </div>
            <div className="variables-container">
              <h3>Variables</h3>
              <div className="variables">
                {archivoSalarial?.contenido?.[0]?.fila_registro ? (
                  Object.keys(
                    JSON.parse(archivoSalarial.contenido[0].fila_registro)
                  ).map((key) => (
                    <button
                      className={
                        botonesNoDisponibles.includes(key)
                          ? "btn-2 disabled"
                          : "btn-2"
                      }
                      key={key}
                      onClick={() => {
                        setBotonSeleccionado(key);
                      }}
                    >
                      {key}
                    </button>
                  ))
                ) : (
                  <p>No hay variables disponibles.</p>
                )}
              </div>
              <div className="options">
                <button
                  className="btn red"
                  onClick={() => {
                    if (!botonSeleccionado) return;
                    if (botonSeleccionado === variableSensible) {
                      setVariableSensible("");
                    } else if (botonSeleccionado === variableSalida) {
                      setVariableSalida("");
                    } else if (variablesEntrada.includes(botonSeleccionado)) {
                      let nuevasVariablesEntrada = variablesEntrada;
                      nuevasVariablesEntrada = nuevasVariablesEntrada.filter(
                        (b) => b !== botonSeleccionado
                      );
                      setVariablesEntrada(nuevasVariablesEntrada);
                    }
                    setVariablesEntrada((prev) =>
                      prev.filter((v) => v !== botonSeleccionado)
                    );
                    setBotonSeleccionado("");
                  }}
                >
                  Desasignar variable
                </button>
                <button
                  className="btn green"
                  onClick={() => {
                    if (!archivoSalarial?.contenido?.[0]?.fila_registro) return;

                    const allVariables = Object.keys(
                      JSON.parse(archivoSalarial.contenido[0].fila_registro)
                    );

                    const usedVariables = new Set([
                      variableSalida,
                      variableSensible,
                      ...variablesEntrada,
                    ]);
                    setVariablesEntrada(
                      allVariables.filter((v) => !usedVariables.has(v))
                    );
                  }}
                >
                  Rellenar a variables de entrada
                </button>
              </div>
            </div>
          </div>
          <div className="resumen">
            <h2>Resumen</h2>
            <div className="resumen-variables">
              <div className="pill-entrada">
                <strong>Variables de entrada:</strong>
                <ul className="entradas">
                  {variablesEntrada.length > 0 ? (
                    variablesEntrada.map((v) => <li key={v}>{v}</li>)
                  ) : (
                    <li>No asignadas</li>
                  )}
                </ul>
              </div>
              <div className="pill-salida">
                <strong>Variable de salida:</strong>
                <p>{variableSalida || "No asignada"}</p>
              </div>
              <div className="pill-sensible">
                <strong>Variable sensible:</strong>
                <p>{variableSensible || "No asignada"}</p>
              </div>
              {errorLog !== "" && (
                <div className="pill-error">
                  <strong>Error:</strong>
                  <p>{errorLog}</p>
                </div>
              )}
            </div>
            <div className="modelo-info">
              <div className="tipo-modelo">
                <strong>Tipo de modelo:</strong>
                <span>
                  {variableSalida !== ""
                    ? tiposVariables[variableSalida] === "categórico" ||
                      forceClassifier
                      ? "Clasificador"
                      : "Regresión"
                    : "N/A"}
                </span>
              </div>
              <div className="forzar-clasificador">
                <label>
                  <input
                    type="checkbox"
                    checked={forceClassifier}
                    onChange={() => setForceClassifier((prev) => !prev)}
                  />
                  <span className="custom-checkbox" />
                  Forzar clasificador
                </label>
              </div>
            </div>
            <div className="modelo-selector">
              <label htmlFor="modelo-select">
                <strong>Modelo:</strong>
              </label>
              <select
                id="modelo-select"
                value={modeloEscogido}
                onChange={(e) => setModeloEscogido(e.target.value)}
                className="combo-modelos"
              >
                {variableSalida !== "" ? (
                  <option value="">-- Seleccione un modelo --</option>
                ) : (
                  <option value="">-- Seleccione una salida --</option>
                )}
                {variableSalida !== "" ? (
                  tiposVariables[variableSalida] === "categórico" ||
                  forceClassifier ? (
                    modelos.classifier?.map((modelo) => (
                      <option key={modelo} value={modelo}>
                        {modelo}
                      </option>
                    ))
                  ) : (
                    modelos.regression?.map((modelo) => (
                      <option key={modelo} value={modelo}>
                        {modelo}
                      </option>
                    ))
                  )
                ) : (
                  <></>
                )}
              </select>
            </div>
            <button className="btn-1" onClick={entrenar}>
              Entrenar
            </button>
          </div>
        </div>
        {imgBase64Overfitting && (
          <div className="train-img" id="results">
            <div className="img-container">
              <h3>Test overfitting</h3>
              <img
                src={`data:image/png;base64,${imgBase64Overfitting}`}
                alt="Resultado del modelo"
              />
              <button
                className="btn-1"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = `data:image/png;base64,${imgBase64Overfitting}`;
                  link.download = "grafico.png";
                  link.click();
                }}
              >
                Descargar PNG
              </button>
            </div>
            {imgBase64Fairness && (
              <div className="img-container">
                <h3>Test equidad por {variableSensible}</h3>
                <img
                  src={`data:image/png;base64,${imgBase64Fairness}`}
                  alt="Equidad del modelo"
                />
                <button
                  className="btn-1"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = `data:image/png;base64,${imgBase64Fairness}`;
                    link.download = "grafico.png";
                    link.click();
                  }}
                >
                  Descargar PNG
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Train;
