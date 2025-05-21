import React from "react";
import NavbarDashboard from "../../../components/NavbarDashboard";
import SubirCargarArchivo from "../../../components/SubirCargarArchivo";
import CardButton from "../../../components/CardButton";
import "./home.scss";

const Dashboard: React.FC = () => (
  <div className="dashboard">
    <NavbarDashboard />
    <main className="dashboard__content">
      <SubirCargarArchivo />
      <div className="dashboard__cards">
        {/*Último dataset */}
        <CardButton title="Último dataset usado" buttonText="Usar este">
          <span className="card__name">&lt;Nombre-archivo&gt;</span>{" "}
          <span className="card__attr">&lt;fecha&gt;</span>{" "}
          <span className="card__attr">&lt;tamaño&gt;</span>
        </CardButton>

        {/* Link a Kaggle */}
        <CardButton title="Buscar datasets" buttonText="Entrar a kaggle">
          <span className="card__name">Buscar datasets en Kaggle</span>
        </CardButton>
      </div>
    </main>
  </div>
);

export default Dashboard;
