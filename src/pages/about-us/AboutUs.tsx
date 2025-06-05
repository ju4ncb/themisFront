import React from "react";
import member1 from "../../assets/juan.jpg";
import member2 from "../../assets/kevin.jpg";
import member3 from "../../assets/francisco.jpg";
import member4 from "../../assets/david.jpg";
import member5 from "../../assets/andres.jpg";
import member6 from "../../assets/juanp.jpg";
import member7 from "../../assets/juanm.jpg";
import member8 from "../../assets/julio.jpg";
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
  
    <div className="team-section">
      <h2 className="team-title">Miembros de nuestro equipo</h2>
      <div className="team-grid">
        <div className="team-member">
          <img src={member1} alt="Juan Caballero" />
          <div className="info">
            <a className="name">Juan Caballero</a>
            <span>FULLSTACK & GROUP LEADER</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member2} alt="Kevin Yepez" />
          <div className="info">
            <a className="name">Kevin Yepez</a>
            <span>UX TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member3} alt="Francisco Sosa" />
          <div className="info">
            <a  className="name">Francisco Sosa</a>
            <span>FRONT TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member4} alt="David Arroyo" />
          <div className="info">
            <a  className="name">David Arroyo</a>
            <span>UX TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member5} alt="Andres Solano" />
          <div className="info">
            <a className="name">Andres Solano</a>
            <span>FRONT TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member6} alt="Juan Perez" />
          <div className="info">
            <a  className="name">Juan Perez</a>
            <span>BACK TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member7} alt="Juan Montenegro" />
          <div className="info">
            <a className="name">Juan Montenegro</a>
            <span>UX TEAM</span>
          </div>
        </div>

        <div className="team-member">
          <img src={member8} alt="Julio Escobar" />
          <div className="info">
            <a  className="name">Julio Escobar</a>
            <span>UX TEAM</span>
          </div>
        </div>
        
      </div>
      
    </div>

    <div className="tech-section">
      <h2 className="tech-title">Tecnologías usadas</h2>
       <ul className="tech-list">
        <li><strong>Python & Flask:</strong> Backend desarrollado con Flask, framework ligero y potente de Python, para construir APIs y manejar procesamiento de datos.</li>
        <li><strong>Base de datos SQL:</strong> Utilizamos MySQL para gestionar y almacenar de forma estructurada datos de los usuarios y resultados analíticos.</li>
        <li><strong>Node.js & TypeScript:</strong> Empleamos Node.js junto con TypeScript para crear una arquitectura escalable del lado del servidor y facilitar la interacción entre el frontend y el backend.</li>
        <li><strong>Entrenamiento de modelos de IA:</strong> Incorporamos bibliotecas de Machine Learning como Scikit-learn y Pandas para entrenar modelos capaces de detectar patrones y desigualdades en los datos salariales.</li>
        <li><strong>Visualización de datos:</strong> Generamos gráficos interactivos y personalizados que permiten interpretar rápidamente los resultados y tomar decisiones informadas.</li>
       </ul>
     </div>

  </div>
  
);

export default AboutUs;
