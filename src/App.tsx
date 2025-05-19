import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/index";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Dashboard from "./pages/Dashboard/index";
import ConfigUsuario from "./pages/Dashboard/configuser/ConfigUser";
import Upload from "./pages/Dashboard/upload/Upload";
import Graphs from "./pages/Dashboard/graphs/Graphs";
import ConfigParams from "./pages/Dashboard/configparams/ConfigParams";
import Recommendations from "./pages/Dashboard/recommendations/Recommendations";
import History from "./pages/Dashboard/history/History";
import Admin from "./pages/Dashboard/admin/Admin";
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const App: React.FC = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route element={<HomeLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>

    {/* Login */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />

    {/* Rutas del Dashboard */}
    <Route path="dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="configusuario" element={<ConfigUsuario />} />
      <Route path="upload" element={<Upload />} />
      <Route path="graphs" element={<Graphs />} />
      <Route path="configparams" element={<ConfigParams />} />
      <Route path="recommendations" element={<Recommendations />} />
      <Route path="history" element={<History />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  </Routes>
);

export default App;
