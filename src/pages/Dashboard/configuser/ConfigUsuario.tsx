import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUsuario } from "../../../contexts/UsuarioContext";

const ConfigUsuario: React.FC = () => {
  const { usuario, setUsuario } = useUsuario();

  // Estados locales para los campos del formulario
  const [username, setUsername] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // Al montar, cargamos los datos del usuario en los estados locales
  useEffect(() => {
    if (usuario) {
      setUsername(usuario.nombreusuario || "");
      setNombres(usuario.nombres || "");
      setApellidos(usuario.apellidos || "");
      setDireccion(usuario.direccion || "");
      setTelefono(usuario.telefono || "");
      setEmail(usuario.correo || "");
      // No cargamos password real por seguridad
    }
  }, [usuario]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Creamos el nuevo objeto usuario con los valores del formulario
    const updated = {
      ...usuario!,
      username,
      nombres,
      apellidos,
      direccion,
      telefono,

      email,
      // password: (si permites cambiarla)
    };
    setUsuario(updated);
    // Aquí podrías llamar a tu API para persistir los cambios
  };

  return (
    <div className="config-user-container">
      <h2 className="config-user-title">Configuración usuario</h2>
      <form className="config-user-form" onSubmit={handleSubmit}>
        {/* === Información usuario === */}
        <fieldset className="config-user-fieldset">
          <legend className="config-user-legend">Información usuario</legend>

          {/* Username */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="username">Nombre usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Nombres / Apellidos */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="direccion">Dirección (opcional)</label>
              <input
                id="direccion"
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
          </div>

          {/* Teléfono / Fecha de nacimiento */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        {/* === Información login === */}
        <fieldset className="config-user-fieldset">
          <legend className="config-user-legend">Información login</legend>

          {/* Email */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="form-row single">
            <div className="form-field password-field">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPwd((v) => !v)}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn--primary config-user-submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default ConfigUsuario;
