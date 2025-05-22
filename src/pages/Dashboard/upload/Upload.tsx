import { useState } from "react";
import CardButton from "../../../components/CardButton";
import "./upload.scss";
import { UploadIcon } from "lucide-react";
import Papa from "papaparse";
import type { ArchivoSalarialReducido } from "../../../models/ArchivoSalarial";
import Swal from "sweetalert2";
import { useUsuario } from "../../../contexts/UsuarioContext";
const API_URL = import.meta.env.VITE_API_URL;

const Upload = () => {
  const { usuario } = useUsuario();
  const [uploadText, setUploadText] = useState(
    "Arrastra tu archivo CSV aquí o haz clic para seleccionarlo"
  );
  const [registrosJson, setRegistrosJson] = useState(
    null as unknown as unknown[]
  );
  const [archivoSalarial, setArchivoSalarial] = useState(
    null as unknown as ArchivoSalarialReducido
  );

  const uploadToApi = async () => {
    try {
      const response = await fetch(`${API_URL}/archivossalariales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...archivoSalarial, registros: registrosJson }),
      });
      const responseJson = await response.json();
      if (!responseJson.error) {
        Swal.fire({
          icon: "success",
          title: "Archivo cargado",
          text: `Archivo cargado en el sistema con éxito.`,
        }).then(() => {
          window.location.assign("/dashboard/home");
        });
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado al cargar el archivo.",
      });
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    let files: FileList | null = null;
    // Verificar si se arrastró o se subió un archivo
    if ("dataTransfer" in e) {
      files = e.dataTransfer.files;
    } else if ("target" in e && e.target instanceof HTMLInputElement) {
      files = e.target.files;
    }
    // Lógica de manejo de archivos
    if (!files || files.length === 0) {
      setUploadText("No se seleccionó ningún archivo.");
      return;
    }
    const file = files[0];
    if (file.name.length > 255) {
      setUploadText("El nombre del archivo excede los 255 caracteres.");
      return;
    }
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setUploadText("Tipo de archivo inválido, ingresa un archivo CSV.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadText("El archivo excede el tamaño máximo de 10MB.");
      return;
    }
    setUploadText(`Archivo seleccionado: ${file.name}`);
    setArchivoSalarial({
      id_usuario: usuario!.id_usuario,
      nombre_archivo: file.name,
      tamano: file.size,
      formato:
        file.type ||
        (file.name.split(".").pop() ? `.${file.name.split(".").pop()}` : ""),
    });

    // Guardar el JSON de los registros del archivo
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
      // result.data es tu JSON
      setRegistrosJson(result.data); // Usa un useState para guardar el JSON
    };
    reader.readAsText(file);
  };
  return (
    <div className="upload-container">
      <div className="upload-text-card">
        <CardButton title="Subir documento" noBg={true}>
          <span className="card__name">
            Arrastra tu archivo aquí o haz clic para seleccionarlo
          </span>
        </CardButton>
      </div>
      <div
        className="upload-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => handleFileUpload(e)}
        onClick={() => document.getElementById("csv-upload-input")?.click()}
      >
        <input
          type="file"
          accept=".csv"
          id="csv-upload-input"
          multiple={false}
          onChange={(e) => handleFileUpload(e)}
        />
        <UploadIcon />
        <div>
          <label htmlFor="csv-upload-input">{uploadText}</label>
          {archivoSalarial === null && (
            <>
              <label htmlFor="csv-upload-input">Formatos válidos: CSV</label>
              <label htmlFor="csv-upload-input">Tamaño máximo: 10MB</label>
            </>
          )}
        </div>
      </div>
      <div className="upload-options">
        <button onClick={() => uploadToApi()}>Subir dataset</button>
      </div>
    </div>
  );
};

export default Upload;
