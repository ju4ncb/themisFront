interface Props {
  title: string;
  children: React.ReactNode;
  buttonText?: string;
  noBg?: boolean;
}

const CardButton = ({ title, children, buttonText, noBg }: Props) => {
  return (
    <div
      className={!noBg ? "container-cardbutton" : "container-cardbutton no-bg"}
    >
      <h1 className="titulo-card">{title}</h1>
      <div className="texto-card">
        <p>{children}</p>
      </div>
      {buttonText && <button className="boton-card">{buttonText}</button>}
    </div>
  );
};

export default CardButton;
