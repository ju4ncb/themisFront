import React from "react";

const SubirCargarArchivo: React.FC = () => (
  <div className="dashboard__subir-cargar-archivo">
    <h1 className="dashboard__subir-cargar-archivo__title">
      Bienvenido, &lt;nombre&gt;
    </h1>
    <p>
      Selecciona o carga un conjunto de datos existentes para comenzar el
      análisis de brechas.
    </p>
    <section className="dashboard__subir-cargar-archivo__opciones">
      <select
        id="archivo-select"
        className="dashboard__subir-cargar-archivo__select"
      >
        <option value="">-- Elige un archivo --</option>
        <option value="archivo1.csv">archivo1.csv</option>
        <option value="archivo2.csv">archivo2.csv</option>
        <option value="archivo3.csv">archivo3.csv</option>
      </select>
      <button>Subir csv</button>
    </section>
  </div>
);

export default SubirCargarArchivo;
