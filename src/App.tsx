import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ConfigUsuario from "./pages/Dashboard/ConfigUsuario";
import Upload from "./pages/Dashboard/Upload";
import Graphs from "./pages/Dashboard/Graphs";
import ConfigParams from "./pages/Dashboard/ConfigParams";
import Recommendations from "./pages/Dashboard/Recommendations";
import History from "./pages/Dashboard/History";
import Admin from "./pages/Dashboard/Admin";

const App: React.FC = () => (
  <Layout /* username, role, etc. */>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Rutas del Dashboard */}
      <Route path="dashboard" element={<Dashboard />}>
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
  </Layout>
);

export default App;
