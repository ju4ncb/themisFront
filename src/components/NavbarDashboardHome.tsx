import { ChartLine, Table } from "lucide-react";

interface Props {
  isDetalles: boolean;
  setIsDetalles: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarDashboardHome: React.FC<Props> = ({
  isDetalles,
  setIsDetalles,
}) => {
  return (
    <header className="dashboard-navbar">
      <nav className="dashboard-navbar__links">
        <a
          href="#"
          className={isDetalles ? "active" : ""}
          onClick={() => setIsDetalles(true)}
        >
          <p>Detalles</p>
          <ChartLine />
        </a>
        <a
          href="#"
          className={isDetalles ? "" : "active"}
          onClick={() => setIsDetalles(false)}
        >
          <Table />
          <p>Campos</p>
        </a>
      </nav>
    </header>
  );
};

export default NavbarDashboardHome;
