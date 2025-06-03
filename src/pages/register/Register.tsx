import AuthForm from "../../components/AuthForm";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "../auth.scss";
import { useUsuario } from "../../contexts/UsuarioContext";
import type { Usuario } from "../../models/Usuario";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const { setUsuario } = useUsuario();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const usuario = { id_rol: 1, ...data };
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      const usuarioNuevo = await response.json();
      if (usuarioNuevo !== undefined && usuarioNuevo.nombres !== undefined) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: `Usuario registrado con éxito.`,
        }).then(() => {
          setUsuario(usuarioNuevo as Usuario);
          window.location.assign("/dashboard");
        });
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar la cuenta.",
      });
    }
  };

  return (
    <AuthForm
      title="Registro"
      submitText="Registrarse"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <fieldset className="form-fieldset">
        <legend className="form-legend">Información usuario</legend>
        {/* Email */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="correo">Correo (*)</label>
            <input
              type="email"
              id="correo"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
            />
            {typeof errors.correo?.message === "string" && (
              <span>{errors.correo.message}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="confirmarCorreo">Confirmar Correo (*)</label>
            <input
              type="email"
              id="confirmarCorreo"
              {...register("confirmarCorreo", {
                required: "Debe confirmar el correo",
                validate: (value: string, formValues: any) =>
                  value === formValues.correo || "Los correos no coinciden",
              })}
            />
            {typeof errors.confirmarCorreo?.message === "string" && (
              <span>{errors.confirmarCorreo.message}</span>
            )}
          </div>
        </div>
        {/* Nombres / Apellidos */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="nombres">Nombres (*)</label>
            <input
              type="text"
              id="nombres"
              {...register("nombres", {
                required: "Los nombres son obligatorios",
              })}
            />
            {typeof errors.nombres?.message === "string" && (
              <span>{errors.nombres.message}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="apellidos">Apellidos (*)</label>
            <input
              type="text"
              id="apellidos"
              {...register("apellidos", {
                required: "Los apellidos son obligatorios",
              })}
            />
            {typeof errors.apellidos?.message === "string" && (
              <span>{errors.apellidos.message}</span>
            )}
          </div>
        </div>
        <div className="form-row single">
          <div className="form-field">
            <label htmlFor="direccion">Dirección</label>
            <input type="text" id="direccion" {...register("direccion")} />
          </div>
        </div>
        <div className="form-row single">
          <div className="form-field">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              {...register("telefono", {
                pattern: {
                  value: /^[0-9+\s()-]{7,}$/,
                  message: "Teléfono inválido",
                },
              })}
            />
            {typeof errors.telefono?.message === "string" && (
              <span>{errors.telefono.message}</span>
            )}
          </div>
        </div>
      </fieldset>
      <fieldset className="form-fieldset">
        <legend className="form-legend">Información login</legend>
        <div className="form-row single">
          <div className="form-field">
            <label htmlFor="nombreusuario">Nombre usuario (*)</label>

            <input
              type="text"
              id="nombreusuario"
              {...register("nombreusuario", {
                required: "El usuario es obligatorio",
              })}
            />

            {typeof errors.nombreusuario?.message === "string" && (
              <span>{errors.nombreusuario.message}</span>
            )}
          </div>
        </div>
        <div className="form-row">
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
          <div className="form-field password-field">
            <label htmlFor="confirmarContrasena">
              Confirmar Contraseña (*)
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfPwd ? "text" : "password"}
                id="confirmarContrasena"
                {...register("confirmarContrasena", {
                  required: "Debe confirmar la contraseña",
                  validate: (value: string, formValues: any) =>
                    value === formValues.contrasena ||
                    "Las contraseñas no coinciden",
                })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfPwd((v) => !v)}
                tabIndex={-1}
              >
                {showConfPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {typeof errors.confirmarContrasena?.message === "string" && (
              <span>{errors.confirmarContrasena.message}</span>
            )}
          </div>
        </div>
      </fieldset>
      <div className="link">
        <Link to="/login">Iniciar sesión</Link>
      </div>
    </AuthForm>
  );
};

export default Register;
