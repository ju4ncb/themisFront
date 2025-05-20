import AuthForm from "../../components/AuthForm";
import { useForm } from "react-hook-form";
import "../auth.scss";
import Swal from "sweetalert2";
import { useUsuario } from "../../contexts/UsuarioContext";
import type { Usuario } from "../../models/Usuario";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
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
        <p>
          ¿Ya tienes cuenta? <a href="/register">Registrate aquí</a>
        </p>
      </div>
    </AuthForm>
  );
};

export default Login;
