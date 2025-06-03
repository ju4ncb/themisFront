import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../../contexts/ArchivoSalarialContext";
import Swal from "sweetalert2";
import { useGraphVariables } from "../../../../contexts/GraphContext";
import { useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL;

const graficasMap = {
  reg: "Gráfico de regresión",
  hist: "Histograma",
  box: "Gráfico de cajas y bigotes",
  bar: "Gráfico de barra",
};

type FormValues = {
  graphType: string;
  x: string;
  y: string;
  hue?: string;
};

const Bivariable: React.FC = () => {
  const { variablesTotales, setImgBase64 } = useGraphVariables();
  const { archivoSalarial } = useArchivoSalarial();
  const [tiposGraficas, setTiposGraficas] = useState<string[]>([]);
  const [formError, setFormError] = useState("");
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const watchGraphType = watch("graphType");

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

  const countUniqueValues = (variable: string): number => {
    if (!archivoSalarial?.contenido?.length) return 0;

    const unique = new Set(
      archivoSalarial.contenido.map((row) => {
        const parsed = JSON.parse(row.fila_registro);
        return parsed[variable];
      })
    );

    return unique.size;
  };

  const isNumericVariable = (variable: string): boolean => {
    if (!archivoSalarial?.contenido?.length) return false;

    const values = archivoSalarial.contenido.map((r) =>
      Number(JSON.parse(r.fila_registro)[variable])
    );

    const validValues = values.filter((v) => !isNaN(v));
    return validValues.length === values.length;
  };

  const filterVars = (isNumericOnly: boolean) =>
    variablesTotales.filter((v) =>
      isNumericOnly ? isNumericVariable(v) : true
    );

  const numericVariables = variablesTotales.filter((variable) => {
    if (!archivoSalarial?.contenido?.length) return false;
    const fila = JSON.parse(archivoSalarial.contenido[0].fila_registro);
    const value = fila[variable];
    return value !== "" && !isNaN(Number(value));
  });

  const disableNumericOnlyGraphs = numericVariables.length < 2;

  const onSubmit = async (data: FormValues) => {
    setFormError("");
    const { graphType, x, y, hue } = data;

    if (!graphType || !x || !y) {
      let error = "Por favor seleccione ";
      let errorFields = [];
      if (!graphType) errorFields.push("el tipo de gráfico");
      if (!x) errorFields.push("X");
      if (!y) errorFields.push("Y");

      setFormError(error + errorFields.join(", ") + ".");
      return;
    }

    const xIsNum = isNumericVariable(x);
    const yIsNum = isNumericVariable(y);

    if ((graphType === "reg" || graphType === "hist") && (!xIsNum || !yIsNum)) {
      setFormError("Las variables X e Y deben ser numéricas.");
      return;
    }

    if ((graphType === "bar" || graphType === "box") && xIsNum && yIsNum) {
      const xUnique = countUniqueValues(x);
      const yUnique = countUniqueValues(y);

      if (xUnique > 15 || yUnique > 15) {
        await Swal.fire({
          icon: "warning",
          title: "Demasiadas categorías",
          text: "Hay muchas categorías para este tipo de gráfico. Considere usar regresión o histograma.",
        });
        return;
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
          graphType,
          x,
          y,
          hue: hue || undefined,
          id_archivo: archivoSalarial?.id_archivo,
        }),
      });

      const result = await response.json();
      if (result.image) {
        setImgBase64(result.image);
      } else {
        setFormError("No se recibió imagen del servidor.");
      }
    } catch (err: any) {
      setFormError(err.message || "No se pudo generar el gráfico.");
    }
    Swal.close();
  };
  return (
    <main className="graphs-form">
      <section className="form-panel-new">
        <h1 className="form-title">Generar análisis bivariable</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="field-group">
            <label>Tipo de gráfico</label>
            <select {...register("graphType")}>
              <option value="">Seleccione un tipo de gráfico</option>
              {tiposGraficas.map((type) => (
                <option
                  key={type}
                  value={type}
                  disabled={
                    disableNumericOnlyGraphs &&
                    (type === "reg" || type === "hist")
                  }
                >
                  {graficasMap[type as keyof typeof graficasMap]}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Variable horizontal (X)</label>
            <select {...register("x")}>
              <option value="">Seleccione una variable</option>
              {filterVars(
                watchGraphType === "reg" || watchGraphType === "hist"
              ).map((variable) => (
                <option key={variable} value={variable}>
                  {variable} (
                  {isNumericVariable(variable) ? "numérica" : "categórica"})
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Variable vertical (Y)</label>
            <select {...register("y")}>
              <option value="">Seleccione una variable</option>
              {filterVars(
                watchGraphType === "reg" || watchGraphType === "hist"
              ).map((variable) => (
                <option key={variable} value={variable}>
                  {variable} (
                  {isNumericVariable(variable) ? "numérica" : "categórica"})
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Variable diferenciadora (Opcional)</label>
            <select {...register("hue")}>
              <option value="">Seleccione una variable</option>
              {variablesTotales.map((variable) => (
                <option key={variable} value={variable}>
                  {variable} (
                  {isNumericVariable(variable) ? "numérica" : "categórica"})
                </option>
              ))}
            </select>
          </div>

          {formError && <span className="error-text">{formError}</span>}

          <button className="btn btn--primary generate-btn-new" type="submit">
            Generar gráfico
          </button>
        </form>
      </section>
    </main>
  );
};

export default Bivariable;
