import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  children: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  buttonText?: string;
  navLinkText?: string;
  to?: string;
  noBg?: boolean;
  onClick?: () => void;
}

const Card = ({
  title,
  children,
  imgSrc,
  imgAlt,
  buttonText,
  navLinkText,
  to,
  noBg,
  onClick,
}: Props) => {
  return (
    <div className={!noBg ? "container-card" : "container-card no-bg"}>
      <h1 className="titulo-card">{title}</h1>
      {imgSrc && <img src={imgSrc} alt={imgAlt ? imgAlt : "image"} />}
      <div className="texto-card">
        <p>{children}</p>
      </div>
      {buttonText && (
        <button className="boton-card" onClick={onClick}>
          {buttonText}
        </button>
      )}
      {navLinkText && (
        <NavLink to={to!} className="nav-link">
          {navLinkText}
        </NavLink>
      )}
    </div>
  );
};

export default Card;
