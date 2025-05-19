import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
