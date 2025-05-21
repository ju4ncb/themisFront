import { Outlet } from "react-router-dom";
import blueBg from "../assets/blue-background.jpg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const HomeLayout = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  useEffect(() => {
    console.log(currentUrl);
  }, []);
  return (
    <div className="darker-bg fullscreen grid-center">
      <div className="auth-layout">
        <section
          className={
            currentUrl === "/register"
              ? "auth-content width-100"
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
