import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../assets/themis-logo-2-white.png";
import {
  BrainCircuit,
  ChartBar,
  ChartBarStacked,
  ChartScatter,
  Grid,
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
import LoginNavBar from "../components/LoginNavBar";
import CustomLinkWithChildren from "../components/CustomLinkWithChildren";

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
        <CustomLinkWithChildren
          name="Explorar datos"
          path="/dashboard/graphs"
          Icon={ChartBarStacked}
          children={[
            {
              name: "Univariable",
              path: "/dashboard/graphs/univariable",
              Icon: ChartBar,
            },
            {
              name: "Bivariable",
              path: "/dashboard/graphs/bivariable",
              Icon: ChartScatter,
            },
            {
              name: "Multivariable",
              path: "/dashboard/graphs/multivariable",
              Icon: Grid,
            },
          ]}
        />,
        <CustomLink
          name="Entrenar modelo"
          Icon={BrainCircuit}
          path="/dashboard/train"
        />,
        <CustomLink
          name="Recomendaciones"
          Icon={Lightbulb}
          path="#"
          isDisabled={true}
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
    <>
      <LoginNavBar />
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
          </div>
          <nav className="links">
            <ul
              className="links-list"
              style={{
                height:
                  linksShown.reduce((sum, linkShown) => {
                    if (linkShown.props.children) {
                      const isActiveChild = (
                        linkShown.props.children as { path: string }[]
                      ).some((child) => location.pathname === child.path);
                      const isActiveParent =
                        location.pathname === linkShown.props.path;
                      if (isActiveChild || isActiveParent) {
                        sum += linkShown.props.children.length * 28;
                      }
                    }
                    return sum + (amountOfLines(linkShown) * 8.88 + 44);
                  }, 0) + 100,
                width: 200,
                transition: "height 0.3s ease",
              }}
            >
              {linksShown.map((linkShown, idx) => (
                <li key={idx} className="links-list-item">
                  {linkShown}
                </li>
              ))}
              <section className="menu-dropdown">
                <button
                  className={dropdownActive ? "btn active" : "btn"}
                  onClick={() => setDropdownActive((prev) => !prev)}
                >
                  <Menu />
                  Ver más
                </button>
                {dropdownActive && (
                  <ul className="menu-list">
                    <li>
                      <UserCog />
                      <Link to="/dashboard/configusuario">Configuración</Link>
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
    </>
  );
};

export default DashboardLayout;
