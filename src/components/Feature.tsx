import { SquareDashed, type LucideProps } from "lucide-react";

interface Props {
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title?: string;
  children: React.ReactNode;
}

const Feature = ({ Icon, title, children }: Props) => {
  return (
    <div className="container-feature">
      {Icon ? <Icon /> : <SquareDashed />}
      <div className="texto-feature">
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Feature;
