import "../Graphs.scss";
import Card from "../../../../components/Card";
import bar from "../../../../assets/bar.png";
import scatt from "../../../../assets/scatt.png";
import corr from "../../../../assets/corr.png";

const Graphs: React.FC = () => {
  const analysisOptions = [
    {
      title: "Análisis Univariable",
      description:
        "Explora una sola variable a la vez para comprender su distribución y características.",
      image: bar,
      imageAlt: "Barras",
      to: "/dashboard/graphs/univariable",
    },
    {
      title: "Análisis Bivariable",
      description:
        "Estudia la relación entre dos variables para detectar correlaciones o patrones.",
      image: scatt,
      imageAlt: "Dispersión",
      to: "/dashboard/graphs/bivariable",
    },
    {
      title: "Análisis Multivariable",
      description:
        "Analiza múltiples variables simultáneamente para encontrar interacciones complejas.",
      image: corr,
      imageAlt: "Correlación",
      to: "/dashboard/graphs/multivariable",
    },
  ];
  return (
    <section className="analysis-cards end-center">
      {analysisOptions.map(({ title, description, image, to }, idx) => (
        <Card
          key={idx}
          title={title}
          navLinkText="Explorar"
          to={to}
          imgSrc={image}
          imgAlt=""
        >
          {description}
        </Card>
      ))}
    </section>
  );
};

export default Graphs;
