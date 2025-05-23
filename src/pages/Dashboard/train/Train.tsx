import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../contexts/ArchivoSalarialContext";
import "./train.scss";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

const Train = () => {
  const { archivoSalarial } = useArchivoSalarial();
  const [botonesAsignados, setBotonesAsignados] = useState<string[]>([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState("");
  const [variablesEntrada, setVariablesEntrada] = useState<string[]>([]);
  const [variableSalida, setVariableSalida] = useState("");
  const [variableSensible, setVariableSensible] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [tiposVariables, setTiposVariables] = useState<Record<string, string>>(
    {}
  );
  const [modelos, setModelos] = useState<string[]>([]);
  const [modeloEscogido, setModeloEscogido] = useState("");
  const [imgBase64, setImgBase64] = useState<string>("");
  useEffect(() => {
    fetch(`${API_URL}/ai/modelos`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
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
  const asignarBoton = (instruccion: string) => {
    if (!botonSeleccionado) return;

    if (instruccion === "entrada") {
      if (
        !variablesEntrada.includes(botonSeleccionado) &&
        botonSeleccionado !== variableSalida &&
        botonSeleccionado !== variableSensible
      ) {
        setVariablesEntrada([...variablesEntrada, botonSeleccionado]);
        setBotonesAsignados([...botonesAsignados, botonSeleccionado]);
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
      }
    } else if (instruccion === "salida") {
      if (
        botonSeleccionado !== variableSensible &&
        !variablesEntrada.includes(botonSeleccionado)
      ) {
        // Remove previous variableSalida from botonesAsignados if exists
        let nuevosBotonesAsignados = botonesAsignados;
        if (variableSalida) {
          nuevosBotonesAsignados = nuevosBotonesAsignados.filter(
            (b) => b !== variableSalida
          );
        }
        nuevosBotonesAsignados = [...nuevosBotonesAsignados, botonSeleccionado];
        setVariableSalida(botonSeleccionado);
        setBotonesAsignados([...botonesAsignados, botonSeleccionado]);
        setBotonSeleccionado("");
      }
    }
  };
  const entrenar = () => {
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

    const body = {
      fileId: archivoSalarial.id_archivo,
      modelType: modeloEscogido, // o el tipo que corresponda
      target: variableSalida,
      features: variablesEntrada,
      sensitiveFeature: variableSensible || undefined,
    };

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
          icon: "success",
          width: 600,
        });
        if (resultados?.actual_vs_predicted_plot) {
          setImgBase64(resultados.actual_vs_predicted_plot);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al ejecutar el modelo",
          text: error.errorMssg.error || error.error || "Error desconocido",
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
                        botonesAsignados.includes(key)
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
              <button
                className="btn"
                onClick={() => {
                  if (!botonSeleccionado) return;
                  let nuevosBotonesAsignados = botonesAsignados;
                  if (botonSeleccionado === variableSensible) {
                    console.log("why");
                    nuevosBotonesAsignados = nuevosBotonesAsignados.filter(
                      (b) => b !== botonSeleccionado
                    );
                    setVariableSensible("");
                  } else if (botonSeleccionado === variableSalida) {
                    nuevosBotonesAsignados = nuevosBotonesAsignados.filter(
                      (b) => b !== botonSeleccionado
                    );
                    setVariableSalida("");
                  } else if (variablesEntrada.includes(botonSeleccionado)) {
                    let nuevasVariablesEntrada = variablesEntrada;
                    nuevasVariablesEntrada = nuevasVariablesEntrada.filter(
                      (b) => b !== botonSeleccionado
                    );
                    nuevosBotonesAsignados = nuevosBotonesAsignados.filter(
                      (b) => b !== botonSeleccionado
                    );
                    setVariablesEntrada(nuevasVariablesEntrada);
                  }
                  setVariablesEntrada((prev) =>
                    prev.filter((v) => v !== botonSeleccionado)
                  );
                  setBotonesAsignados(nuevosBotonesAsignados);
                  setBotonSeleccionado("");
                }}
              >
                Desasignar variable
              </button>
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
                <option value="">-- Seleccione un modelo --</option>
                {modelos.map((modelo) => (
                  <option key={modelo} value={modelo}>
                    {modelo}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-1" onClick={entrenar}>
              Entrenar
            </button>
          </div>
        </div>
        {imgBase64 && (
          <div className="img-container">
            <h3>Imagen generada</h3>
            <img
              src={`data:image/png;base64,${imgBase64}`}
              alt="Resultado del modelo"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Train;
