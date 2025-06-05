import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "../assets/themis-logo-2-white.png";
import LoginNavBar from "../components/LoginNavBar";

const HomeLayout = () => {
  return (
    <>
      <LoginNavBar />
      <nav className="sidebar">
        <Link to="/" className="sidebar-logo">
          <img src={logo} alt="logo" />
        </Link>
        <ul className="links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => window.scrollTo(0, 0)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => window.scrollTo(0, 0)}
          >
            Contact
          </NavLink>
        </ul>
      </nav>
      <div className="home-layout">
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
