import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="home-layout">
      <nav className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <main className="content-container">
        <nav className="login-navbar">
          <Link to="/">Registro</Link>
          <Link to="/about">Inicio de sesión</Link>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
