import { ChartLine, Table } from "lucide-react";
import React from "react";

const NavbarDashboard: React.FC = () => (
  <header className="dashboard-navbar">
    <nav className="dashboard-navbar__links">
      <a href="#">
        <p>Detalles</p>
        <ChartLine />
      </a>
      <a href="#">
        <Table />
        <p>Campos</p>
      </a>
    </nav>
  </header>
);

export default NavbarDashboard;
