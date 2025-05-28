import { Outlet } from "react-router-dom";
import blueBg from "../assets/blue-background.jpg";
import { useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const HomeLayout = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <div className="darker-bg fullscreen grid-center">
      <div className="volver-auth" onClick={() => window.location.assign("/")}>
        <Home />
        <p>Inicio</p>
      </div>
      <div className="auth-layout">
        <section
          className={
            currentUrl === "/register"
              ? "auth-content seventy-percent"
              : "auth-content"
          }
        >
          <Outlet />
        </section>
        <section className="auth-img">
          <img src={blueBg} alt="auth-img" />
        </section>
      </div>
    </div>
  );
};

export default HomeLayout;
