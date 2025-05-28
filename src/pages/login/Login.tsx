import AuthForm from "../../components/AuthForm";
import { useForm } from "react-hook-form";
import "../auth.scss";
import Swal from "sweetalert2";
import { useUsuario } from "../../contexts/UsuarioContext";
import type { Usuario } from "../../models/Usuario";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const usuarioNuevo = await response.json();
      if (usuarioNuevo !== undefined && usuarioNuevo.nombres !== undefined) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: `Se ha iniciado sesión con éxito.`,
        }).then(() => {
          setUsuario(usuarioNuevo as Usuario);
          window.location.assign("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Contraseña o usuario incorrectas.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al iniciar sesión.",
      });
    }
  };

  const { setUsuario } = useUsuario();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AuthForm
      title="Login"
      submitText="Iniciar sesion"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      centerInputs={true}
    >
      <fieldset className="form-fieldset">
        <legend className="form-legend">Información login</legend>
        <div className="form-row single">
          <div className="form-field">
            <label htmlFor="usuarioOrCorreo">Usuario/Correo</label>
            <input
              type="text"
              id="usuarioOrCorreo"
              {...register("usuarioOrCorreo", {
                required: "El usuario es obligatorio",
              })}
            />
            {typeof errors.usuarioOrCorreo?.message === "string" && (
              <span>{errors.usuarioOrCorreo.message}</span>
            )}
          </div>
        </div>
        <div className="form-row single">
          <div className="form-field password-field">
            <label htmlFor="contrasena">Contraseña (*)</label>
            <div className="password-input-wrapper">
              <input
                type={showPwd ? "text" : "password"}
                id="contrasena"
                {...register("contrasena", {
                  required: "La constraseña es obligatoria",
                })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {typeof errors.contrasena?.message === "string" && (
              <span>{errors.contrasena.message}</span>
            )}
          </div>
        </div>
      </fieldset>
      <div className="link">
        ¿Ya tienes cuenta? <Link to="/register">Registrate aquí</Link>
      </div>
    </AuthForm>
  );
};

export default Login;
