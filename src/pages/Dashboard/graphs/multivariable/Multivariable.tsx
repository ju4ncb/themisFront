import { useEffect, useState } from "react";
import { useArchivoSalarial } from "../../../../contexts/ArchivoSalarialContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGraphVariables } from "../../../../contexts/GraphContext";
const API_URL = import.meta.env.VITE_API_URL;

const graficasMap = {
  corr: "Gráfico de correlación",
};

type FormValues = {
  graphType: string;
  cols: string[];
};

const Multivariable: React.FC = () => {
  const { variablesTotales, setImgBase64 } = useGraphVariables();
  const { archivoSalarial } = useArchivoSalarial();
  const [tiposGraficas, setTiposGraficas] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { graphType: "", cols: [] },
  });

  useEffect(() => {
    fetch(`${API_URL}/ai/graphs`)
      .then((res) => res.json())
      .then((data) => {
        const multivariableData = data.multivariable;
        if (Array.isArray(multivariableData)) {
          setTiposGraficas(multivariableData);
        }
      })
      .catch(() => {
        // handle error silently
      });
  }, []);

  // Establecer todas las variables como seleccionadas por defecto
  useEffect(() => {
    if (variablesTotales.length > 0) {
      setValue("cols", variablesTotales);
    }
  }, [variablesTotales, setValue]);

  const onSubmit = async (data: FormValues) => {
    const { graphType, cols } = data;
    if (!graphType || cols.length === 0) return;

    try {
      Swal.fire({
        title: "Generando gráfico...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(`${API_URL}/ai/multivariable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cols,
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
        <h1 className="form-title">Generar análisis multivariable</h1>
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
            <label>Variables</label>
            <select
              onChange={(e) => {
                const selected = e.target.value;
                const current = watch("cols") || [];

                const nuevaLista = selected
                  ? Array.from(new Set([...current, selected])) // evita duplicados
                  : current;

                setValue("cols", nuevaLista, { shouldValidate: true });
              }}
            >
              <option value="">Seleccione una variable</option>
              {variablesTotales
                .filter((v) => !(watch("cols") || []).includes(v))
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

            {/* Mostrar chips */}
            <div className="selected-vars">
              {(watch("cols") || []).map((v: string) => (
                <div className="selected-var" key={v}>
                  {v}
                  <button
                    type="button"
                    className="btn-remove-var"
                    onClick={() => {
                      const nuevaLista = (watch("cols") || []).filter(
                        (val) => val !== v
                      );
                      setValue("cols", nuevaLista, { shouldValidate: true });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {errors.cols && (
              <span>Debe seleccionar al menos una variable.</span>
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

export default Multivariable;
