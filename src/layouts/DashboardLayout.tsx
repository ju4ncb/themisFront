import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
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
import NavbarDashboard from "../components/NavbarDashboard";

const DashboardLayout = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const { usuario, setUsuario } = useUsuario();
  const location = useLocation();
  const currentUrl = location.pathname;
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
              <NavLink to="#" className="disabled-link">
                <History />
                <p>Historial (en desarrollo)</p>
              </NavLink>
            </li>
            <li className="links-list-item">
              <NavLink to="#" className="disabled-link">
                <Settings2 />
                <p>Configurar hiperparámetros (en desarrollo)</p>
              </NavLink>
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
      <main
        className={
          currentUrl !== "/dashboard/home"
            ? "main-content with-nav"
            : "main-content"
        }
      >
        {currentUrl !== "/dashboard/home" && (
          <NavbarDashboard currentUrl={currentUrl} />
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
