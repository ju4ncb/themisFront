import React from "react";
import Navbar from "../../../components/Navbar";
import Formulario from "../../../components/Formulario";
import Card from "../../../components/Card";
import { RefreshCcw } from "lucide-react";

const Dashboard: React.FC = () => (
  <div className="dashboard">
    <Navbar />
    <main className="dashboard__content">
      <Formulario />

      <div className="dashboard__cards">
        {/*Último dataset */}
        <Card Icon={RefreshCcw} number={0}>
          <div className="card__info">
            <span className="card__name">&lt;Nombre-archivo&gt;</span>
            <span className="card__date">&lt;fecha&gt;</span>
          </div>
          <button className="btn btn--secondary">
            Continuar con el último dataset
          </button>
        </Card>

        {/* Link a Kaggle */}
        <Card number={0}>
          <div className="card__info">
            <span className="card__name">Buscar datasets en Kaggle</span>
            <a
              href="https://www.kaggle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card__link"
            >
              www.kaggle.com
            </a>
          </div>
        </Card>
      </div>
    </main>
  </div>
);

export default Dashboard;
