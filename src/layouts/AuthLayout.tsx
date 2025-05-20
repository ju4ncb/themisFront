import { Outlet } from "react-router-dom";
import blueBg from "../assets/blue-background.jpg";

const HomeLayout = () => {
  return (
    <div className="darker-bg fullscreen grid-center">
      <div className="auth-layout">
        <section className="auth-content">
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
