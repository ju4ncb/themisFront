import React from "react";
import { FileText, Database, Activity } from "lucide-react";
import "./Graphs.scss";

const Graphs: React.FC = () => {
  return (
    <div className="graphs-page">
      <main className="graphs-content-new">
        {/* Formulario grande a la izquierda */}
        <section className="form-panel-new">
          <h1 className="form-title">Generar gráfico</h1>

          <div className="field-group">
            <label>Tipo de gráfico</label>
            <select>
              <option>ComboBox</option>
            </select>
          </div>

          <div className="field-group">
            <label>Variable horizontal</label>
            <select>
              <option>ComboBox</option>
            </select>
            <button type="button" className="btn-add-var">
              Añadir variable horizontal
            </button>
          </div>

          <div className="field-group">
            <label>Variable vertical</label>
            <select>
              <option>ComboBox</option>
            </select>
          </div>

          <div className="field-group">
            <label>Variable diferenciadora</label>
            <select>
              <option>ComboBox</option>
            </select>
          </div>

          <button className="btn btn--primary generate-btn-new">
            Generar gráfico
          </button>
        </section>

        {/* Tarjetas derecha */}
        <aside className="cards-panel">
          <div className="card-small dataset-card">
            <FileText className="card-icon" />
            <div className="card-content">
              <h2>Dataset actual</h2>
              <p>
                Nombre: <strong>themis.csv</strong>
              </p>
              <p>
                Tamaño: <strong>420kb</strong>
              </p>
            </div>
          </div>

          <div className="card-small summary-card">
            <Database className="card-icon" />
            <div className="card-content">
              <h2>Resumen</h2>
              <p>
                Valores nulos: <strong>0</strong>
              </p>
              <p>
                Numericas: <strong>4</strong>
              </p>
              <p>
                Categoricas: <strong>2</strong>
              </p>
            </div>
          </div>
        </aside>

        {/* Gráfico y botón abajo derecha */}
        <section className="chart-panel">
          <div className="chart-placeholder">
            <Activity size={64} />
          </div>
          <button className="btn btn--secondary download-btn-new">
            Generar PNG
          </button>
        </section>
      </main>
    </div>
  );
};

export default Graphs;
