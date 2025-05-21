import React from "react";

const Formulario: React.FC = () => (
  <div className="formulario">
    <h3 className="formulario__title">Bienvenido, &lt;nombre&gt;</h3>
    <p className="formulario__subtitle">
      Selecciona o carga un conjunto de datos existentes para comenzar el
      análisis de brechas.
    </p>
    <div className="formulario__upload">
      <input type="file" className="formulario__file" />
      <button className="btn btn--primary">Subir csv</button>
    </div>
  </div>
);

export default Formulario;
