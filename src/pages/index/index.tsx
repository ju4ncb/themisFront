import { BrainCircuit, UserPlus2, Users2 } from "lucide-react";
import Card from "../../components/Card";
import defaultImg from "../../assets/default-icon.svg";
import "./index.scss";
import { useEffect, useState } from "react";
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
      <h1 className="home-titulo">Themis</h1>
      <div className="container-cards">
        <Card Icon={BrainCircuit} number={cardsInfo.modelosTotales}>
          Modelos de IA desarrollados en total
        </Card>
        <Card Icon={Users2} number={cardsInfo.usuariosTotales}>
          Usuarios totales
        </Card>
        <Card Icon={UserPlus2} number={cardsInfo.usuariosNuevosSemana}>
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
