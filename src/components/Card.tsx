interface Props {
  title: string;
  children: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  buttonText?: string;
  onClick?: () => void;
  noBg?: boolean;
}

const Card = ({
  title,
  children,
  imgSrc,
  imgAlt,
  buttonText,
  noBg,
  onClick,
}: Props) => {
  return (
    <div className={!noBg ? "container-card" : "container-card no-bg"}>
      {imgSrc && <img src={imgSrc} alt={imgAlt ? imgAlt : "image"} />}
      <h1 className="titulo-card">{title}</h1>
      <div className="texto-card">
        <p>{children}</p>
      </div>
      {buttonText && (
        <button className="boton-card" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
