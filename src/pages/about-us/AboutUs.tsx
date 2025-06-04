import React from "react";
import collage1 from "../../assets/collage-jajd.png";
import collage2 from "../../assets/collage-fjkj.png";
import "./AboutUs.scss";

const AboutUs: React.FC = () => (
  <div className="about-section">
    <h1 className="title">Sobre nosotros</h1>
   <div className="about-container">
      <div className="block">
        <h2>Introducción a Themis</h2>
        <h3>¿Quiénes somos?</h3>
        <p>
          Somos estudiantes de Ingeniería de Sistemas de la Universidad Simón Bolívar, actualmente en séptimo semestre.
          Estamos desarrollando Themis, una plataforma beta que transforma datos CSV en ideas accionables usando Machine Learning.
        </p>
        <br />
        <p>
          Nuestro propósito es empoderar a la comunidad con información clara, convertir datos en historias reveladoras y abrir nuevas puertas a la innovación.
        </p>
      </div>
      <div className="block">
        <h2>Nuestro ODS</h2>
        <h3>Compromiso con el ODS 8 </h3>
        <p>
          Themis promueve el crecimiento económico inclusivo al proporcionar a las organizaciones una herramienta accesible
          para analizar datos salariales y detectar desigualdades. Al facilitar la creación de modelos de inteligencia artificial 
          para identificar brechas salariales, ayudamos a las empresas a tomar decisiones más justas y transparentes.
        </p>
        <br />
        <p>
          Nuestra plataforma busca fomentar entornos laborales más equitativos, donde la igualdad de oportunidades y el salario justo sean una realidad.
        </p>
      </div>
    </div>
  </div>
);

export default AboutUs;
