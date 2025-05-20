import AuthForm from "../../components/AuthForm";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "../auth.scss";
import { useUsuario } from "../../contexts/UsuarioContext";
import type { Usuario } from "../../models/Usuario";
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const { setUsuario } = useUsuario();
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
          window.location.assign("/");
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
      <div className="form-input-container">
        <label htmlFor="nombreusuario">Usuario</label>
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
      <div className="form-input-container">
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          {...register("contrasena", {
            required: "La constraseña es obligatoria",
          })}
        />
        {typeof errors.contrasena?.message === "string" && (
          <span>{errors.contrasena.message}</span>
        )}
      </div>
      <div className="form-input-container">
        <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmarContrasena"
          {...register("confirmarContrasena", {
            required: "Debe confirmar la contraseña",
            validate: (value: string, formValues: any) =>
              value === formValues.contrasena || "Las contraseñas no coinciden",
          })}
        />
        {typeof errors.confirmarContrasena?.message === "string" && (
          <span>{errors.confirmarContrasena.message}</span>
        )}
      </div>
      <div className="form-input-container">
        <label htmlFor="correo">Correo</label>
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
      <div className="form-input-container">
        <label htmlFor="confirmarCorreo">Confirmar Correo</label>
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
      <div className="form-input-container">
        <label htmlFor="nombres">Nombres</label>
        <input
          type="text"
          id="nombres"
          {...register("nombres", { required: "Los nombres son obligatorios" })}
        />
        {typeof errors.nombres?.message === "string" && (
          <span>{errors.nombres.message}</span>
        )}
      </div>
      <div className="form-input-container">
        <label htmlFor="apellidos">Apellidos</label>
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
      <div className="form-input-container">
        <label htmlFor="direccion">Dirección</label>
        <input type="text" id="direccion" {...register("direccion")} />
      </div>
      <div className="form-input-container">
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
    </AuthForm>
  );
};

export default Register;
