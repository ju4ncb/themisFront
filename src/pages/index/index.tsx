import {
  BarChart4,
  BrainCircuit,
  ChartBarStacked,
  Scale,
  UploadCloud,
  UserPlus2,
  Users2,
} from "lucide-react";
import CardNumber from "../../components/CardNumber";
import defaultImg from "../../assets/default-icon.svg";
import logo from "../../assets/themis-logo-white.png";
import "./index.scss";
import { useEffect, useState } from "react";
import Feature from "../../components/Feature";
import { useUsuario } from "../../contexts/UsuarioContext";
const API_URL = import.meta.env.VITE_API_URL;

interface CardsInfo {
  modelosTotales: number;
  usuariosTotales: number;
  usuariosNuevosSemana: number;
}

const Home = () => {
  const cardsInfoDummy = {
    modelosTotales: 0,
    usuariosTotales: 0,
    usuariosNuevosSemana: 0,
  };
  const { usuario } = useUsuario();
  const [cardsInfo, setCardsInfo] = useState(cardsInfoDummy as CardsInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelosRes, usuariosRes, nuevosRes] = await Promise.all([
          fetch(`${API_URL}/resultadosml/count`),
          fetch(`${API_URL}/usuarios/count`),
          fetch(`${API_URL}/usuarios/count-last-week`),
        ]);
        const modelosTotales = await modelosRes.json();
        const usuariosTotales = await usuariosRes.json();
        const usuariosNuevosSemana = await nuevosRes.json();
        setCardsInfo({
          modelosTotales: modelosTotales.count,
          usuariosTotales: usuariosTotales.count,
          usuariosNuevosSemana: usuariosNuevosSemana.count,
        });
      } catch (error) {
        console.error("Error fetching card info:", error);
      }
    };
    fetchData();
    setCardsInfo({} as CardsInfo);
  }, []);
  return (
    <div className="home-container">
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
      <div className="container-cards">
        <CardNumber Icon={BrainCircuit} number={cardsInfo.modelosTotales}>
          Modelos de IA desarrollados en total
        </CardNumber>
        <CardNumber Icon={Users2} number={cardsInfo.usuariosTotales}>
          Usuarios totales
        </CardNumber>
        <CardNumber Icon={UserPlus2} number={cardsInfo.usuariosNuevosSemana}>
          Usuarios nuevos esta semana
        </CardNumber>
      </div>
      {usuario !== null ? (
        <>
          <h1>Empieza a entrenar</h1>
          <button
            type="button"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Ir al dashboard
          </button>
        </>
      ) : (
        <>
          <h1>Únete con nosotros</h1>
          <button
            type="button"
            onClick={() => (window.location.href = "/register")}
          >
            Registrarse
          </button>
        </>
      )}
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
