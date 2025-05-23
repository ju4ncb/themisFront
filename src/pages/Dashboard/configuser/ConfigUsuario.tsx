import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useUsuario } from "../../../contexts/UsuarioContext";
import "./configusuario.scss";
import Swal from "sweetalert2";
import type { Usuario } from "../../../models/Usuario";
const API_URL = import.meta.env.VITE_API_URL;

type FormValues = {
  nombreusuario: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
};

const ConfigUsuario: React.FC = () => {
  const { usuario, setUsuario } = useUsuario();
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nombreusuario: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      email: "",
      password: "",
    },
  });

  // Cargar datos usuario en el formulario al montar
  useEffect(() => {
    if (usuario) {
      setValue("nombreusuario", usuario.nombreusuario || "");
      setValue("nombres", usuario.nombres || "");
      setValue("apellidos", usuario.apellidos || "");
      setValue("direccion", usuario.direccion || "");
      setValue("telefono", usuario.telefono || "");
      setValue("email", usuario.correo || "");
      // No cargamos password real por seguridad
    }
  }, [usuario, setValue]);

  const onSubmit = async (data: FormValues) => {
    const updated = {
      ...usuario!,
      nombreusuario: data.nombreusuario,
      nombres: data.nombres,
      apellidos: data.apellidos,
      direccion: data.direccion,
      telefono: data.telefono,
      correo: data.email,
      // password: data.password (si permites cambiarla)
    };
    try {
      const response = await fetch(
        `${API_URL}/usuarios/${usuario?.nombreusuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        }
      );
      const usuarioNuevo = await response.json();
      if (usuarioNuevo !== undefined && usuarioNuevo.nombres !== undefined) {
        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          text: `Usuario actualizado con éxito.`,
        }).then(() => {
          setUsuario(usuarioNuevo as Usuario);
          window.location.assign("/dashboard/");
        });
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar los datos de la cuenta.",
      });
    }
  };

  return (
    <div className="config-user-container">
      <h2 className="config-user-title">Configuración usuario</h2>
      <form className="config-user-form" onSubmit={handleSubmit(onSubmit)}>
        {/* === Información usuario === */}
        <fieldset className="config-user-fieldset">
          <legend className="config-user-legend">Información usuario</legend>

          {/* Email */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Este campo es requerido</span>}
            </div>
          </div>

          {/* Nombres / Apellidos */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                type="text"
                {...register("nombres", { required: true })}
              />
              {errors.nombres && <span>Este campo es requerido</span>}
            </div>
            <div className="form-field">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                {...register("apellidos", { required: true })}
              />
              {errors.apellidos && <span>Este campo es requerido</span>}
            </div>
          </div>

          {/* Dirección */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="direccion">Dirección (opcional)</label>
              <input id="direccion" type="text" {...register("direccion")} />
            </div>
          </div>

          {/* Teléfono */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input id="telefono" type="tel" {...register("telefono")} />
            </div>
          </div>
        </fieldset>

        {/* === Información login === */}
        <fieldset className="config-user-fieldset">
          <legend className="config-user-legend">Información login</legend>
          {/* Nombre de usuario */}
          <div className="form-row single">
            <div className="form-field">
              <label htmlFor="nombreusuario">Nombre usuario</label>
              <input
                id="nombreusuario"
                type="text"
                {...register("nombreusuario", { required: true })}
              />
              {errors.nombreusuario && <span>Este campo es requerido</span>}
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
                  {...register("password")}
                  placeholder="**********"
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
            </div>
          </div>
        </fieldset>

        <button type="submit" className="config-user-submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default ConfigUsuario;
