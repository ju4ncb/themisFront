import defaultimg from "../assets/default-icon.svg";
const Card = () => {
  return (
    <div className="container-card">
      <img src={defaultimg} alt="Transparent" />
      <div className="texto-card">
        <p>Descubre la verdad detrás de los datos laborales</p>
      </div>
    </div>
  );
};

export default Card;
