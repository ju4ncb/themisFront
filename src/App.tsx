import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/index";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AboutUs from "./pages/about-us/AboutUs";

import Dashboard from "./pages/Dashboard/home/home";
import ConfigUsuario from "./pages/Dashboard/configuser/ConfigUsuario";
import Upload from "./pages/Dashboard/upload/Upload";
import Graphs from "./pages/Dashboard/graphs/index/Graphs";
import ConfigParams from "./pages/Dashboard/configparams/ConfigParams";
import Recommendations from "./pages/Dashboard/recommendations/Recommendations";
import Admin from "./pages/Dashboard/admin/Admin";
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { UsuarioProvider } from "./contexts/UsuarioContext";
import AuthLayout from "./layouts/AuthLayout";
import { RequiereAcceso, RequiereNoAcceso } from "./components/RutasProtegidas";
import { ArchivoSalarialProvider } from "./contexts/ArchivoSalarialContext";
import Train from "./pages/Dashboard/train/Train";
import Bivariable from "./pages/Dashboard/graphs/bivariable/Bivariable";
import { GraphProvider } from "./contexts/GraphContext";
import GraphLayout from "./layouts/GraphLayout";
import Univariable from "./pages/Dashboard/graphs/univariable/Univariable";
import Multivariable from "./pages/Dashboard/graphs/multivariable/Multivariable";

const App: React.FC = () => (
  <UsuarioProvider>
    <Routes>
      {/* Rutas públicas */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      {/* Login */}
      <Route
        element={
          <RequiereNoAcceso>
            <AuthLayout />
          </RequiereNoAcceso>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      {/* Rutas del Dashboard */}
      <Route
        path="dashboard"
        element={
          <RequiereAcceso>
            <ArchivoSalarialProvider>
              <DashboardLayout />
            </ArchivoSalarialProvider>
          </RequiereAcceso>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="configusuario" element={<ConfigUsuario />} />
        <Route path="upload" element={<Upload />} />
        <Route path="train" element={<Train />} />
        <Route
          path="graphs"
          element={
            <GraphProvider>
              <GraphLayout />
            </GraphProvider>
          }
        >
          <Route index element={<Graphs />} />
          <Route path="bivariable" element={<Bivariable />} />
          <Route path="univariable" element={<Univariable />} />
          <Route path="multivariable" element={<Multivariable />} />
        </Route>
        <Route path="configparams" element={<ConfigParams />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </UsuarioProvider>
);

export default App;
