import { Outlet, Link, useLocation } from "react-router-dom";
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
import { useEffect, useState, type JSX } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import CustomLink from "../components/CustomLink";
import { useArchivoSalarial } from "../contexts/ArchivoSalarialContext";

const DashboardLayout = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const { usuario, setUsuario } = useUsuario();
  const { archivoSalarial } = useArchivoSalarial();
  const location = useLocation();
  const [linksShown, setLinksShown] = useState([
    <CustomLink name="Inicio dashboard" Icon={Home} path="/dashboard/home" />,
    <CustomLink
      name="Subir archivo"
      Icon={UploadCloud}
      path="/dashboard/upload"
    />,
  ]);
  const amountOfLines = (linkShown: JSX.Element) => {
    const words = linkShown.props.name.split(" ");
    if (linkShown.props.isDisabled) {
      words.push("(en");
      words.push("desarrollo)");
    }
    let lines = 0;
    let lineSpacesLeft = 17;
    words.forEach((word: string) => {
      if (word.length > 17) {
        lines += Math.floor(word.length / 17);
        lineSpacesLeft = 17 - word.length - 1;
        return;
      }
      if (word.length > lineSpacesLeft) {
        lineSpacesLeft = 17 - word.length - 1;
        lines += 1;
      } else {
        lineSpacesLeft -= word.length - 1;
      }
    });
    return lines;
  };

  useEffect(() => {
    if (archivoSalarial !== null && linksShown.length <= 3)
      setLinksShown((prev) => [
        ...prev,
        <CustomLink
          name="Explorar datos"
          Icon={ChartBarStacked}
          path="/dashboard/graphs"
        />,
        <CustomLink
          name="Recomendaciones"
          Icon={Lightbulb}
          path="/dashboard/recommendations"
        />,
        <CustomLink
          name="Configurar hiperparámetros"
          Icon={Settings2}
          path="#"
          isDisabled={true}
        />,
        <CustomLink
          name="Historial"
          Icon={History}
          path="#"
          isDisabled={true}
        />,
      ]);
    else if (archivoSalarial === null) {
      setLinksShown([
        <CustomLink
          name="Inicio dashboard"
          Icon={Home}
          path="/dashboard/home"
        />,
        <CustomLink
          name="Subir archivo"
          Icon={UploadCloud}
          path="/dashboard/upload"
        />,
      ]);
    }
    if (
      usuario?.id_rol === 3 &&
      !linksShown.some((link) => link.props.path === "/dashboard/admin")
    ) {
      setLinksShown((prev) => [
        ...prev,
        <CustomLink
          name="Administrar"
          Icon={UserCog2}
          path="/dashboard/admin"
        />,
      ]);
    }
  }, [archivoSalarial]);
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
          <ul
            className="links-list"
            style={{
              height: linksShown.reduce((sum, linkShown) => {
                return sum + (amountOfLines(linkShown) * 8.88 + 44);
              }, 0),
              width: 200,
              transition: "height 0.3s ease",
            }}
          >
            {linksShown.map((linkShown, idx) => (
              <li key={idx} className="links-list-item">
                {linkShown}
              </li>
            ))}
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
