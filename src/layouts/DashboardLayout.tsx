import { Outlet, Link } from "react-router-dom";
import defaultImg from "../assets/default-icon.svg";
import { ChartBarStacked, History, Home, Lightbulb, Settings2, UploadCloud, UserCog2 } from "lucide-react";

const DashboardLayout = () => {
  const configparamsDisabled = true;
  return (
    <div className="dashboard-layout">
      <div className="sidebar-dashboard">
        <img src={defaultImg} alt="Logo" />
        <nav className="links">
          <ul className="links-list">
            <li className="links-list-item">
              <Home/>
              <Link to="/dashboard">Inicio dashboard</Link>
            </li>
            <li className="links-list-item">
              <UploadCloud/>
              <Link to="/dashboard/upload">Subir archivo</Link>
            </li>
            <li className="links-list-item">
              <ChartBarStacked/>
              <Link to="/dashboard/graphs">Ver gráficas</Link>
            </li>
            <li className="links-list-item">
              <Lightbulb/>
              <Link to="/dashboard/recommendations">Recomendaciones</Link>
            </li>
            <li className="links-list-item">
              <History/>
              <Link to="/dashboard/history">Historial</Link>
            </li>
            <li className="links-list-item">
              <Settings2/>
              {configparamsDisabled ? (
                <Link to="#" className="disabled-link">
                  Configurar hiperparámetros (deshabilitado)
                </Link>
              ) : (
                <Link to="/dashboard/configparams">
                  Configurar hiperparámetros
                </Link>
              )}
            </li>
            <li className="links-list-item">
              <UserCog2/>
              <Link to="/dashboard/admin">Administrar</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
