import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "../assets/themis-logo-2-white.png";
import {
  ChartBarStacked,
  History,
  Home,
  Lightbulb,
  LogOut,
  Menu,
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
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div className="user-card">
          <section className="user-info">
            <UserCircle2 />
            <p>{usuario?.nombreusuario}</p>
          </section>
          <section className="user-menu-dropdown">
            <button
              className={dropdownActive ? "active" : "user-menu-trigger"}
              onClick={() => setDropdownActive((prev) => !prev)}
            >
              <Menu />
            </button>
            {dropdownActive && (
              <ul className="user-menu-list">
                <li>
                  <UserCog />
                  <Link to="/dashboard/configuser">Configuración</Link>
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
        <nav className="links">
          <ul className="links-list">
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/home"
              >
                <Home />
                <p>Inicio dashboard</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/upload"
              >
                <UploadCloud />
                <p>Subir archivo</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/graphs"
              >
                <ChartBarStacked />
                <p>Ver gráficas</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/recommendations"
              >
                <Lightbulb />
                <p>Recomendaciones</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/history"
              >
                <History />
                <p>Historial</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              {configparamsDisabled ? (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link disabled-link" : "disabled-link"
                  }
                >
                  <Settings2 />
                  <p>Configurar hiperparámetros (deshabilitado)</p>
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to="/dashboard/configparams"
                >
                  <Settings2 />
                  <p>Configurar hiperparámetros</p>
                </NavLink>
              )}
            </li>
            <li className="links-list-item">
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/dashboard/admin"
              >
                <UserCog2 />
                <p>Administrar</p>
              </NavLink>
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
