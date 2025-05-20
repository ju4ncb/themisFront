import { BrainCircuit, UserPlus2, Users2 } from "lucide-react";
import Card from "../../components/Card";
import defaultImg from "../../assets/default-icon.svg";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-titulo">Themis</h1>
      <div className="container-cards">
        <Card Icon={BrainCircuit} number={69}>
          Modelos de IA desarrollados en total
        </Card>
        <Card Icon={Users2} number={69420}>
          Usuarios totales
        </Card>
        <Card Icon={UserPlus2} number={420}>
          Usuarios nuevos esta semana
        </Card>
      </div>
      <h1>Únete con nosotros</h1>
      <button
        type="button"
        onClick={() => (window.location.href = "/register")}
      >
        Registrarse
      </button>
      <div className="analizador-container">
        <div className="analizador-texto-container">
          <h1>Analizador de datasets intuitivo</h1>
          <p>
            Themis es una plataforma que permite a cualquier persona crear,
            evaluar y entender modelos de inteligencia artificial (IA) de forma
            sencilla y responsable.
          </p>
        </div>
        <div className="analizador-carousel-container">
          <img src={defaultImg} />
        </div>
      </div>
      <h1>¿Cómo funciona nuestra IA?</h1>
      <button
        style={{ marginBottom: 40 }}
        type="button"
        onClick={() => (window.location.href = "/about")}
      >
        Explora más
      </button>
    </div>
  );
};

export default Home;
