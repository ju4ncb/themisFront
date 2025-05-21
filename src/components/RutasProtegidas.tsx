// ProtectedRoute.tsx
import { useUsuario } from "../contexts/UsuarioContext";

export const RequiereAcceso = ({ children }: { children: React.ReactNode }) => {
  const { estaAutenticado } = useUsuario();
  if (!estaAutenticado) {
    return (
      <div className="fullscreen grid-center">
        ⛔ Acceso no autorizado. Inicia sesión.
      </div>
    );
  }
  return children;
};

export const RequiereNoAcceso = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { estaAutenticado } = useUsuario();
  if (estaAutenticado) {
    return (
      <div className="fullscreen grid-center">
        <div className="grid-center">
          <p>Ya inició sesión.</p>
          <button onClick={() => (window.location.href = "/")}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
  return children;
};
