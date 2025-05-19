import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  const configparamsDisabled = true;
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#f4f4f4", padding: "1rem" }}>
        <h2>Dashboard</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/dashboard">Inicio dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard/upload">Subir archivo</Link>
            </li>
            <li>
              <Link to="/dashboard/graphs">Ver gráficas</Link>
            </li>
            <li>
              <Link to="/dashboard/recommendations">Recomendaciones</Link>
            </li>
            <li>
              <Link to="/dashboard/history">Historial</Link>
            </li>
            <li>
              {configparamsDisabled ? (
                <span
                  style={{
                    color: "#999",
                    cursor: "not-allowed",
                    textDecoration: "none",
                    display: "inline-block",
                    padding: "0.25rem 0",
                  }}
                >
                  Configurar hiperparámetros (deshabilitado)
                </span>
              ) : (
                <Link to="/dashboard/configparams">
                  Configurar hiperparámetros
                </Link>
              )}
            </li>
            <li>
              <Link to="/dashboard/admin">Administrar</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
