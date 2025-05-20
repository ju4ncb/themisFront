import { Outlet, Link } from "react-router-dom";
import defaultImg from "../assets/default-icon.svg";
import { useUsuario } from "../contexts/UsuarioContext";

const HomeLayout = () => {
  const { usuario, estaAutenticado, setUsuario } = useUsuario();
  return (
    <>
      <nav className="sidebar">
        <img src={defaultImg} alt="icon" />
        <ul className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
      <div className="home-layout">
        <main className="content-container">
          <nav className="login-navbar">
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
