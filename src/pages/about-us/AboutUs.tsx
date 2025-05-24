import React from "react";
import collage1 from "../../assets/collage-jajd.png";
import collage2 from "../../assets/collage-fjkj.png";
import "./AboutUs.scss";

const AboutUs: React.FC = () => (
  <div className="about-page">
    <h1 className="about-page__title">Sobre nosotros</h1>

    <div className="about-page__grid">
      {/* Texto */}
      <section className="about-page__text">
        <p>
          Somos estudiantes de Ingeniería de Sistemas de la Universidad Simón
          Bolívar, cursando el séptimo semestre y desarrollando{" "}
          <strong>Themis</strong>, una plataforma beta que transforma datos CSV
          en ideas accionables mediante Machine Learning.
          <br />
          <br />
          Nuestro objetivo es empoderar a la comunidad con información precisa,
          convertir cada conjunto de datos en historias reveladoras y abrir
          nuevas posibilidades de innovación.
        </p>
      </section>

      {/* Collages */}
      <aside className="about-page__collages">
        <div className="collage-wrapper">
          <img src={collage1} alt="Collage equipo parte 1" />
        </div>
        <div className="collage-wrapper">
          <img src={collage2} alt="Collage equipo parte 2" />
        </div>
      </aside>
    </div>
  </div>
);

export default AboutUs;
