// src/pages/Dashboard/recommendations/Recommendations.tsx

import React from "react";
import { Info, Check, Calendar } from "lucide-react";
import "./Recommendations.scss";

interface Recomendacion {
  prioridad: "alta" | "media" | "baja";
  texto: string;
  id_resultado: string;
  created_at: string;
}

const mock: Recomendacion = {
  prioridad: "alta",
  texto: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex.`,
  id_resultado: "12345",
  created_at: "2025-05-22",
};

const Recommendations: React.FC = () => {
  // En un caso real traerías la recomendación desde tu API/context
  const rec = mock;

  return (
    <div className="recommendations-page">
      <main className="recommendations-content">
        <h1 className="page-title">Recomendaciones</h1>

        <div className="recommendation-card">
          {/* Prioridad */}
          <div className="field">
            <Info size={18} className="icon" />
            <span className="label">Prioridad:</span>
            <span className={`priority-dot ${rec.prioridad}`}></span>
          </div>

          {/* Texto */}
          <div className="field">
            <Check size={18} className="icon" />
            <span className="label">Recomendación:</span>
          </div>
          <p className="recommendation-text">{rec.texto}</p>

          {/* Id Resultado */}
          <div className="field">
            <span className="spacer" />
            <span className="label">Resultado asociado:</span>
            <span className="value">{rec.id_resultado}</span>
          </div>

          {/* Fecha */}
          <div className="field">
            <Calendar size={18} className="icon" />
            <span className="label">Fecha creación:</span>
            <span className="value">{rec.created_at}</span>
          </div>
        </div>

        <button
          className="btn btn--secondary back-button"
          onClick={() => window.location.assign("/dashboard/home")}
        >
          Volver
        </button>
      </main>
    </div>
  );
};

export default Recommendations;
