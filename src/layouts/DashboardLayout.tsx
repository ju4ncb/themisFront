import { Outlet, Link } from "react-router-dom";
import defaultImg from "../assets/default-icon.svg";
import {
  ChartBarStacked,
  History,
  Home,
  Lightbulb,
  LogOut,
  Settings2,
  UploadCloud,
  UserCircle2,
  UserCog,
  UserCog2,
} from "lucide-react";
import { useUsuario } from "../contexts/UsuarioContext";
import { useState } from "react";

const DashboardLayout = () => {
  const configparamsDisabled = true;
  const [dropdownActive, setDropdownActive] = useState(false);
  const { usuario, setUsuario } = useUsuario();
  return (
    <div className="dashboard-layout">
      <div className="sidebar-dashboard">
        <div className="user-card">
          <section className="user-info">
            <UserCircle2 />
            <p>{usuario?.nombreusuario}</p>
          </section>
          <section className="user-menu-dropdown">
            <button
              className="user-menu-trigger"
              onClick={() => setDropdownActive((prev) => !prev)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            {dropdownActive && (
              <ul className="user-menu-list">
                <li>
                  <UserCog />
                  <Link to="/dashboard/settings">Configuración</Link>
                </li>
                <li>
                  <LogOut />
                  <Link
                    to="#"
                    onClick={() => {
                      setUsuario(null);
                      window.location.assign("/");
                    }}
                  >
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            )}
          </section>
        </div>
        <a href="/">
          <img src={defaultImg} alt="Logo" />
        </a>
        <nav className="links">
          <ul className="links-list">
            <li className="links-list-item">
              <Home />
              <Link to="/dashboard">Inicio dashboard</Link>
            </li>
            <li className="links-list-item">
              <UploadCloud />
              <Link to="/dashboard/upload">Subir archivo</Link>
            </li>
            <li className="links-list-item">
              <ChartBarStacked />
              <Link to="/dashboard/graphs">Ver gráficas</Link>
            </li>
            <li className="links-list-item">
              <Lightbulb />
              <Link to="/dashboard/recommendations">Recomendaciones</Link>
            </li>
            <li className="links-list-item">
              <History />
              <Link to="/dashboard/history">Historial</Link>
            </li>
            <li className="links-list-item">
              <Settings2 />
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
              <UserCog2 />
              <Link to="/dashboard/admin">Administrar</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
