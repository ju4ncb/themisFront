interface Props {
  title: string;
  children: React.ReactNode;
  buttonText: string;
}

const CardButton = ({ title, children, buttonText }: Props) => {
  return (
    <div className="container-card">
      <h1 className="titulo-card">{title}</h1>
      <div className="texto-card">
        <p>{children}</p>
      </div>
      <button className="boton-card">{buttonText}</button>
    </div>
  );
};

export default CardButton;
