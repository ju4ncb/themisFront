import { useEffect, useRef, useState } from "react";
import { useUsuario } from "../contexts/UsuarioContext";
import { Link, useLocation } from "react-router-dom";

const LoginNavBar = () => {
  const { usuario, estaAutenticado, setUsuario } = useUsuario();
  const navRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState("264px");
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    const fullContent = measureRef.current;
    if (fullContent) {
      const fullWidth = fullContent.scrollWidth;
      setWidth(estaAutenticado ? `${fullWidth}px` : "264px");
    }
  }, [estaAutenticado]);
  return (
    <>
      {/* Hidden element used only to measure content size */}
      <nav
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        className="login-navbar"
      >
        {estaAutenticado ? (
          <>
            <p>Bienvenido, {usuario?.nombres}</p>
            {currentUrl.startsWith("/dashboard") ? (
              <Link to="/configusuario">Configurar usuario</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
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
      {/* Actual visible element */}
      <nav className="login-navbar" style={{ width }} ref={navRef}>
        {estaAutenticado ? (
          <>
            <p>Bienvenido, {usuario?.nombres}</p>
            {currentUrl.startsWith("/dashboard") ? (
              <Link to="/dashboard/configusuario">Configurar usuario</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
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
    </>
  );
};

export default LoginNavBar;
