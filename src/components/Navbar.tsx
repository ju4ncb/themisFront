import React from "react";
import { User } from "lucide-react";

const Navbar: React.FC = () => (
  <header className="navbar">
    <div className="navbar__logo">Themis</div>
    <nav className="navbar__links">
      <a href="#">Detalles</a>
      <a href="#">Campos</a>
    </nav>
    <div className="navbar__icon">
      <User size={24} />
    </div>
  </header>
);

export default Navbar;
