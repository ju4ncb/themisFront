import "./Graphs.scss";
import Card from "../../../components/Card";

const Graphs: React.FC = () => {
  const analysisOptions = [
    {
      title: "Análisis Univariable",
      description:
        "Explora una sola variable a la vez para comprender su distribución y características.",
      image: "/images/univariable.png",
      onClick: () => window.location.assign("/dashboard/graphs/univariable"),
    },
    {
      title: "Análisis Bivariable",
      description:
        "Estudia la relación entre dos variables para detectar correlaciones o patrones.",
      image: "/images/bivariable.png",
      onClick: () => window.location.assign("/dashboard/graphs/bivariable"),
    },
    {
      title: "Análisis Multivariable",
      description:
        "Analiza múltiples variables simultáneamente para encontrar interacciones complejas.",
      image: "/",
      onClick: () => window.location.assign("/dashboard/graphs/multivariable"),
    },
  ];
  return (
    <section className="analysis-cards">
      {analysisOptions.map(({ title, description, image, onClick }) => (
        <Card title={title} buttonText="Explorar" onClick={onClick}>
          {description}
        </Card>
      ))}
    </section>
  );
};

export default Graphs;
