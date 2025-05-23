import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "../assets/themis-logo-2-white.png";
import { useUsuario } from "../contexts/UsuarioContext";

const HomeLayout = () => {
  const { usuario, estaAutenticado, setUsuario } = useUsuario();
  return (
    <>
      <nav className="sidebar">
        <Link to="/" className="sidebar-logo">
          <img src={logo} alt="logo" />
        </Link>
        <ul className="links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contact
          </NavLink>
        </ul>
      </nav>
      <div className="home-layout">
        <main className="content-container">
          <nav
            className={
              estaAutenticado ? "login-navbar size-increase" : "login-navbar"
            }
          >
            {estaAutenticado ? (
              <>
                <p>Bienvenido, {usuario?.nombres}</p>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="#" onClick={() => setUsuario(null)}>
                  Cerrar sesión
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">Registro</Link>
                <Link to="/login">Inicio de sesión</Link>
              </>
            )}
          </nav>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
