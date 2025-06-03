import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../../contexts/ArchivoSalarialContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGraphVariables } from "../../../../contexts/GraphContext";
const API_URL = import.meta.env.VITE_API_URL;

const graficasMap = {
  count: "Gráfico de conteo",
  hist: "Histograma con polígono de frecuencia",
  box: "Gráfico de cajas y bigotes",
  violin: "Gráfico de violín",
};

type FormValues = {
  graphType: string;
  variable: string;
};

const Univariable: React.FC = () => {
  const { variablesTotales, setImgBase64 } = useGraphVariables();
  const { archivoSalarial } = useArchivoSalarial();
  const [tiposGraficas, setTiposGraficas] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { graphType: "", variable: "" },
  });

  const variableSeleccionada = watch("variable");

  useEffect(() => {
    fetch(`${API_URL}/ai/graphs`)
      .then((res) => res.json())
      .then((data) => {
        const univariableData = data.univariable;
        if (Array.isArray(univariableData)) {
          setTiposGraficas(univariableData);
        }
      })
      .catch(() => {
        // handle error silently
      });
  }, []);

  const onSubmit = async (data: FormValues) => {
    const { graphType, variable } = data;
    if (!graphType || !variable) return;

    try {
      Swal.fire({
        title: "Generando gráfico...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(`${API_URL}/ai/univariable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: variable,
          graphType,
          id_archivo: archivoSalarial?.id_archivo,
        }),
      });

      if (!response.ok) throw new Error("Error al generar el gráfico");

      const resData = await response.json();
      if (resData?.image) {
        setImgBase64(resData.image);
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
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <label>Tipo de gráfico</label>
            <select {...register("graphType", { required: true })}>
              <option value="">Seleccione un tipo de gráfico</option>
              {tiposGraficas.map((value) => (
                <option key={value} value={value}>
                  {graficasMap[value as keyof typeof graficasMap]}
                </option>
              ))}
            </select>
            {errors.graphType && <span>Este campo es obligatorio.</span>}
          </div>

          <div className="field-group">
            <label>Variable</label>
            <select {...register("variable", { required: true })}>
              <option value="">Seleccione una variable</option>
              {variablesTotales.map((variable) => (
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
            {errors.variable && <span>Este campo es obligatorio.</span>}

            {variableSeleccionada && (
              <div className="selected-vars">
                <div className="selected-var">
                  {variableSeleccionada}
                  <button
                    type="button"
                    className="btn-remove-var"
                    onClick={() => setValue("variable", "")}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn--primary generate-btn-new">
            Generar gráfico
          </button>
        </form>
      </section>
    </main>
  );
};

export default Univariable;
