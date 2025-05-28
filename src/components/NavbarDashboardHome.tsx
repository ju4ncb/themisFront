import { ChartLine, Table } from "lucide-react";

interface Props {
  isDetalles: boolean;
  navBarActive: boolean;
  setIsDetalles: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarDashboardHome: React.FC<Props> = ({
  isDetalles,
  navBarActive,
  setIsDetalles,
}) => {
  return (
    <header
      className="dashboard-navbar"
      style={{ height: navBarActive ? 92 : 0, overflow: "hidden" }}
    >
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
