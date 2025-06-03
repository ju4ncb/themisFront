import { SquareDashed, type LucideProps } from "lucide-react";

interface Props {
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
  number: number;
}

const CardNumber = ({ Icon, number, children }: Props) => {
  return (
    <div className="container-card-number">
      {Icon ? <Icon /> : <SquareDashed />}
      <h1 className="numero-card">{number}</h1>
      <div className="texto-card">
        <p>{children}</p>
      </div>
    </div>
  );
};

export default CardNumber;
