import {
  BarChart4,
  BrainCircuit,
  ChartBarStacked,
  Scale,
  UploadCloud,
} from "lucide-react";
import Feature from "../../components/Feature";
import logo from "../../assets/themis-logo-white.png";
import "./about.scss";

const About = () => {
  return (
    <div className="about-container">
      <img src={logo} alt="themis-logo" />
      <div className="container-features">
        <Feature Icon={UploadCloud} title="Carga">
          Puedes subir tus propios archivos (por ejemplo, en formato CSV) con
          datos para crear modelos.
        </Feature>
        <Feature Icon={BrainCircuit} title="Entrena">
          Themis entrena modelos por ti. Solo debes elegir qué variable quieres
          predecir (por ejemplo, ingresos, edad, riesgo, etc.) y qué
          características vas a usar (como género, edad, ubicación...).
        </Feature>
        <Feature Icon={BarChart4} title="Analiza">
          Después del entrenamiento, puedes ver qué tan bien funciona tu modelo
          (precisión, error, etc.).
        </Feature>
        <Feature Icon={Scale} title="Evalúa">
          Una de las funciones más importantes de Themis: puedes ver si tu
          modelo es justo con diferentes grupos de personas (por ejemplo, si
          trata igual a hombres y mujeres, o a diferentes edades).
        </Feature>
        <Feature Icon={ChartBarStacked} title="Compara">
          Puedes comparar varios modelos para decidir cuál es el más justo y el
          más preciso.
        </Feature>
      </div>

      <button
        type="button"
        onClick={() => (window.location.href = "/register")}
      >
        Empezar
      </button>
    </div>
  );
};

export default About;
