import { Outlet, Link } from "react-router-dom";
import defaultImg from "../assets/default-icon.svg";

const HomeLayout = () => {
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
            <Link to="/register">Registro</Link>
            <Link to="/about">Inicio de sesión</Link>
          </nav>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
